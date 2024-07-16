<template>
    <div>
      <div id="map" style="position: fixed; top: 0; left: 0; width: 100%; height: 100%;"></div>
      
      <!-- <div class="container">
        <div class="row">
          <div class="col-6">
            <button class="map-button btn btn-danger" @click="addTileLayer">新增圖層</button>
          </div>
          <div class="col-6">
            <button class="map-button-1 btn btn-danger" @click="addAtmosphereTileLayer">新增氣象局圖層</button>
          </div>
        </div>
      </div> -->

      <button class="map-button btn btn-danger" @click="addTileLayer">新增圖層</button>
      
      <button class="map-button-1 btn btn-danger" @click="recoverTileLayer">復原圖層</button>
    </div>
  </template>
  
  <script>
  import { onMounted, ref } from 'vue';
  import L from 'leaflet';
  import 'leaflet/dist/leaflet.css';
  
  export default {
    name: 'MapComponentPage',
    setup() {
      const map = ref(null);
      let tileLayer = null; // 定義圖塊圖層變數
  
      onMounted(() => {
        // 初始化地圖
        map.value = L.map('map').setView([24.91, 121.673], 13); // 注意：緯度在前，經度在後
  
        // 設置地圖圖塊圖層
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          maxZoom: 19,
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map.value);
  
        // 添加一個標記
        L.marker([24.91, 121.673]).addTo(map.value)
          .bindPopup('A pretty CSS3 popup.<br> Easily customizable.')
          .openPopup();
      });
  
      // 新增圖塊圖層方法
      const addTileLayer = () => {
        if (tileLayer) {
          map.value.removeLayer(tileLayer); // 如果圖塊圖層已存在，先移除
        }
  
        // 使用國土測繪中心地圖服務
        tileLayer = L.tileLayer('https://wmts.nlsc.gov.tw/wmts/PHOTO2/default/GoogleMapsCompatible/{z}/{y}/{x}', {
          attribution: '國土測繪中心',
          maxZoom: 18,
        }).addTo(map.value);
      };
  
      // 新增氣象局雷達回波地圖
      const addAtmosphereTileLayer = () => {
        if (tileLayer) {
          map.value.removeLayer(tileLayer);
        }
  
        // 使用中央氣象局雷達回波地圖服務
        tileLayer = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}', {
          attribution: 'Tiles &copy; Esri &mdash; Source: Esri',
          maxZoom: 16,
        }).addTo(map.value);
      }

  
      return {
        addTileLayer,
        addAtmosphereTileLayer,
      };
    }
  };
  </script>
  
  <style>
  #map {
    width: 100%;
    height: 100%;
  }
  
  .map-button {
    position: absolute;
    top: 20px;
    left: 60px;
    z-index: 1000;
  }
  
  .map-button-1 {
    position: absolute;
    top: 20px;
    left: 200px;
    z-index: 999;
  }
  </style>
  