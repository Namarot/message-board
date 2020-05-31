import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:9000/api/user';

class UserService {
  getPublicContent() {
    return axios.get(API_URL + '/test/all');
  }
  getUserBoard() {
    return axios.get(API_URL + '/test/user', { headers: authHeader() });
  }
  getModeratorBoard() {
    return axios.get(API_URL + '/test/moderator', { headers: authHeader() });
  }
  getAdminBoard() {
    return axios.get(API_URL + '/test/admin', { headers: authHeader() });
  }

  getUser(id) {
    return axios.get(API_URL + '/' + id);
  }
  getUserByUsername(username) {
    return axios.get(API_URL + '/username/' + username);
  }
  getUserThreads(id) {
    return axios.get(API_URL + '/' + id + '/threads');
  }
  getUserReplies(id) {
    return axios.get(API_URL + '/' + id + '/replies');
  }
  getUsers() {
    return axios.get(API_URL, { headers: authHeader() });
  }
}

export default new UserService();