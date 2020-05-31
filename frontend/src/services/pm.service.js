import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:9000/api/pm';

class PmService {
  getPms() {
    return axios.get(API_URL, { headers: authHeader() });
  }
  getSentPms() {
    return axios.get(API_URL + '/sent', { headers: authHeader() });
  }
  getReceivedPms() {
    return axios.get(API_URL + '/received', { headers: authHeader() });
  }
  getPm(id) {
    return axios.get(API_URL + '/' + id, { headers: authHeader() });
  }
  sendPm(pm) {
    return axios.post(API_URL, {
      content: pm.content,
      receiverId: pm.receiverId
    }, {
      headers: authHeader()
    }).then(response => {
      return response.data;
    });
  }
}

export default new PmService();