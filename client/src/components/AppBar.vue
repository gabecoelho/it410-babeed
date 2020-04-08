<template>
  <v-app>
    <v-app-bar app color="#78909C" dark>
      <v-toolbar-title class="baby-emoji">👶Babeed</v-toolbar-title>
      <v-spacer></v-spacer>
      <h3 v-if="this.$store.state.loggedIn" class="wecolme-message">Hi, {{this.$store.state.name}}!</h3>
      <v-btn
        v-if="this.$route.name === 'Dashboard'"
        :loading="loading"
        :disabled="loading"
        color="blue-grey"
        class="ma-2 white--text"
        @click="loader = 'loading'"
      >
        Logout
        <v-icon right dark>mdi-logout</v-icon>
      </v-btn>
    </v-app-bar>
    <v-content>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
export default {
  name: "AppBar",
  data() {
    return {
      loading: false,
      loader: false
    };
  },
  watch: {
    async loader() {
      const l = this.loader;
      this[l] = !this[l];

      setTimeout(() => ((this[l] = false), this.signOut()), 500);

      this.loader = null;
    }
  },
  methods: {
    signOut() {
      this.$store.dispatch("setLogoutData");
      if (this.$route.name !== "Signin") this.$router.push("/");
    }
  }
};
</script>

<style lang="stylus">
.baby-emoji {
  font-size: 4rem;
}

.welcome-message {
  margin-right: 10px;
}
</style>