<template>
  <div class="container">
    <header class="jumbotron">
      <h5>{{parentThread.title}}</h5>
      <p>{{parentThread.content}}</p>
      <p>Created by: {{parentThread.username}}</p>
    </header>
    <div v-if="currentUser">
      <form name="userReply" @submit.prevent="handleReply()">
        <div class="form-group">
          <label for="userReplyContent">Reply:</label>
          <textarea
            v-model="usrReply.content"
            v-validate="'required'"
            type="text"
            class="form-control"
            name="userReplyContent"
            rows="3"
          ></textarea>
          <div
            v-if="errors.has('userReplyContent')"
            class="alert alert-danger"
            role="alert"
          >You can't post an empty reply.</div>
        </div>
        <div class="form-group">
          <button class="btn btn-primary" :disabled="loading">
            <span v-show="loading" class="spinner-border spinner-border-sm"></span>
            <span>Submit</span>
          </button>
        </div>
        <div class="form-group">
          <div v-if="submitMessage" class="alert alert-danger" role="alert">{{submitMessage}}</div>
        </div>
      </form>
    </div>
    <ul id="replies">
      <li v-for="reply in replyList" :key="reply.id">
        <div class="row">
          <div class="col-sm-10">
            <p>{{reply.username}}</p>
            <p>{{reply.content}}</p>
          </div>
        </div>
      </li>
    </ul>
    <div
      v-if="message"
      class="alert"
      :class="successful ? 'alert-success' : 'alert-danger'"
    >{{message}}</div>
  </div>
</template>

<script>
import UserService from "../services/user.service";
import ThreadService from "../services/thread.service";
import Reply from "../models/reply";
export default {
  name: "Replies",
  data() {
    return {
      parentThread: {},
      replyList: [],
      usrReply: new Reply(""),
      loading: false,
      successful: false,
      message: "",
      submitMessage: ""
    };
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    }
  },
  mounted() {
    // if (this.$route.params.threadId) {
      ThreadService.getThread(this.$route.params.threadId).then(
        response => {
          this.parentThread.title = response.data.title;
          this.parentThread.content = response.data.content;
          this.parentThread.userId = response.data.userId;
          UserService.getUser(this.parentThread.userId).then(
            response => {
              this.parentThread.username = response.data.username;
            },
            error => {
              this.message = error.response.data.message;
            }
          );
        },
        error => {
          this.message = error.response.data.message;
        }
      );
      ThreadService.getThreadReplies(this.$route.params.threadId).then(
        response => {
          response.data.forEach(element => {
            UserService.getUser(element.userId).then(
              response => {
                element.username = response.data.username;
                this.replyList.push(element);
              },
              error => {
                this.message = error.response.data.message;
              }
            );
          });
        },
        error => {
          this.message = error.response.data.message;
        }
      );
    // }
  },
  methods: {
    handleReply() {
      this.loading = true;
      this.$validator.validateAll().then(isValid => {
        if (!isValid) {
          this.loading = false;
          return;
        }
        ThreadService.newReply(this.$route.params.threadId, this.usrReply).then(
          () => {
            // this.usrReply.content = "";
            this.submitMessage = "Reply submitted";
            this.successful = true;
            this.loading = false;
          },
          error => {
            this.loading = false;
            this.submitMessage = error.response.data.message;
          }
        );
      });
    }
  }
};
</script>
