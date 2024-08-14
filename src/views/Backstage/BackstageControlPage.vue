<template>
    <div>
      <h1>後臺管理系統</h1>
      <table class="table">
        <thead>
            <tr>
                <th scope="col">ID</th>
                <th scope="col">Name</th>
                <th scope="col">Phone</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="item in items" :key="item.id">
                <td>{{ item.id }}</td>
                <td>{{ item.name }}</td>
                <td>{{ item.phone }}</td>
            </tr>
        </tbody>
      </table>
    </div>
  </template>
  
  <script>
  import axiosInstance from '@/axios.js';
  export default {
    name: 'BackstageControl',

    data() {
        return {
            items: [], // 負責存放後端獲取的資料
        }
    },

    mounted() {
        this.getItem();
    },

    methods: {
    
        async getItem() {
            try {
                const response = await axiosInstance.get("https://localhost:7243/api/Backstage");
                this.items = response.data;
                console.log(this.items)
            } catch (error) {
                console.log("Error fetching items", error);
            }
        }
    },

    created() {
      console.log('ContactPage created');
    }
  }
  </script>
  
  <style>
  /* Your styles here */
  </style>
  