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
#app {
  font-family: Arial, Tahoma, Verdana, sans-serif;
  font-size: 14px;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #000;
  margin: 0;
  padding: 0;
  border: 0;
}
</style>
