/* import apiResponse from "../helpers/apiResponse.js";
import MongoosePollManager from "../managers/MongoosePollManager.js";

class PollsApiController {
    static async getAllPublicPolls(req, res) {
        try {
            const manager = new MongoosePollManager();
            const polls = await manager.fetchAllPolls();
            return apiResponse.successResponseWithData(res, "Operation success", polls);
        } catch (error) {
            return apiResponse.errorResponse(res, error);
        }
    }

    static async createPoll(req, res) {
        try {
            const manager = new MongoosePollManager();
            const poll = await manager.addPoll(req.user, req.body);
            return apiResponse.successResponseWithData(res, "Poll created successfully", poll);
        } catch (error) {
            return apiResponse.errorResponse(res, error);
        }
    }

    static async getPollById(req, res) {
        try {
            const manager = new MongoosePollManager();
            const poll = await manager.getPollById(req.user, req.params.id);
            if (!poll) {
                return apiResponse.notFoundResponse(res, "Poll not found");
            }
            return apiResponse.successResponseWithData(res, "Operation success", poll);
        } catch (error) {
            return apiResponse.errorResponse(res, error);
        }
    }

    static async updatePoll(req, res) {
        try {
            const manager = new MongoosePollManager();
            const poll = await manager.changePoll(req.user, {
                id: req.params.id,
                question: req.body.question,
                answer1: req.body.answer1,
                answer2: req.body.answer2,
            });
            if (!poll) {
                return apiResponse.notFoundResponse(res, "Poll not found");
            }
            return apiResponse.successResponseWithData(res, "Poll updated successfully", poll);
        } catch (error) {
            return apiResponse.errorResponse(res, error);
        }
    }

    static async deletePoll(req, res) {
        try {
            const manager = new MongoosePollManager();
            const poll = await manager.removePoll(req.user, req.params.id);
            if (!poll) {
                return apiResponse.notFoundResponse(res, "Poll not found");
            }
            return apiResponse.successResponse(res, "Poll deleted successfully");
        } catch (error) {
            return apiResponse.errorResponse(res, error);
        }
    }

    static async submitPollAnswer(req, res) {
        try {
            const manager = new MongoosePollManager();
            const pollId = req.params.id;
            const { answer } = req.body;

            const answerData = {
                answers: [answer],
                opinion: '', // Assuming you have an opinion field
                answeredBy: req.user.username
            };

            const updatedPoll = await manager.savePollAnswer(pollId, answerData);
            return apiResponse.successResponseWithData(res, "Answer submitted successfully", updatedPoll);
        } catch (error) {
            return apiResponse.errorResponse(res, error);
        }
    }
}

export default PollsApiController;
 */
import apiResponse from "../helpers/apiResponse.js";
import MongoosePollManager from "../managers/MongoosePollManager.js";

class PollsApiController {
    static async getAllPublicPolls(req, res) {
        try {
            const manager = new MongoosePollManager();
            const polls = await manager.fetchAllPolls();
            return apiResponse.successResponseWithData(res, "Operation success", polls);
        } catch (error) {
            return apiResponse.errorResponse(res, error);
        }
    }

    static async createPoll(req, res) {
        try {
            const manager = new MongoosePollManager();
            const poll = await manager.addPoll(req.user, req.body);
            return apiResponse.successResponseWithData(res, "Poll created successfully", poll);
        } catch (error) {
            return apiResponse.errorResponse(res, error);
        }
    }

    static async getPollById(req, res) {
        try {
            const manager = new MongoosePollManager();
            const poll = await manager.getPollById(req.user, req.params.id);
            if (!poll) {
                return apiResponse.notFoundResponse(res, "Poll not found");
            }
            return apiResponse.successResponseWithData(res, "Operation success", poll);
        } catch (error) {
            return apiResponse.errorResponse(res, error);
        }
    }

    static async updatePoll(req, res) {
        try {
            const manager = new MongoosePollManager();
            const poll = await manager.changePoll(req.user, {
                id: req.params.id,
                question: req.body.question,
                answer1: req.body.answer1,
                answer2: req.body.answer2,
            });
            if (!poll) {
                return apiResponse.notFoundResponse(res, "Poll not found");
            }
            return apiResponse.successResponseWithData(res, "Poll updated successfully", poll);
        } catch (error) {
            return apiResponse.errorResponse(res, error);
        }
    }

    static async deletePoll(req, res) {
        try {
            const manager = new MongoosePollManager();
            const poll = await manager.removePoll(req.user, req.params.id);
            if (!poll) {
                return apiResponse.notFoundResponse(res, "Poll not found");
            }
            return apiResponse.successResponse(res, "Poll deleted successfully");
        } catch (error) {
            return apiResponse.errorResponse(res, error);
        }
    }

    static async submitPollAnswer(req, res) {
        try {
            const manager = new MongoosePollManager();
            const pollId = req.params.id;
            const { answer } = req.body;
    
            const answerData = {
                answer: answer,
                answeredBy: req.user.id,
                username: req.user.username
            };
    
            const updatedPoll = await manager.savePollAnswer(pollId, answerData);
            return apiResponse.successResponseWithData(res, "Answer submitted successfully", updatedPoll);
        } catch (error) {
            return apiResponse.errorResponse(res, error);
        }
    }

    static async getPollShareLink(req, res) {
        try {
            const pollId = req.params.id;
            const manager = new MongoosePollManager();
            const poll = await manager.getPollById(req.user, pollId);

            if (!poll) {
                return apiResponse.notFoundResponse(res, "Poll not found");
            }

            const shareLink = `${process.env.CLIENT_URL}/poll/${pollId}`;
            return apiResponse.successResponseWithData(res, "Share link generated successfully", { shareLink });
        } catch (error) {
            return apiResponse.errorResponse(res, error);
        }
    }
    
}

export default PollsApiController;
