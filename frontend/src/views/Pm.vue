<template>
  <div class="col-sm-12">
    <div class="card card-container">
      <form name="form" @submit.prevent="handleSubmission">
        <div v-if="!successful">
          <div class="form-group">
            <label for="receiver">To (Username)</label>
            <input
              v-model="pm.receiverUsername"
              v-validate="'required'"
              type="text"
              class="form-control"
              name="receiver"
            />
            <div
              v-if="errors.has('receiver')"
              class="alert alert-danger"
              role="alert"
            >{{errors.first('receiver')}}</div>
          </div>
          <div class="form-group">
            <label for="content">Content</label>
            <textarea
              v-model="pm.content"
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
              <span>Send</span>
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
import PmService from "../services/pm.service";
import UserService from "../services/user.service";
import Pm from "../models/pm";

export default {
  name: "Pm",
  data() {
    return {
      pm: new Pm("", "", ""),
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
        UserService.getUserByUsername(this.pm.receiverUsername).then(
          response => {
            this.pm.receiverId = response.data.id;
            PmService.sendPm(this.pm).then(
              () => {
                this.message = "PM sent";
                this.successful = true;
              },
              error => {
                this.loading = false;
                this.message = error.response.data.message;
              }
            );
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
