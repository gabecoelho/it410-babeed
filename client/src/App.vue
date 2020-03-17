<template>
  <v-app>
    <v-app-bar app color="#78909C" dark>
      <v-toolbar-title class="baby-emoji">👶Babeed</v-toolbar-title>
      <v-spacer></v-spacer>
    </v-app-bar>
    <v-content>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
import Signin from "@/views/Signin";

export default {
  name: "App",

  components: {
    Signin
  },

  data: () => ({
    //
  })
};
</script>

<style lang="stylus">
.baby-emoji {
  font-size: 4rem;
}
</style>
