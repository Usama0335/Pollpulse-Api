
// import axios from 'axios';
// import AuthService from './AuthService'; // Ensure this path is correct based on your project structure

// const POLL_API_URL = 'http://localhost:3000/'; // or your production URL

// class PollService {
//     async fetchPollsForUser() {
//         return await axios.get(POLL_API_URL + 'api/polls', { headers: AuthService.authHeader() });
//     }

//     async fetchAllPolls() {
//         return await axios.get(POLL_API_URL + 'api/polls'); // This endpoint is now public and does not require authentication
//     }

//     async addPollForUser(poll) {
//         return await axios.post(POLL_API_URL + 'api/polls', poll, { headers: AuthService.authHeader() });
//     }

//     async getPollById(pollId) {
//         return await axios.get(POLL_API_URL + `api/polls/${pollId}`, { headers: AuthService.authHeader() });
//     }

//     async updatePoll(pollId, poll) {
//         return await axios.put(POLL_API_URL + `api/polls/${pollId}`, poll, { headers: AuthService.authHeader() });
//     }

//     async deletePoll(pollId) {
//         return await axios.delete(POLL_API_URL + `api/polls/${pollId}`, { headers: AuthService.authHeader() });
//     }

//     async submitPollAnswer(pollId, answerData) {
//         return await axios.post(POLL_API_URL + `api/polls/${pollId}/answers`, answerData, { headers: AuthService.authHeader() });
//     }
// }

// export default new PollService();
import axios from 'axios';
import AuthService from './AuthService';

// const POLL_API_URL = 'http://localhost:3000/';
const POLL_API_URL = 'https://pollpulsebackend.azurewebsites.net/';

class PollService {
    async fetchPollsForUser() {
        return await axios.get(POLL_API_URL + 'api/polls', { headers: AuthService.authHeader() });
    }
    async fetchAllPolls() {
      return await axios.get(POLL_API_URL + 'api/polls'); // This endpoint is now public and does not require authentication
    }
    async addPollForUser(poll) {
        return await axios.post(POLL_API_URL + 'api/polls', poll, { headers: AuthService.authHeader() });
    }

    async getPollById(pollId) {
        return await axios.get(POLL_API_URL + `api/polls/${pollId}`, { headers: AuthService.authHeader() });
    }

    async updatePoll(pollId, poll) {
        return await axios.put(POLL_API_URL + `api/polls/${pollId}`, poll, { headers: AuthService.authHeader() });
    }

    async deletePoll(pollId) {
        return await axios.delete(POLL_API_URL + `api/polls/${pollId}`, { headers: AuthService.authHeader() });
    }

    async getShareLink(pollId) {
        return await axios.get(POLL_API_URL + `api/polls/${pollId}/share`);
    }

    async submitPollAnswer(pollId, answerData) {
        return await axios.post(POLL_API_URL + `api/polls/${pollId}/answers`, answerData, { headers: AuthService.authHeader() });
    }
}

export default new PollService();
