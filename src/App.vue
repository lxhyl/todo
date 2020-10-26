<template>
  <div id="app">
    <transition name="animation">
      <router-view />
    </transition>
    <Tabbar />
  </div>
</template>

<script>
import Tabbar from "./views/tabbar";
export default {
  name: "App",
  components: {
    Tabbar,
  },
  data() {
    return {
     
    };
  },
  created() {
     console.log(this.$store)
  },
};
</script>
<style scoped>
.animation-leave-active {
  position: fixed;
  animation: moveLeave 0.3s linear;
}
@keyframes moveLeave {
  0% {
    width: 100%;

    top: 0;
  }
  25% {
    left: 25%;
    width: 100%;
  }
  50% {
    left: 50%;
    width: 100%;
  }
  75% {
    width: 100%;
    left: 75%;
  }
  100% {
    left: 100%;
    width: 100%;
  }
}
.animation-enter-active {
  position: fixed;
  animation: moveIn 0.3s linear;
}
@keyframes moveIn {
  0% {
    left: -100%;
    width: 100%;
  }
  25% {
    left: -75%;
    width: 100%;
  }
  50% {
    left: -50%;
    width: 100%;
  }
  75% {
    left: -25%;
    width: 100%;
  }
  100% {
    width: 100%;
    left: 0;
  }
}
</style>