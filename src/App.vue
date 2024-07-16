<template>
  <div id="app">
    <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
    <!-- <router-link to="/">Home</router-link>
    <router-link to="/AboutPage">About</router-link>
    <router-link to="/contact">Contact</router-link>
    <HelloWorld msg="Welcome to Your Vue.js App"/> -->
    <router-view></router-view>
  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
import { useRouter } from 'vue-router';

export default {
  name: 'App',
  components: {
    // HelloWorld
    
  },
  mounted() {
    const router = useRouter();
    router.push('/');
    
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /* margin-top: 60px; */
}
</style>
