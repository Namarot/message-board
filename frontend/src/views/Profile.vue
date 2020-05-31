<template>
  <div class="container">
    <header class="jumbotron">
      <h3>
        Profile:
        <strong>{{currentUser.username}}</strong>
      </h3>
    </header>
    <p>
      <strong>Id:</strong>
      {{currentUser.id}}
    </p>
    <p>
      <strong>Email:</strong>
      {{currentUser.email}}
    </p>
    <p>
      <strong>Role:</strong>
      {{currentUser.role}}
    </p>
    <p>
      <strong>Token:</strong>
      {{currentUser.accessToken}}
    </p>
  </div>
</template>

<script>
export default {
  name: "Profile",
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    }
  },
  mounted() {
    if (!this.currentUser) {
      this.$router.push("/login");
    }
  }
};
</script>
