<template>
    <div>
      <h1>Home Page</h1>
      <router-link to="/HomePage">Go to About Page</router-link>
    </div>
  </template>
  
  <script>
  export default {
    name: 'AboutPage',
    
    created() {
      console.log('AboutPage created');
    }
  }
  </script>
  
  <style>
  /* Your styles here */
  </style>
  