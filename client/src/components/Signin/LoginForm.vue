<template>
  <v-card class="mx-auto" max-width="500" outlined>
    <v-list-item three-line>
      <v-list-item-content>
        <v-list-item-title v-if="isSignup" class="headline mb-1">SIGNUP</v-list-item-title>
        <v-list-item-title v-else class="headline mb-1">LOGIN</v-list-item-title>

        <v-form v-model="valid">
          <v-container>
            <v-row align="center">
              <v-col cols="12" md="12">
                <v-text-field v-model="email" :rules="emailRules" label="Email" required></v-text-field>
              </v-col>
            </v-row>
            <v-row align="center">
              <v-col cols="12" md="12">
                <v-text-field
                  v-model="password"
                  :append-icon="showP1 ? 'mdi-eye' : 'mdi-eye-off'"
                  :type="showP1 ? 'text' : 'password'"
                  :rules="passwordRules"
                  label="Password"
                  @click:append="showP1 = !showP1"
                  required
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row v-if="isSignup" align="center">
              <v-col cols="12" md="12">
                <v-text-field
                  v-model="secondPassword"
                  :append-icon="showP2 ? 'mdi-eye' : 'mdi-eye-off'"
                  :type="showP2 ? 'text' : 'password'"
                  :rules="passwordRules"
                  label="Re-enter Password"
                  @click:append="showP2 = !showP2"
                  required
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-form>
      </v-list-item-content>
    </v-list-item>

    <div class="text-center button-padding-15">
      <v-btn
        :disabled="!valid || !isPasswordMatch()"
        v-if="isSignup"
        color="primary"
        @click="onSubmit"
      >Signup</v-btn>
      <v-btn :disabled="!valid" v-else color="primary" @click="onSubmit(this.isSignup)">Login</v-btn>
    </div>

    <v-card-actions>
      <v-btn
        v-if="isSignup"
        small
        text
        @click="switchForm(false)"
      >Already have an account? Click here to login</v-btn>
      <v-btn v-else small text @click="switchForm(true)">Sign-up for an account here.</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: "LoginForm",
  data() {
    return {
      valid: false,
      isSignup: true,
      showP1: false,
      showP2: false,
      email: "",
      password: "",
      passwordRules: [
        v => !!v || "The password field is required",
        v => v.length >= 6 || "Password must be more than 6 characters"
      ],
      secondPassword: "",
      emailRules: [
        v => !!v || "The email field is required.",
        v => /.+@.+/.test(v) || "Please enter a valid email."
      ]
    };
  },
  methods: {
    validateForm(isSignUp) {
      console.log("isSignUp = " + this.isSignUp);
      if (isSignUp) {
        if (this.email && this.password === this.secondPassword) {
          alert("valid form");
        } else {
          alert("invalid form");
        }
      } else {
        if (this.email && this.password) {
          console.log("valid form");
        }
      }
    },
    onSubmit(isSignup) {
      this.validateForm(isSignup);
      console.log("Form submitted");
    },
    switchForm(input) {
      this.isSignup = input;
    },
    isPasswordMatch() {
      return this.password === this.secondPassword;
    }
  }
};
</script>

<style>
.button-padding-15 {
  padding-bottom: 15px;
}
</style>