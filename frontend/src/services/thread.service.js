import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:9000/api/thread';

class ThreadService {
  getThreads() {
    return axios.get(API_URL);
  }
  getThread(id) {
    return axios.get(API_URL + '/' + id);
  }
  getThreadReplies(id) {
    return axios.get(API_URL + '/' + id + '/replies');
  }
  getThreadsByUser(id) {
    return axios.get(API_URL + '/user/' + id);
  }
  createThread(thread) {
    return axios.post(API_URL, {
      title: thread.title,
      content: thread.content
    }, {
      headers: authHeader()
    }).then(response => {
      return response.data;
    });
  }
  editThread(id, thread) {
    return axios.put(API_URL + '/' + id, {
      content: thread.content
    }, {
      headers: authHeader()
    }).then(response => {
      return response.data;
    });
  }
  newReply(id, reply) {
    return axios.post(API_URL + '/' + id, {
      content: reply.content
    }, {
      headers: authHeader()
    }).then(response => {
      return response.data;
    });
  }
}

export default new ThreadService();