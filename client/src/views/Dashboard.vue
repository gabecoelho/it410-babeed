<template>
  <v-app>
    <v-tabs
      background-color="#4db6ac"
      dark
      :align-with-title="true"
      :centered="true"
      grow
      show-arrows
      icons-and-text
      slider-size="4"
    >
      <v-tabs-slider color="#fbc02d"></v-tabs-slider>
      <v-tab>
        Feedings Tracking
        <v-icon>mdi-baby-bottle-outline</v-icon>
      </v-tab>
      <v-tab-item>
        <feeding />
      </v-tab-item>
      <v-tab>
        Diapers Tracking
        <v-icon>mdi-human-baby-changing-table</v-icon>
      </v-tab>
      <v-tab-item>
        <diapers />
      </v-tab-item>
    </v-tabs>
  </v-app>
</template>

<script>
import Feeding from "@/components/Feeding";
import Diapers from "@/components/Diapers";

export default {
  name: "Dashboard",
  components: {
    Feeding,
    Diapers
  },
  beforeCreate: function() {
    // TODO: Check if there is a user in the store, if there is, OK, if not, redirect to signin.
    if (!window.sessionStorage.getItem("vuex")) {
      this.$cookies.keys().forEach(cookie => this.$cookies.remove(cookie));
      this.$router.push("/");
    }
  },
  methods: {
    // TODO: Get stuff from the store??
    getUserData() {}
  },
  mounted() {
    this.getUserData();
  }
};
</script>

<style lang="scss" scoped>
</style>