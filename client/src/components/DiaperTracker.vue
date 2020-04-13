<template>
  <v-app>
    <h2>Diaper Type</h2>
    <div @click="selectDiaperType" class="diaper-options">
      <img :style="cssVars" id="wet" src="@/assets/water-drop.png" alt="wet-diaper" />
      <img :style="cssVars" id="poop" src="@/assets/baby-poop.jpg" alt="poopy-diaper" />
    </div>

    <div class="btn-container">
      <a id="save" @click="save">
        <v-icon class="icons">mdi-content-save</v-icon>Save
      </a>
    </div>
    <v-alert v-if="showSuccess" type="success" id="alert">Diaper Saved Successfully.</v-alert>
  </v-app>
</template>

<script>
export default {
  name: "DiaperTracker",
  data() {
    return {
      wetGrayscale: "grayscale(100%)",
      poopGrayscale: "grayscale(100%)",
      selectedType: "",
      showSuccess: false
    };
  },
  methods: {
    selectDiaperType(e) {
      if (e.toElement.id === "wet") {
        this.selectedType = "wet";
        this.wetGrayscale = "grayscale(0%)";
        this.poopGrayscale = "grayscale(100%)";
      } else {
        this.selectedType = "poop";
        this.poopGrayscale = "grayscale(0%)";
        this.wetGrayscale = "grayscale(100%)";
      }
    },

    async save() {
      try {
        if (this.selectedType) {
          const diaper = {
            username: this.$store.state.username,
            type: this.selectedType,
            timestamp: new Date()
          };
          await this.$store.dispatch("saveDiaper", diaper);
          await this.$store.dispatch("fetchDiapers");
          this.showSuccess = true;
          setTimeout(() => (this.showSuccess = false), 2000);
        } else {
          confirm("Please select a diaper type.");
        }
      } catch (e) {
        confirm(
          "Problem saving diaper entry. Please reselect it and try again"
        );
      }
    }
  },
  computed: {
    cssVars() {
      return {
        "--computed-wet-grayscale": this.wetGrayscale,
        "--computed-poop-grayscale": this.poopGrayscale
      };
    }
  }
};
</script>


<style lang="scss" scoped>
$color: black;
$color-light: grey;

h2 {
  text-align: center;
  margin-top: 18px;
}

.diaper-options {
  cursor: pointer;

  align-items: center;
  margin: 10%;
  padding: 10px;
  display: flex;
  font-family: "Roboto Mono", monospace;
  align-self: center;
  justify-content: space-between;
  align-items: center;
}
#wet {
  filter: var(--computed-wet-grayscale);
}
#poop {
  filter: var(--computed-poop-grayscale);
}
#alert {
  margin: 20px;
}
.btn-container {
  display: flex;
  margin-top: 15px;

  a {
    text-align: center;
    font-family: "Roboto Mono", monospace;
    background: transparent;

    border: none;
    color: $color;
    padding: 10px 15px;
    margin-right: 10px;
    text-transform: uppercase;
    font-size: 2em;
    cursor: pointer;

    flex-grow: 1;

    transition: color 0.1s ease-out;

    &:hover {
      color: $color-light;
    }
  }

  .icons {
    font-size: 2em;
    color: $color;

    &:hover {
      color: $color-light;
    }
  }
}
</style>
