<template>
 <div class="login-container">
    <h1>登入</h1>
    <form @submit.prevent="login">
      <div>
        <label for="email">電子郵件:</label>
        <input
          type="email"
          id="email"
          v-model="email"
          required
        />
      </div>
      <div>
        <label for="password">密碼:</label>
        <input
          type="password"
          id="password"
          v-model="password"
          required
        />
      </div>
      <button type="submit">登入</button>
      <div v-if="errorMessage" class="error">{{ errorMessage }}</div>
    </form>
  </div>
</template>

<script>
import axios from 'axios';
import { ref} from 'vue';


export default {
    name: 'LoginPage',
    setup() {
        const email = ref('');
        const password = ref('');
        const errorMessage = ref('');
        const userName = ref('');

        const login = async () => {
            try {
                const response =  await axios.post('https://localhost:7243/login', {
                    email: email.value,
                    password: password.value,
                });

                // 假設 API 返回一個 JWT token 和 userName
                const { token, userName: returnedUserName } = response.data;

                // 儲存 token 到 localStorage 或其他地方
                localStorage.setItem('token', token);

                // 儲存 userName 到vue當中
                localStorage.setItem('userName', returnedUserName);

                // 轉到主頁或其他受保護網頁
                window.location.href = '/';
            } catch (error) {
                if(error.response && error.response.status === 400) {
                    // 錯誤處理回應
                    errorMessage.value = '登入失敗' + (error.response.data.errorMessage);
                } else {
                    errorMessage.value = '系統錯誤, 請稍後再試';
                }
            }
        };

        return {
            email,
            password,
            errorMessage,
            userName,
            login,
        }
    }
}
</script>

<style scoped>
.login-container {
  max-width: 400px;
  margin: auto;
  padding: 1em;
  border: 1px solid #ccc;
  border-radius: 4px;
}

form {
  display: flex;
  flex-direction: column;
}

div {
  margin-bottom: 1em;
}

label {
  margin-bottom: .5em;
  color: #333333;
  display: block;
}

input {
  border: 1px solid #CCCCCC;
  padding: 8px;
  font-size: 1em;
  width: 100%;
}

button {
  padding: 10px;
  font-size: 1em;
  border: none;
  background-color: #4CAF50;
  color: white;
  cursor: pointer;
}

button:hover {
  background-color: #45a049;
}

.error {
  color: red;
  margin-top: 1em;
}
</style>