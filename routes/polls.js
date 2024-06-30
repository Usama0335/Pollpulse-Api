/* 
import express from 'express';
import PollsApiController from '../apicontrollers/PollsApiController.js';
import MongooseJwtApiAuthenticator from '../middlewares/auth/MongooseJwtApiAuthenticator.js';

const router = express.Router();

// Poll Management Routes
router.get('/', PollsApiController.getAllPublicPolls); // Publicly accessible endpoint to fetch all polls
router.post('/', MongooseJwtApiAuthenticator.authenticateApi, PollsApiController.createPoll);
router.get('/:id', MongooseJwtApiAuthenticator.authenticateApi, PollsApiController.getPollById);
router.put('/:id', MongooseJwtApiAuthenticator.authenticateApi, PollsApiController.updatePoll);
router.delete('/:id', MongooseJwtApiAuthenticator.authenticateApi, PollsApiController.deletePoll);
router.post('/:id/answers', MongooseJwtApiAuthenticator.authenticateApi, PollsApiController.submitPollAnswer); // New route for submitting poll answers

export default router;
 */
import express from 'express';
import PollsApiController from '../apicontrollers/PollsApiController.js';
import MongooseJwtApiAuthenticator from '../middlewares/auth/MongooseJwtApiAuthenticator.js';

const router = express.Router();

// Poll Management Routes
router.get('/', PollsApiController.getAllPublicPolls); // Publicly accessible endpoint to fetch all polls
router.post('/', MongooseJwtApiAuthenticator.authenticateApi, PollsApiController.createPoll);
router.get('/:id', MongooseJwtApiAuthenticator.authenticateApi, PollsApiController.getPollById);
router.put('/:id', MongooseJwtApiAuthenticator.authenticateApi, PollsApiController.updatePoll);
router.delete('/:id', MongooseJwtApiAuthenticator.authenticateApi, PollsApiController.deletePoll);
router.post('/:id/answers', MongooseJwtApiAuthenticator.authenticateApi, PollsApiController.submitPollAnswer); // New route for submitting poll answers
router.get('/:id/share', PollsApiController.getPollShareLink); // Public endpoint to get the shareable link for a poll

export default router;
