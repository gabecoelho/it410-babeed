<template>
  <v-app>
    <div class="home"></div>
    <v-tabs
      background-color="#0277BD"
      dark
      :align-with-title="true"
      :centered="true"
      grow
      show-arrows
    >
      <v-tab>Feeding</v-tab>
      <v-tab-item>
        <feeding />
      </v-tab-item>
      <v-tab>Diapers</v-tab>
      <v-tab-item>
        <diapers />
      </v-tab-item>
    </v-tabs>
  </v-app>
</template>

<script>
import Feeding from "@/components/Home/Feeding";
import Diapers from "@/components/Home/Diapers";

export default {
  name: "Home",
  components: {
    Feeding,
    Diapers
  }
};
</script>