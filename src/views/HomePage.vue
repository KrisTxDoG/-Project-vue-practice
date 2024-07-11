<template>
    <div>
      <h1 class="homeStyle">Home Page</h1>
      <router-link to="/AboutPage">Go to About Page</router-link>
    </div>
  </template>
  
  <script>
  export default {
    name: 'HomePage',
    // 在这里你可以使用 router 对象，例如监听路由事件等
    created() {
      console.log('HomePage created');
    }
  }
  </script>
  
  <style>
  /* Your styles here */

  .homeStyle {
    background-color: green;
    color: white;
  }

  </style>
  