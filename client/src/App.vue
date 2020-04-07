<template>
  <AppBar />
</template>

<script>
import AppBar from "@/components/AppBar";
import Signin from "@/views/Signin";
import Dashboard from "@/views/Dashboard";

export default {
  name: "App",

  components: {
    AppBar,
    Signin,
    Dashboard
  }
};
</script>