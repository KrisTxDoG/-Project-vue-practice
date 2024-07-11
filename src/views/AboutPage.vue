<template>
    <div>
      <h1>Home Page</h1>
      <router-link to="/about">Go to About Page</router-link>
    </div>
  </template>
  
  <script>
  export default {
    name: 'AboutPage',
    // 在这里你可以使用 router 对象，例如监听路由事件等
    created() {
      console.log('AboutPage created');
    }
  }
  </script>
  
  <style>
  /* Your styles here */
  </style>
  