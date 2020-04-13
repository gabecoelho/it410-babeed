<template>
  <div>
    <v-card class="mx-auto card-spacing" max-width="500" outlined>
      <v-list-item three-line>
        <v-list-item-content>
          <v-list-item-title v-if="isSignup" class="headline mb-1">SIGNUP</v-list-item-title>
          <v-list-item-title v-else class="headline mb-1">LOGIN</v-list-item-title>
          <v-alert v-if="error" type="error">There was a problem. Try again</v-alert>
          <v-form v-model="valid">
            <v-container>
              <v-row align="center">
                <v-col cols="12" md="12">
                  <v-text-field v-model="email" :rules="emailRules" label="Email" required></v-text-field>
                </v-col>
              </v-row>
              <v-row v-if="isSignup" align="center">
                <v-col cols="12" md="12">
                  <v-text-field v-model="name" :rules="nameRules" label="Name" required></v-text-field>
                </v-col>
              </v-row>
              <v-row v-if="isSignup" align="center">
                <v-col cols="12" md="12">
                  <v-text-field v-model="username" :rules="usernameRules" label="Username" required></v-text-field>
                </v-col>
              </v-row>
              <v-row v-if="isSignup" align="center">
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
              <v-row v-else align="center">
                <v-col cols="12" md="12">
                  <v-text-field
                    v-model="password"
                    type="password"
                    label="Password"
                    :rules="loginPasswordRule"
                    required
                  ></v-text-field>
                </v-col>
              </v-row>

              <v-col v-if="isSignup">
                <v-switch v-model="terms" :rules="[v => !!v || 'You must agree to continue!']">
                  <template v-slot:label>
                    <div>
                      I agree with the
                      <v-tooltip bottom>
                        <template v-slot:activator="{ on }">
                          <span class="terms" @click.stop v-on="on">Terms and Conditions</span>
                        </template>
                        You agree to share your information and let us store it.
                      </v-tooltip>
                    </div>
                  </template>
                </v-switch>
              </v-col>
            </v-container>
          </v-form>
        </v-list-item-content>
      </v-list-item>

      <div v-if="showProgress" class="text-center">
        <v-progress-circular indeterminate color="primary"></v-progress-circular>
      </div>

      <div v-else class="text-center button-padding-15">
        <v-btn
          :disabled="!valid || !isPasswordMatch()"
          v-if="isSignup"
          color="primary"
          @click="onSubmit"
        >Signup</v-btn>
        <v-btn :disabled="!valid" v-else color="primary" @click="onSubmit()">Login</v-btn>
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
  </div>
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
      emailRules: [
        v => !!v || "The email field is required.",
        v => /.+@.+/.test(v) || "Please enter a valid email."
      ],
      name: "",
      nameRules: [v => !!v || "The name field is required"],
      password: "",
      passwordRules: [
        v => !!v || "The password field is required",
        v => v.length >= 6 || "Password must be more than 6 characters"
      ],
      username: "",
      usernameRules: [v => !!v || "The username field is required"],
      loginPasswordRule: [v => !!v || "The password field is required"],
      secondPassword: "",
      terms: false,
      error: false,
      showProgress: false
    };
  },
  beforeCreate: function() {
    if (this.$store.state.loggedIn) {
      this.$router.push("/dashboard");
    }
  },
  methods: {
    async onSubmit() {
      this.showProgress = true;
      if (this.isSignup) {
        this.signUp();
      } else {
        this.signIn();
      }
    },
    switchForm(input) {
      this.isSignup = input;
    },
    isPasswordMatch() {
      return this.password === this.secondPassword;
    },
    async signUp() {
      try {
        const response = await this.$http.post(
          "http://localhost:8081/users",
          {
            email: this.email,
            name: this.name,
            username: this.username,
            password: this.password
          },
          { withCredentials: true }
        );
        if (response.status === 200) {
          this.signIn();
        } else {
          throw Error;
        }
      } catch (error) {
        this.error = true;
        this.showProgress = false;
        console.log("Error signing up");
      }
    },
    async signIn() {
      try {
        const response = await this.$http.put(
          "http://localhost:8081/users",
          { email: this.email, password: this.password },
          { withCredentials: true }
        );
        if (response.status === 200) {
          await this.$store.dispatch("setLoginData", {
            name: response.data.name,
            username: response.data.username
          });
          this.error = false;
          setTimeout(() => this.$router.push("/dashboard"), 500);
        } else {
          throw Error;
        }
      } catch (error) {
        this.error = true;
        this.showProgress = false;
        console.log("Error logging in");
      }
    }
  }
};
</script>

<style>
.button-padding-15 {
  padding-bottom: 15px;
}

.terms {
  color: #1565c0;
  text-decoration: underline;
  cursor: pointer;
}

.card-spacing {
  margin-top: 20px;
}
</style>