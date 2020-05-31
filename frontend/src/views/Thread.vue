<template>
  <div class="col-sm-12">
    <div class="card card-container">
      <form name="form" @submit.prevent="handleSubmission">
        <div v-if="!successful">
          <div class="form-group">
            <label for="title">Title</label>
            <input
              v-model="thread.title"
              v-validate="'required'"
              type="text"
              class="form-control"
              name="title"
            />
            <div
              v-if="errors.has('title')"
              class="alert alert-danger"
              role="alert"
            >{{errors.first('title')}}</div>
          </div>
          <div class="form-group">
            <label for="content">Content</label>
            <textarea
              v-model="thread.content"
              v-validate="'required'"
              type="text"
              class="form-control"
              name="content"
              rows="5"
            ></textarea>
            <div
              v-if="errors.has('content')"
              class="alert alert-danger"
              role="alert"
            >{{errors.first('content')}}</div>
          </div>
          <div class="form-group">
            <button class="btn btn-primary btn-block" :disabled="loading">
              <span v-show="loading" class="spinner-border spinner-border-sm"></span>
              <span>Submit</span>
            </button>
          </div>
          <div class="form-group">
            <div v-if="message" class="alert alert-danger" role="alert">{{message}}</div>
          </div>
        </div>
      </form>
      <div
        v-if="message"
        class="alert"
        :class="successful ? 'alert-success' : 'alert-danger'"
      >{{message}}</div>
    </div>
  </div>
</template>

<script>
import ThreadService from "../services/thread.service";
import Thread from "../models/thread";

export default {
  name: "Thread",
  data() {
    return {
      thread: new Thread("", ""),
      loading: false,
      successful: false,
      message: ""
    };
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    }
  },
  mounted() {
    if (!this.currentUser) {
      this.$router.push("/login");
    }
  },
  methods: {
    handleSubmission() {
      this.message = "";
      this.loading = true;
      this.$validator.validateAll().then(isValid => {
        if (!isValid) {
          this.loading = false;
          return;
        }

        ThreadService.createThread(this.thread).then(
          () => {
            this.message = "Thread created";
            this.successful = true;
          },
          error => {
            this.loading = false;
            this.message = error.response.data.message;
          }
        );
      });
    }
  }
};
</script>

<style scoped>
label {
  display: block;
  margin-top: 10px;
}

.card-container.card {
  max-width: 350px !important;
  padding: 40px 40px;
}

.card {
  background-color: #f7f7f7;
  padding: 20px 25px 30px;
  margin: 0 auto 25px;
  margin-top: 50px;
  -moz-border-radius: 2px;
  -webkit-border-radius: 2px;
  border-radius: 2px;
  -moz-box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
  -webkit-box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
}

.profile-img-card {
  width: 96px;
  height: 96px;
  margin: 0 auto 10px;
  display: block;
  -moz-border-radius: 50%;
  -webkit-border-radius: 50%;
  border-radius: 50%;
}
</style>
