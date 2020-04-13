<template>
  <v-app>
    <div class="split left">
      <DiaperTracker />
    </div>
    <div class="split right scrollable">
      <h2>Diapers History</h2>
      <DiaperList />
    </div>
  </v-app>
</template>

<script>
import DiaperList from "@/components/DiaperList";
import DiaperTracker from "@/components/DiaperTracker";

export default {
  name: "Diapers",
  components: {
    DiaperList,
    DiaperTracker
  }
};
</script>

<style scoped>
h2 {
  margin: 20px;
}
.split {
  height: 100%;
  width: 50%;
  position: fixed;
  z-index: 1;
  /* overflow-x: hidden; */
}

.left {
  left: 0;
  /* position: fixed; */
}

.right {
  right: 0;
  overflow: auto;
}
</style>