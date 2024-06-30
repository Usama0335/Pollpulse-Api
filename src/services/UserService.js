import axios from 'axios';
import AuthService from '../services/AuthService';

// When moving to Azure and connecting the sites to each other we have to change the URL
const POLL_API_URL = 'https://pollpulsebackend.azurewebsites.net/';
// const POLL_API_URL = 'https://kwapinotes2024.azurewebsites.net/'

// The decision about whether we should have BOTH the management of users AND polls in this service is probably something we would need to think about.
// Here the aggregate is the user, i.e., a user has polls!
class PollService {
  async fetchPollsForUser() {
    return await axios.get(POLL_API_URL + 'api/polls', { headers: AuthService.authHeader() });
  }

  async addPollForUser(poll) {
    return await axios.post(POLL_API_URL + 'api/polls', poll, { headers: AuthService.authHeader() });
  }

  async changePollForUser(pollId, poll) {
    return await axios.put(POLL_API_URL + `api/polls/${pollId}`, poll, { headers: AuthService.authHeader() });
  }
}

export default new PollService();
