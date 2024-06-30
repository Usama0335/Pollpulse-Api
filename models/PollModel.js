/* import mongoose from 'mongoose';

const { Schema } = mongoose;

const PollSchema = new Schema({
    question: { type: String, required: true },
    answer1: { type: String, required: true },
    answer2: { type: String, required: true },
    belongsTo: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
}, {
    timestamps: true
});

const Poll = mongoose.model('Poll', PollSchema);

export default Poll;
 */
import mongoose from 'mongoose';

const { Schema } = mongoose;

const PollSchema = new Schema({
    question: { type: String, required: true },
    answer1: { type: String, required: true },
    answer2: { type: String, required: true },
    belongsTo: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    answers: [
        {
            answer: String,
            answeredBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
            username: String,
            createdAt: { type: Date, default: Date.now }
        }
    ]
}, {
    timestamps: true
});

const Poll = mongoose.model('Poll', PollSchema);

export default Poll;
