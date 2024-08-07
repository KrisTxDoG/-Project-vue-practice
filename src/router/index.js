import { createRouter, createWebHistory } from 'vue-router';

// 引入您的新頁面組件
import HomePage from '../views/HomePage.vue';
import AboutPage from '../views/AboutPage.vue';
import ContactPage from '../views/ContactPage.vue';
import MapComponentPage from '@/views/MapComponentPage.vue';
import AxiosPage from '@/views/AxiosPage.vue';
import RegisterPage from '@/views/Account/RegisterPage.vue';
import LoginPage from '@/views/Account/LoginPage.vue';
import FileUploadPage from '@/views/FileUploadPage.vue';

const routes = [
  {
    path: '/',
    name: 'HomePage',
    component: HomePage
  },
  {
    path: '/about',
    name: 'AboutPage',
    component: AboutPage
  },
  {
    path: '/contact',
    name: 'ContactPage',
    component: ContactPage
  },
  {
    path: '/mapComponent',
    name: 'MapComponentPage',
    component: MapComponentPage
  },
  {
    path: '/axios',
    name: 'AxiosPage',
    component: AxiosPage
  },
  {
    path: '/Account/Register',
    name:'RegisterPage',
    component: RegisterPage
  }, 
  {
    path: '/Account/Login',
    name: 'LoginPage',
    component: LoginPage
  },
  {
    path: '/FileUpload',
    name: 'FileUploadPage',
    component: FileUploadPage
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;