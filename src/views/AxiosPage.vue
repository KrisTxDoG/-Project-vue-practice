<template>
    <div>
      <h1 class="text-black">請輸入 ID</h1>
      <input class="input-group" v-model="id" placeholder="Enter ID" />
      <br>
      <button class="btn btn-danger" @click="fetchData(id)">Fetch Data</button>
      <br>
      <p class="text-danger">{{ data }}</p>
    </div>

    <br><br><br>
    <div>
    <h2>Items</h2>
    <ul>
      <li v-for="item in items" :key="item.id">
        {{ item.name }} - {{ item.phone }}
      </li>
    </ul>
  </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    name: "AxiosPage",
    data() {
      return {
        id: '', // 用來接收輸入的 ID
        data: null,
        items: null,
      };
    },

    mounted() {
        this.getItems();
    },

    methods: {
      async fetchData(id) {
        try {
          const response = await axios.get(`https://localhost:7243/api/Home/${id}`);
          this.data = response.data;
        } catch (error) {
          console.error(error);
        }
      },

      async getItems() {
      try {
        const response = await axios.get('https://localhost:7243/api/Items');
        this.items = response.data;
      } catch (error) {
        console.error('Error fetching items:', error);
      }
    }
    },
  };
  </script>
  