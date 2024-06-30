/* import chalk from 'chalk';
import Poll from '../models/PollModel.js';

class MongoosePollManager {
    constructor() {
        this.PollModel = Poll;
    }

    async fetchAllPolls() {
        try {
            const allPolls = await this.PollModel.find().populate('belongsTo', 'username');
            return allPolls.map(poll => poll.toObject());
        } catch (e) {
            console.log(chalk.red.inverse('Error fetching all polls'));
            return [];
        }
    }

    async fetchPolls(user) {
        try {
            const allPollsBelongingToUser = await this.PollModel.find({ belongsTo: user.id });
            const allPollObjects = allPollsBelongingToUser.map(element => element.toObject());
            console.log(chalk.blueBright.inverse('All polls loaded for user:', user.id));
            return allPollObjects;
        } catch (e) {
            console.log(chalk.red.inverse('Error fetching polls for user:', user.id));
            return [];
        }
    }

    async addPoll(user, pollData) {
        if (user) {
            const newPoll = {
                ...pollData,
                belongsTo: user.id
            };
            const addedPollDocument = await this.PollModel.create(newPoll);
            if (addedPollDocument) {
                console.log(chalk.green.inverse('New poll added!', addedPollDocument));
                return addedPollDocument.toObject();
            } else {
                console.log(chalk.red.inverse('Error in creating the new poll!'));
            }
        } else {
            console.log(chalk.red.inverse('No user given!'));
        }
        return null;
    }

    async getPollById(user, id) {
        const foundPoll = await this.PollModel.findOne({ _id: id, belongsTo: user.id });
        if (foundPoll) {
            return foundPoll.toObject();
        } else {
            console.log(chalk.red.inverse(`Poll not found with id = ${id} !`));
        }
        return null;
    }

    async changePoll(user, poll) {
        const pollToChangeDocument = await this.PollModel.findOne({ _id: poll.id, belongsTo: user.id });
        if (pollToChangeDocument) {
            pollToChangeDocument.question = poll.question;
            pollToChangeDocument.answer1 = poll.answer1;
            pollToChangeDocument.answer2 = poll.answer2;

            const changedPollDocument = await pollToChangeDocument.save();
            return changedPollDocument.toObject();
        } else {
            console.log(chalk.red.inverse('Poll to change not found!'));
        }
        return null;
    }

    async removePoll(user, id) {
        try {
            const selectedPollById = await this.PollModel.findById(id).populate('belongsTo');
            if (!selectedPollById) {
                console.log(chalk.red.inverse(`No poll found with id = ${id} !`));
                return null;
            }

            if (selectedPollById.belongsTo.id == user.id) {
                const removedPollDocument = await this.PollModel.findByIdAndDelete(id);
                console.log(chalk.green.inverse('Poll removed!' + removedPollDocument));
                return removedPollDocument.toObject();
            } else {
                console.log(chalk.red.inverse('Poll id and user do not correlate! No deletion made!'));
                return null;
            }
        } catch (error) {
            console.error("Error in removePoll:", error);
            throw error;
        }
    }

    async savePollAnswer(pollId, answerData) {
        try {
            const poll = await this.PollModel.findById(pollId);
            if (!poll) {
                throw new Error(`Poll with id ${pollId} not found`);
            }

            poll.answers = poll.answers || [];
            poll.answers.push(answerData);

            const updatedPoll = await poll.save();
            return updatedPoll.toObject();
        } catch (error) {
            console.error("Error saving poll answer:", error);
            throw error;
        }
    }
}

export default MongoosePollManager;
 */
import chalk from 'chalk';
import Poll from '../models/PollModel.js';

class MongoosePollManager {
    constructor() {
        this.PollModel = Poll;
    }

    async fetchAllPolls() {
        try {
            const allPolls = await this.PollModel.find().populate('belongsTo', 'username');
            return allPolls.map(poll => poll.toObject());
        } catch (e) {
            console.log(chalk.red.inverse('Error fetching all polls'));
            return [];
        }
    }

    async fetchPolls(user) {
        try {
            const allPollsBelongingToUser = await this.PollModel.find({ belongsTo: user.id });
            const allPollObjects = allPollsBelongingToUser.map(element => element.toObject());
            console.log(chalk.blueBright.inverse('All polls loaded for user:', user.id));
            return allPollObjects;
        } catch (e) {
            console.log(chalk.red.inverse('Error fetching polls for user:', user.id));
            return [];
        }
    }

    async addPoll(user, pollData) {
        if (user) {
            const newPoll = {
                ...pollData,
                belongsTo: user.id
            };
            const addedPollDocument = await this.PollModel.create(newPoll);
            if (addedPollDocument) {
                console.log(chalk.green.inverse('New poll added!', addedPollDocument));
                return addedPollDocument.toObject();
            } else {
                console.log(chalk.red.inverse('Error in creating the new poll!'));
            }
        } else {
            console.log(chalk.red.inverse('No user given!'));
        }
        return null;
    }

    async getPollById(user, id) {
        const foundPoll = await this.PollModel.findOne({ _id: id, belongsTo: user.id });
        if (foundPoll) {
            return foundPoll.toObject();
        } else {
            console.log(chalk.red.inverse(`Poll not found with id = ${id} !`));
        }
        return null;
    }

    async changePoll(user, poll) {
        const pollToChangeDocument = await this.PollModel.findOne({ _id: poll.id, belongsTo: user.id });
        if (pollToChangeDocument) {
            pollToChangeDocument.question = poll.question;
            pollToChangeDocument.answer1 = poll.answer1;
            pollToChangeDocument.answer2 = poll.answer2;

            const changedPollDocument = await pollToChangeDocument.save();
            return changedPollDocument.toObject();
        } else {
            console.log(chalk.red.inverse('Poll to change not found!'));
        }
        return null;
    }

    async removePoll(user, id) {
        try {
            const selectedPollById = await this.PollModel.findById(id).populate('belongsTo');
            if (!selectedPollById) {
                console.log(chalk.red.inverse(`No poll found with id = ${id} !`));
                return null;
            }

            if (selectedPollById.belongsTo.id == user.id) {
                const removedPollDocument = await this.PollModel.findByIdAndDelete(id);
                console.log(chalk.green.inverse('Poll removed!' + removedPollDocument));
                return removedPollDocument.toObject();
            } else {
                console.log(chalk.red.inverse('Poll id and user do not correlate! No deletion made!'));
                return null;
            }
        } catch (error) {
            console.error("Error in removePoll:", error);
            throw error;
        }
    }
    async savePollAnswer(pollId, answerData) {
    try {
        const poll = await this.PollModel.findById(pollId);
        if (!poll) {
            throw new Error(`Poll with id ${pollId} not found`);
        }

        poll.answers.push(answerData);

        const updatedPoll = await poll.save();
        return updatedPoll.toObject();
    } catch (error) {
        console.error("Error saving poll answer:", error);
        throw error;
    }
}

async savePollAnswer(pollId, answerData) {
    try {
        const poll = await this.PollModel.findById(pollId);
        if (!poll) {
            throw new Error(`Poll with id ${pollId} not found`);
        }

        poll.answers.push(answerData);

        const updatedPoll = await poll.save();
        return updatedPoll.toObject();
    } catch (error) {
        console.error("Error saving poll answer:", error);
        throw error;
    }
}

    }


export default MongoosePollManager;
