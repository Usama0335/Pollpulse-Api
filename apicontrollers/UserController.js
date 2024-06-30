import MongooseJwtApiAuthenticator from '../middlewares/auth/MongooseJwtApiAuthenticator.js';
import UserModel from '../models/UserModel.js';
import apiResponse from "../helpers/apiResponse.js";

class UserController {
    static register(req, res) {
        MongooseJwtApiAuthenticator.registerApi(req, res);
    }

    static login(req, res) {
        MongooseJwtApiAuthenticator.loginApi(req, res);
    }

    static passwordReset(req, res) {
        // Implement password reset functionality
        // This could involve sending a reset link to the user's email
        // and then allowing them to reset their password through a secure link
        return apiResponse.successResponse(res, "Password reset functionality is not yet implemented.");
    }
}

export default UserController;
