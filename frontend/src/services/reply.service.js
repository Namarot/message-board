import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:9000/api/reply';

class ReplyService {
  getReply(id) {
    return axios.get(API_URL + '/' + id);
  }
  getThreadReplies(id) {
    return axios.get(API_URL + '/thread/' + id);
  }
  getRepliesByUser(id) {
    return axios.get(API_URL + '/user/' + id);
  }
  newReply(reply) {
    return axios.post(API_URL, {
      content: reply.content,
      threadId: reply.threadId
    }, {
      headers: authHeader()
    }).then(response => {
      return response.data;
    });
  }
  newReplyToThread(id, reply) {
    return axios.post(API_URL + '/' + id, {
      content: reply.content
    }, {
      headers: authHeader()
    }).then(response => {
      return response.data;
    });
  }
  editReply(id, reply) {
    return axios.put(API_URL + '/' + id, {
      content: reply.content
    }, {
      headers: authHeader()
    }).then(response => {
      return response.data;
    });
  }
}

export default new ReplyService();