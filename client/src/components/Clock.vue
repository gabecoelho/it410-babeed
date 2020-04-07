<template>
  <v-app>
    <div :style="cssVars" class="circle-button" @click="clockButtonClick">
      <div class="button-text">{{this.buttonText}}</div>
    </div>
    <div id="clock">
      <span class="time">{{ time }}</span>

      <div class="btn-container">
        <a id="reset" @click="reset">
          <v-icon class="icons">mdi-restart</v-icon>Reset
        </a>
        <a id="save" @click="save">
          <v-icon class="icons">mdi-content-save</v-icon>Save
        </a>
      </div>
      <v-alert v-if="showSuccess" type="success" id="alert">Time Saved Successfully.</v-alert>
    </div>
  </v-app>
</template>

<script>
export default {
  name: "Clock",
  data() {
    return {
      time: "00:00:00.000",
      timeBegan: null,
      timeStopped: null,
      stoppedDuration: 0,
      started: null,
      running: false,
      buttonText: "START",
      buttonBgColor: "#66bb6a",
      showSuccess: false
    };
  },
  methods: {
    start() {
      if (this.running) return;

      if (this.timeBegan === null) {
        this.reset();
        this.timeBegan = new Date();
      }

      if (this.timeStopped !== null) {
        this.stoppedDuration += new Date() - this.timeStopped;
      }

      this.started = setInterval(this.clockRunning, 10);
      this.running = true;
    },

    stop() {
      this.running = false;
      this.timeStopped = new Date();
      clearInterval(this.started);
    },

    reset() {
      if (this.running === true) {
        this.buttonText = "START";
        this.buttonBgColor = "#66bb6a";
      }
      this.running = false;
      clearInterval(this.started);
      this.stoppedDuration = 0;
      this.timeBegan = null;
      this.timeStopped = null;
      this.time = "00:00:00.000";
    },

    clockRunning() {
      var currentTime = new Date(),
        timeElapsed = new Date(
          currentTime - this.timeBegan - this.stoppedDuration
        ),
        hour = timeElapsed.getUTCHours(),
        min = timeElapsed.getUTCMinutes(),
        sec = timeElapsed.getUTCSeconds(),
        ms = timeElapsed.getUTCMilliseconds();

      this.time =
        this.zeroPrefix(hour, 2) +
        ":" +
        this.zeroPrefix(min, 2) +
        ":" +
        this.zeroPrefix(sec, 2) +
        "." +
        this.zeroPrefix(ms, 3);
    },

    zeroPrefix(num, digit) {
      var zero = "";
      for (var i = 0; i < digit; i++) {
        zero += "0";
      }
      return (zero + num).slice(-digit);
    },
    clockButtonClick() {
      console.log(this.buttonText);
      if (this.buttonText === "START") {
        this.buttonText = "STOP";
        this.buttonBgColor = "#ef5350";
        this.start();
      } else {
        this.buttonText = "START";
        this.buttonBgColor = "#66bb6a";
        this.stop();
      }
    },
    save() {
      if (this.running !== true) {
        if (this.timeBegan !== null) {
          // TODO: dispatch event to store
          console.log("Save");
          this.reset();
          this.showSuccess = true;
          setTimeout(() => (this.showSuccess = false), 2000);
        } else {
          confirm("No time has elapsed to save.");
        }
      } else {
        confirm("Please stop the clock to save.");
      }
    }
  },
  computed: {
    cssVars() {
      return {
        "--button-bg-color": this.buttonBgColor
      };
    }
  }
};
</script>

<style lang="scss" scoped>
$color: black;
$color-light: grey;

@import url("https://fonts.googleapis.com/css2?family=Roboto+Mono&display=swap");

html,
body {
  padding: 0;
  margin: 0;
  width: 100%;
  height: 100%;
}

body {
  background-color: rgb(10, 10, 10);
  font-family: "Roboto Mono", monospace;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: center;
  align-content: stretch;
  align-items: center;
}

#alert {
  margin: 20px;
}

#clock {
  order: 0;
  flex: 0 1 auto;
  align-self: center;

  color: $color;

  .time {
    font-size: 5em;
    font-family: "Roboto Mono", monospace;
  }

  .text {
    margin-top: 30px;
    font-size: 1em;
    color: rgba($color, 0.15);
    text-align: center;

    a {
      text-decoration: none;
      color: inherit;

      transition: color 0.1s ease-out;

      &:hover {
        color: $color;
      }
    }
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
}
.circle-button {
  display: flex;
  font-family: "Roboto Mono", monospace;
  cursor: pointer;
  align-self: center;
  justify-content: center;
  align-items: center;
  height: 300px;
  width: 300px;
  background-color: var(--button-bg-color);
  border: 3px solid black;
  border-radius: 50%;
  margin: 50px;
  &:hover {
    opacity: 80%;
  }
}
.button-text {
  font-size: 4rem;
}
</style>