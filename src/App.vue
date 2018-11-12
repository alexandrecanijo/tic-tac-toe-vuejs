<template>
  <div id="app">
    <grid></grid>
  </div>
</template>

<script>
import Grid from "./components/Grid.vue";

export default {
  name: "app",
  components: {
    Grid
  }
};
</script>

<style lang="scss">
@import "styles/index";
@import "styles/base-theme/index";
</style>
