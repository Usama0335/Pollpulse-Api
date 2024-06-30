import { check, body, validationResult } from "express-validator";
import apiResponse from "../helpers/apiResponse.js";
import Authenticator from '../middlewares/auth/MongooseJwtApiAuthenticator.js';
import UserModel from "../models/UserModel.js";

class AuthApiController {
  static register = [
    check("username").isLength({ min: 1 }).trim().withMessage("Username must be specified.")
      .isAlphanumeric().withMessage("Username has non-alphanumeric characters."),
    check("email").isLength({ min: 1 }).trim().withMessage("Email must be specified.")
      .isEmail().withMessage("Email must be a valid email address.").custom(async (value) => {
        try {
          const user = await UserModel.findOne({ email: value }).lean();
          if (user) {
            return ("E-mail already in use");
          }
        } 
        catch(error) {
          return error;
        }
      }),
    check("password").isLength({ min: 6 }).trim().withMessage("Password must be 6 characters or greater."),
    body("username").escape(),
    body("email").escape(),
    body("password").escape(),
    (req, res, next) => {
      try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return apiResponse.validationErrorWithData(res, "Validation Error.", errors.array());
        } else {
          Authenticator.registerApi(req, res, next);
        }
      } catch (error) {
        return apiResponse.errorResponse(res, error);
      }
    }
  ];

  static login = [
    check("username").isLength({ min: 1 }).trim().withMessage("Username must be specified."),
    check("password").isLength({ min: 1 }).trim().withMessage("Password must be specified."),
    body("username").escape(),
    body("password").escape(),
    (req, res, next) => {
      try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return apiResponse.validationErrorWithData(res, "Validation Error.", errors.array());
        } else {
          Authenticator.loginApi(req, res, next);
        }
      } catch (err) {
        return apiResponse.errorResponse(res, err);
      }
    }
  ];

  static changePassword = [
    check("newPassword").isLength({ min: 6 }).trim().withMessage("Password must be 6 characters or greater."),
    body("newPassword").escape(),
    async (req, res) => {
      try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return apiResponse.validationErrorWithData(res, "Validation Error.", errors.array());
        } else {
          const { userId, newPassword } = req.body;
          const user = await UserModel.findById(userId);
          if (user) {
            user.setPassword(newPassword, async (err, updatedUser) => {
              if (err) {
                return apiResponse.errorResponse(res, err);
              }
              await updatedUser.save();
              return apiResponse.successResponse(res, "Password changed successfully.");
            });
          } else {
            return apiResponse.notFoundResponse(res, "User not found.");
          }
        }
      } catch (err) {
        return apiResponse.errorResponse(res, err);
      }
    }
  ];
}

export default AuthApiController;
