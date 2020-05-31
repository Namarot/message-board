<template>
  <div class="container">
    <header class="jumbotron">
      <h4>Threads</h4>
    </header>
    <ul id="threads">
      <li v-for="thread in threadList" :key="thread.id">
        <div class="row">
          <div class="col-sm-12">
            <p>
              <router-link :to="{ name: 'replies', params: { threadId: thread.id}}">{{thread.title}}</router-link>
            </p>
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
// import UserService from "../services/user.service";
import ThreadService from "../services/thread.service";
export default {
  name: "Home",
  data() {
    return {
      // content: "",
      threadList: [],
      loading: false,
      successful: false,
      message: ""
    };
  },
  mounted() {
    // UserService.getPublicContent().then(
    //   response => {
    //     this.content = response.data;
    //   },
    //   error => {
    //     this.content = error.response.data.message;
    //   }
    // );
    ThreadService.getThreads().then(
      response => {
        response.data.forEach(element => {
          this.threadList.push(element);
        });
      },
      error => {
        this.message = error.response.data.message;
      }
    );
  }
};
</script>
