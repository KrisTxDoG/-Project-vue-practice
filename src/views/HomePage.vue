<template>
      <nav class="navbar navbar-expand-lg navbar-light">
        <div class="container-fluid">
          <img src="image/Hope-removebg-preview.png">
          <a class="navbar-brand fs-1" href="#">The Hope</a>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse ms-auto" id="navbarSupportedContent">
            <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
              <li class="nav-item">
                <a class="nav-link active" aria-current="page" href="#">Home</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#">Link</a>
              </li>
              <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Dropdown
                </a>
                <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                  <li><a class="dropdown-item" href="#">Action</a></li>
                  <li><a class="dropdown-item" href="#">Another action</a></li>
                  <li><hr class="dropdown-divider"></li>
                  <li><a class="dropdown-item" href="#">Something else here</a></li>
                </ul>
              </li>
              <li class="nav-item">
                <a class="nav-link disabled" href="#" tabindex="-1" aria-disabled="true">Disabled</a>
              </li>
            </ul>
            <form class="d-flex">
              <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
              <button class="btn btn-outline-success" type="submit">Search</button>
            </form>
          </div>
        </div>
      </nav>
    <div>
      <div class="m-5 text-center align-middle">
        <div  id="carouselExampleControls" class="carousel slide w-25 mx-auto" data-bs-ride="carousel">
          <div class="carousel-inner align-middle">
            <div class="carousel-item active">
              <img :class="img-fluid" src="image/哨所-1.jpg" class="d-block img-fluid w-100" alt="...">
            </div>
            <div class="carousel-item">
              <img src="image/哨所-2.jpg" class="d-block img-fluid w-100" alt="...">
            </div>
            <div class="carousel-item">
              <img src="image/哨所-3.jpg" class="d-block img-fluid w-100" alt="...">
            </div>
          </div>
          <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Previous</span>
          </button>
          <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Next</span>
          </button>
        </div>
      </div>
    </div>

    <div>
      <button class="btn btn-primary" v-if="isLoggedIn" @click="logout">Logout</button>
      <p v-if="isLoggedIn">{{ user.name }}</p>
    </div>

    <div class="container">
      <div class="row">
        <div class="col-5 mt-5">
          <i class="bi bi-geo-alt-fill"></i>
          <router-link class="fs-1 text-black text-decoration-none" to="/mapComponent">進入台灣地圖</router-link>
          <br>
          <router-link class="fs-1 text-black text-decoration-none" to="/axios">進入 axios 呼叫</router-link>
          <br>
          <router-link class="fs-1 text-black text-decoration-none" to="/Account/Register">註冊帳號</router-link>
          <br>
          <router-link class="fs-1 text-black text-decoration-none" to="/Account/Login">登入頁面</router-link>
        </div>
        <div class="col-6">
          <img src="image/山林瀑布.jpg" alt="">
        </div>
      </div>
    </div>
    
    <div class="user-dropdown-x">
      <button @click="toggleDropdown" class="dropdown-toggle-x">
        {{ user.name }}
      </button>
      <div v-if="dropdownVisible" class="dropdown-menu-x">
        <router-link to="/Account/Register" class="dropdown-item-x">Profile</router-link>
        <router-link to="/Account/Login" class="dropdown-item-x">Settings</router-link>
        <button @click="logout" class="dropdown-item-x">Logout</button>
        <h1>Hello</h1>
      </div>
    </div>


    <br><br><br><br><br><br><br><br><br><br><br>

    <div class="input-group">
      <input class="form-control" type="file" @change="handleFileChange" />
      <button class="btn btn-primary" @click="uploadImage">Upload</button>
    </div>
    {{ uploadedFileName }}

    <br><br><br><br><br><br><br><br><br><br><br>


    <div>
      <button @click="downloadFile">Download</button>
    </div>
  </template>
  
  <script>

import axiosInstance from '@/axios.js';

  export default {

    
    data() {
      return {
        isLoggedIn: !!localStorage.getItem('token'),

        user: {
          name: localStorage.getItem('userName')
        },

        dropdownVisible: true,
        selectedFile: null,
        uploadedFileName: ''
      };
    },
    methods: {
      logout() {
        localStorage.removeItem('token');
        localStorage.removeItem('userName');
        this.isLoggedIn = false;
        this.$router.push('/');
      },

      toggleDropdown() {
        this.dropdownVisible = !this.dropdownVisible;
      },
      
      handleFileChange(event) {
        this.selectedFile = event.target.files[0];
      },

      async uploadImage() {
        if(!this.selectedFile) {
          alert("請選擇檔案!");
          return;
        }

        const formData = new FormData();
        formData.append('file', this.selectedFile);

        try{
          const response =  await axiosInstance.post('https://localhost:7243/api/Upload', formData, {
            headers: {
              'Context-type': 'multipart/form-data',
            },
          });
          this.uploadedFileName = response.data.filePath.split('\\').pop();
          alert("上傳檔案成功~");
        } catch(error) {
          console.error('Error uploading file', error);
          alert('檔案上傳失敗');
        }
      },

      // 下載呼叫按鈕
      async downloadFile() {
        if(!this.uploadedFileName) {
          alert('沒有找到相關的檔案名稱')
          return;
        }

        try{
          const response = await axiosInstance.get(`https://localhost:7243/api/Upload/download/${this.uploadedFileName}`, {
            responseType: 'blob'
          });
          const url = window.URL.createObjectURL(new Blob([response.data]));
          const link = document.createElement('a');
          link.href = url;
          link.setAttribute('download', this.uploadedFileName);
          document.body.appendChild(link);
          link.click();
        }catch(error) {
          console.error('出現錯誤', error);
          alert('下載檔案失敗');
        }
      }
    },

    name: 'HomePage',
    // 監聽路由路徑
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

  .user-dropdown-x {
    position: relative;
    display: inline-block;
  }

  .dropdown-toggle-x {
    background-color: #007bff;
    color: white;
    padding: 10px;
    border: none;
    cursor: pointer;
  }

  .dropdown-menu-x {
    display: block;
    position: absolute;
    background-color: white;
    box-sizing: 0 8px 16px rgba(0, 0, 0, 0.1);
    z-index: 1;
  }

  .dropdown-item-x {
    padding: 10px;
    cursor: pointer;
    display: block;
  }

  .dropdown-item-x:hover {
    background-color: #f1f1f1;
  }

  </style>
  