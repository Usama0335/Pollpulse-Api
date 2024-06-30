import axios from 'axios';

// const AUTH_API_URL = 'http://localhost:3000/api/auth/';


const AUTH_API_URL = 'https://pollpulsebackend.azurewebsites.net/';



class AuthService {
  static async register(user) {
    try {
      const response = await axios.post(AUTH_API_URL + 'register', {
        username: user.username,
        email: user.email,
        password: user.password
      }, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      });

      return response.data;

    } catch (error) {
      console.error('Register error: ', error);
      throw error;
    }
  }

  static async login(user) {
    try {
      const response = await axios.post(AUTH_API_URL + 'login', {
        username: user.username,
        password: user.password
      }, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      });

      if (response.data.data.token) {
        localStorage.setItem('user', JSON.stringify(response.data.data));
      }

      console.log('Login response:', response.data);  // Added for debugging
      console.log('User stored in localStorage:', localStorage.getItem('user'));  // Added for debugging
      return response.data;

    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  }

  static logout() {
    localStorage.removeItem('user');
  }

  static getCurrentUser() {
    return JSON.parse(localStorage.getItem("user"));
  }

  static authHeader() {
    let user = JSON.parse(localStorage.getItem('user'));

    if (user && user.token) {
      const headers = {
        Authorization: 'Bearer ' + user.token,
        'Content-Type': "application/x-www-form-urlencoded"
      }
      return headers;
    } else {
      return {};
    }
  }

  static async changePassword(userId, newPassword) {
    try {
      const response = await axios.put(`${AUTH_API_URL}change-password`, { userId, newPassword }, {
        headers: this.authHeader()
      });
      return response.data;
    } catch (error) {
      console.error('Change password error:', error);
      throw error;
    }
  }
  
}

export default AuthService;
