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

      <button class="map-button btn btn-danger" @click="addTileLayer">新增國土圖層</button>
      
      <button class="map-button-1 btn btn-danger" @click="addAtmosphereTileLayer">新增氣象圖層</button>
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
    const currentTileLayer = ref(null); // 跟蹤當前的圖塊圖層

    onMounted(() => {
      initMap();
    });

    const initMap = () => {
      // 初始化地圖
      map.value = L.map('map').setView([24.91, 121.673], 13);

      // 設置默認的地圖圖塊圖層
      const defaultTileLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(map.value);

      // 添加一個標記
      // L.marker([24.91, 121.673]).addTo(map.value)
      //   .bindPopup('A pretty CSS3 popup.<br> Easily customizable.')
      //   .openPopup();

      // 將默認圖塊圖層設置為當前圖塊圖層
      currentTileLayer.value = defaultTileLayer;
    };

    const addTileLayer = () => {
      if (map.value && currentTileLayer.value) {
        map.value.removeLayer(currentTileLayer.value); // 移除當前圖塊圖層
      }

         // 地圖在準備好之後才進行縮放
         if (map.value) {
          map.value.whenReady(() => {
          map.value.setView([24.91, 121.673], 13);
        });
      } else {
        map.value.setView([24.91, 121.673], 13);
      }

      // 使用國土測繪中心地圖服務
      const tileLayer1 = L.tileLayer('https://wmts.nlsc.gov.tw/wmts/PHOTO2/default/GoogleMapsCompatible/{z}/{y}/{x}', {
        attribution: '國土測繪中心',
        maxZoom: 19,
      }).addTo(map.value);

      // 更新當前圖塊圖層
      // currentTileLayer.value = tileLayer1;

       // 地圖在準備好之後才進行縮放
       if (map.value) {
        map.value.whenReady(() => {
          map.value.setView([24.91, 121.673], 13);
          currentTileLayer.value = tileLayer1;
        });
      } else {
        map.value.setView([24.91, 121.673], 13);
      }
    };

    const addAtmosphereTileLayer = () => {
      if (map.value && currentTileLayer.value) {
        map.value.removeLayer(currentTileLayer.value); // 移除當前圖塊圖層
      }

         // 地圖在準備好之後才進行縮放
         if (map.value) {
        map.value.whenReady(() => {
          map.value.setView([24.91, 121.673], 13);
        });
      } else {
        map.value.setView([24.91, 121.673], 13);
      }

      // 使用中央氣象局雷達回波地圖服務
      const tileLayer2 = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}', {
        attribution: 'Tiles &copy; Esri &mdash; Source: Esri',
        maxZoom: 19,
      }).addTo(map.value);

      // 更新當前圖塊圖層
      // currentTileLayer.value = tileLayer2;

       // 地圖在準備好之後才進行縮放
       if (map.value) {
        map.value.whenReady(() => {
          map.value.setView([24.91, 121.673], 13);
          currentTileLayer.value = tileLayer2;
        });
      } else {
        map.value.setView([24.91, 121.673], 13);
      }
    };

    return {
      initMap,
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
  