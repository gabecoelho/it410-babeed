<template>
  <div>
    <div v-for="diaper in diaperList" :key="diaper.key">
      <li>
        <span v-if="diaper.type === 'poop'">💩</span>
        <span v-else>💧</span>
        {{new Date(diaper.timestamp).toLocaleString()}}
        <v-icon
          class="icon-style"
          @click="removeDiaper(JSON.parse(JSON.stringify(diaper))._id)"
        >mdi-delete</v-icon>
        <v-icon
          class="icon-style"
          @click="editDiaper(JSON.parse(JSON.stringify(diaper))._id)"
        >mdi-pencil</v-icon>
      </li>
    </div>
  </div>
</template>

<script>
export default {
  name: "DiaperList",
  mounted() {
    this.$store.dispatch("fetchDiapers");
  },
  computed: {
    diaperList() {
      return this.$store.getters.latestDiaperList;
    }
  },
  methods: {
    removeDiaper(id) {
      this.$store.dispatch("removeDiaper", id);
    },
    editDiaper(id) {
      //   this.$store.dispatch("updateDiaper", id);
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