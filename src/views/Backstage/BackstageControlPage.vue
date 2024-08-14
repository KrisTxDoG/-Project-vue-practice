<template>
    <div>
      <h1>後臺管理系統</h1>

      <div class="container">
        <div class="row">
            <div class="col-10"></div>
            <div class="col-2">
                <button class="btn btn-success col-" @click="openCreateModal">新增表單</button>
            </div>
        </div>
      </div>

      <table class="table">
        <thead>
            <tr>
                <th scope="col">ID</th>
                <th scope="col">Name</th>
                <th scope="col">Phone</th>
                <th scope="col">Action</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="item in items" :key="item.id">
                <td>{{ item.id }}</td>
                <td>{{ item.name }}</td>
                <td>{{ item.phone }}</td>
                <td>
                    <button class="btn btn-primary me-2" @click="editItem(item)">Edit</button>
                    <button class="btn btn-danger" @click="deleteItem(item,id)">Delete</button>
                </td>
            </tr>
        </tbody>
      </table>
    </div>
  </template>
  
  <script>
  import axiosInstance from '@/axios.js';
  import Swal from 'sweetalert2';

  export default {
    name: 'BackstageControl',

    data() {
        return {
            items: [], // 負責存放後端獲取的資料
            currentItem: {
                name: '',
                phone: ''
            }
        }
    },

    mounted() {
        this.getItem();
    },

    methods: {
    
        // 取得所有資料列表
        async getItem() {
            try {
                const response = await axiosInstance.get("https://localhost:7243/api/Backstage");
                this.items = response.data;
                console.log(this.items)
            } catch (error) {
                console.log("Error fetching items", error);
            }
        },

        // 處理表單提交
        async handleSubmit() {
            try{
                await this.createItem();
                this.getItem(); // 更新清單
                Swal.close();   // 關閉彈跳視窗
            } catch (error){
                console.error('Error handling from submit:', error );
            }
        },

        // 新增進入後端
        async createItem() {
            try{
                console.log(this.currentItem)
                await axiosInstance.post("https://localhost:7243/api/Backstage/CreateItem", this.currentItem);
            } catch(error) {
                console.error('Error creating item', error);
            }
        },

        // 開啟創建表單
        openCreateModal() {
            this.resetForm();
            this.showModel('Create New Item');
        },
        
        // 重製表單
        resetForm() {
            this.currentItem = {
                name: '',
                phone: ''
            }
        },

        // 打開表單內容
        showModel(title) {
            Swal.fire({
                title,
                html: `
                    <div>
                        <label for="name">Name:</label>
                        <input id="name" type="text" class="swal2-input" v-model="currentItem.name" />
                    </div>
                    <div>
                        <label for="phone">Phone:</label>
                        <input id="phone" type="phone" class="swal2-input" v-model="currentItem.price" />
                    </div>
                `,
                focusConfirm: false,
                preConfirm: () => {
                    this.currentItem.name = document.getElementById('name').value;
                    this.currentItem.phone = document.getElementById('phone').value;
                    this.handleSubmit();
                }
            })
        }


    },
    // 創建表單
    created() {
      console.log('ContactPage created');
    }
  }
  </script>
  
  <style>
  /* Your styles here */
  </style>
  