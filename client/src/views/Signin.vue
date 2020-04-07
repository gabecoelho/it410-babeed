<template>
  <LoginForm />
</template>

<script>
import LoginForm from "@/components/LoginForm";
import store from "@/store/index.js";

export default {
  name: "Signin",
  components: {
    LoginForm
  }
};
</script>
