<template>
  <div>
    <div v-for="feeding in feedingList" :key="feeding.key">
      <li>
        <v-icon>mdi-calendar</v-icon>
        {{new Date(feeding.timestamp).toLocaleString()}}
        <v-icon>mdi-clock</v-icon>
        {{feeding.time}}
        <v-icon
          class="icon-style"
          @click="removeFeeding(JSON.parse(JSON.stringify(feeding))._id)"
        >mdi-delete</v-icon>
        <v-icon
          class="icon-style"
          @click="editFeeding(JSON.parse(JSON.stringify(feeding))._id)"
        >mdi-pencil</v-icon>
      </li>
    </div>
  </div>
</template>

<script>
export default {
  name: "FeedingList",
  mounted() {
    this.$store.dispatch("fetchFeedings");
  },
  computed: {
    feedingList() {
      return this.$store.getters.latestFeedingList;
    }
  },
  methods: {
    removeFeeding(id) {
      this.$store.dispatch("removeFeeding", id);
    },
    editFeeding(id) {
      //   this.$store.dispatch("updateFeeding", id);
    }
  }
};
</script>

<style lang="scss" scoped>
@import url("https://fonts.googleapis.com/css2?family=Roboto+Mono&display=swap");
li {
  margin: 15px;
  font-family: "Roboto Mono", monospace;
  font-size: 1.5em;
}
.icon-style {
  margin-left: 5px;
}
</style>>