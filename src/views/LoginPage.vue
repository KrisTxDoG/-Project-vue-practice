<template>

  <h1 class="mt-5">帳號登入平台</h1>
    <div class="register-form">
      <h2>登入</h2>
      <form class="form-group" @submit.prevent="register">
        <div>
          <label for="email">電子郵件</label>
          <input type="email" id="email" v-model="email" class="form-control" required />
        </div>

        <div>
          <label for="password">密碼</label>
          <input type="password" id="password" v-model="password" class="form-control" require/>
        </div>
        <div>
          <label for="confirmPassword">確認密碼:</label>
          <input type="password" id="confirmPassword" class="form-control" v-model="confirmPassword">
          <br>
          <button type="submit" class="btn btn-success">註冊</button>
        </div>
      </form>
      <p v-if="error" class="error">{{ error }}</p>
    </div>
  </template>
  
  <script>
  import axios from 'axios';

  export default {

    data() {
      return {
        email: '',
        password: '',
        confirmPassword: '',
        error: null
      }
    },

    methods: {
      async register() {
        if(this.password !== this.confirmPassword) {
          this.error = '密碼和確認密碼不匹配';
          return;
        }

        try {
          await axios.post('https://localhost:7243/register', {
            email: this.email,
            password: this.password
          });

          this.$router.push('/');
        } catch(err) {
            if (err.response && err.response.data && err.response.data.errors) {
            // 提取錯誤訊息
            this.error = Object.values(err.response.data.errors).flat().join(' ');
          } else {
            // 處理其他錯誤情況
            this.error = '註冊失敗，請重試。';
          }
        }
      }
    }
  };
  </script>
  
  <style>
  /* Your styles here */
  </style>
  