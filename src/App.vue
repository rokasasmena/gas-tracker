<template>
  <div id="app">
    <GasTracker />
  </div>
</template>

<script>
import GasTracker from './components/GasTracker.vue';

export default {
  components: {
    GasTracker,
  },
};
</script>

<style scoped>
#app {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
}
</style>