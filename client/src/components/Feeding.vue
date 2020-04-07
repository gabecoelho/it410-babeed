<template>
  <v-app>
    <div class="split left">
      <Clock />
    </div>
    <div class="split right scrollable">
      <h2>Feeding History</h2>
      <FeedingList />
    </div>
  </v-app>
</template>

<script>
import Clock from "@/components/Clock";
import FeedingList from "@/components/FeedingList";

export default {
  name: "Feedings",
  components: {
    Clock,
    FeedingList
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