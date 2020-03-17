<template>
  <v-app>
    <v-app-bar app color="primary" dark></v-app-bar>\
    <v-content>
      <Signin />
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
