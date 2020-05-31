<template>
  <div class="container">
    <header class="jumbotron">
      <h3>Inbox</h3>
    </header>
    <ul id="pms">
      <li v-for="pm in pmsReceived" :key="pm.id">
        <div class="row">
          <div class="col-sm-12">
            <p>
              Sender:
              {{pm.senderUsername}}
            </p>
            <p>
              {{pm.content}}
            </p>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import UserService from "../services/user.service";
import PmService from "../services/pm.service";
export default {
  name: "Inbox",
  data() {
    return {
      // pmsSent: [],
      pmsReceived: [],
      // messageSent: "",
      messageReceived: ""
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
    // PmService.getSentPms().then(
    //   response => {
    //     response.data.forEach(element => {
    //       this.pmsSent.push(element);
    //     });
    //   },
    //   error => {
    //     this.messageSent = error.response.data.message;
    //   }
    // );
    PmService.getReceivedPms().then(
      response => {
        response.data.forEach(element => {
          UserService.getUser(element.senderId).then(
            response => {
              element.senderUsername = response.data.username;
              this.pmsReceived.push(element);
            },
            error => {
              this.messageReceived = error.response.data.message;
            }
          );
        });
      },
      error => {
        this.messageReceived = error.response.data.message;
      }
    );
  }
};
</script>