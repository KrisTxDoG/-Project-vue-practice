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

      <div class="container mt-3">
        <div class="row">
            <div>
                <input
                    type="text"
                    class="form-control"
                    v-model="searchQuery"
                    placeholder="輸入姓名搜尋"
                    @input="getItem(currentPage)"
                >
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
                    <button class="btn btn-danger" @click="deleteItem(item.id)">Delete</button>
                </td>
            </tr>
        </tbody>
      </table>

      <div class="pagination d-flex justify-content-center">
            <button class="btn btn-primary"
                :disabled="currentPage === 1" 
                @click="changePage(currentPage - 1)">
                Previous
            </button>

            <span>Page {{ currentPage }} of {{ Math.ceil(totalItems / pageSize) }}</span>

            <button class="btn btn-primary"
                :disabled="currentPage === Math.ceil(totalItems / pageSize)" 
                @click="changePage(currentPage + 1)">
                Next
            </button>
        </div>
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

            currentPage: 1, // 當前頁碼
            pageSize: 10,   // 每頁顯示的項目數
            totalItems: 0,   // 總項目數
            searchQuery:'',

            // 新增表單資料放在這邊
            currentItem: {
                id: null,
                name: '',
                phone: ''
            }
        }
    },

    mounted() {
        this.getItem(this.currentPage);
    },

    methods: {
    
        // 取得所有資料列表
        async getItem(page) {
            try {
                const response = await axiosInstance.get("https://localhost:7243/api/Backstage", {
                    params: {
                        page: page,
                        pageSize: this.pageSize,
                        search: this.searchQuery // 傳遞 searchQuery參數
                    }
                });
                this.items = response.data.items;
                this.totalItems = response.data.totalItems;
                console.log(this.items)
            } catch (error) {
                console.log("Error fetching items", error);
            }
        },

        // 改變頁數的時候
        changePage(page) {
            this.currentPage = page;
            this.getItem(this.currentPage);
        },

        // 處理表單提交
        async handleSubmit() {
            try{

                // 若表單當中 id 為 null 的時候需要刪除 currentIem.id 讓後端自動生成
                if (this.currentItem.id === null || this.currentItem.id === undefined) {
                    // 確保 id 為 null 或不包含在請求中
                    delete this.currentItem.id;
                }

                if(this.currentItem.id) {
                    await this.updateItem();
                } else {
                    await this.createItem();
                }
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

        // 修改資料開啟
        editItem(item) {
            this.currentItem = { ...item };
            this.showModel('Edit item');
        },

        // 更新後端資料
        async updateItem() {
            try {
                await axiosInstance.put("https://localhost:7243/api/Backstage/UpdateItem", this.currentItem);
            } catch (error) {
                console.error('Error updateing item', error);
            }
        },

        // 刪除後端資料
        async deleteItem(id) {
            try {
                await axiosInstance.delete(`https://localhost:7243/api/Backstage/DeleteItem/${id}`);
                this.getItem(); // 刪除後更新表單
            } catch(error) {
                console.log('Error deleting item', error);
            }
        },
        
        // 重製表單
        resetForm() {
            this.currentItem = {
                id: null,
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
                        <input id="name" type="text" class="swal2-input"  value="${this.currentItem.name || ''}"/>
                    </div>
                    <div>
                        <label for="phone">Phone:</label>
                        <input id="phone" type="phone" class="swal2-input"  value="${this.currentItem.phone || ''}"/>
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
  