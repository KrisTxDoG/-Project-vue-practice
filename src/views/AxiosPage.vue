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
  // import axios from 'axios';
  import axiosInstance from '@/axios.js';
  import { jwtDecode } from 'jwt-decode'; // 使用命名導出
  
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

        const token = localStorage.getItem('token');
        if (token) {
          if (token.split('.').length === 3) { // 檢查 token 是否由三部分組成
            try {
              const decodedToken = jwtDecode(token); // 使用命名導出
              console.log('Decoded Token:', decodedToken);
            } catch (error) {
              console.error('Error decoding token:', error);
            }
          } else {
            console.error('Invalid token format: ', token);
          }
        } else {
          console.log('No token found in localStorage.');
        }
    },

    methods: {
      async fetchData(id) {
        try {
          const response = await axiosInstance.get(`https://localhost:7243/api/Home/${id}`);
          this.data = response.data;
        } catch (error) {
          console.error(error);
        }
      },

      async getItems() {
        try {
          const response = await axiosInstance.get('https://localhost:7243/api/Items');
          this.items = response.data;
        } catch (error) {
          console.error('Error fetching items:', error);
        }
      }
    },
  };
  </script>
  