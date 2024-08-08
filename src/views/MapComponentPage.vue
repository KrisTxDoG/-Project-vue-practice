<template>
  <div>
    <div id="map" style="position: fixed; top: 0; left: 0; width: 100%; height: 100%;"></div>
    
    <button class="map-button btn btn-danger" @click="addTileLayer">新增國土圖層</button>
    
    <button class="map-button-1 btn btn-danger" @click="addAtmosphereTileLayer">新增氣象圖層</button>

    <!-- 側邊攔位 HTML 區域 -->
    <div id="sidebar" class="leaflet-sidebar collapsed">
      <div class="leaflet-sidebar-tabs">
        <ul role="tablist">
          <li><a href="#home" role="tab"><i class="fa fa-home"></i></a></li>
        </ul>
      </div>
      <div class="leaflet-sidebar-content">
        <div class="leaflet-sidebar-pane" id="home">
          <h2 class="leaflet-sidebar-header">
            圖層
            <div class="leaflet-sidebar-close" title="關閉側邊欄位"><i class="bi bi-x-circle"></i></div>
          </h2>
          <div class="content-box mt-2">
            <div class="accordion" id="accordionLayer">
              <div class="accordion-item">
                <h2 class="accordion-header" id="LayerOneButton">
                  <button class="accordion-button" type="button" data-bs-toggle="collapse"
                          data-bs-target="#LayerOne" aria-expanded="true" aria-controls="LayerOne">
                    底圖
                  </button>
                </h2>
                <div id="LayerOne" class="accordion-collapse collapse show" aria-labelledby="LayerOneButton">
                  <div class="accordion-body">
                    <div class="form-check">
                      <input class="form-check-input" type="radio" name="Krist" :id="'Krist-1'" :value="'Krist-1'">
                      <label class="form-check-label" :for="'Krist-1'">Krist Test 1</label>
                    </div>
                    <div class="form-check">
                      <input class="form-check-input" type="radio" name="Krist" :id="'Krist-2'" :value="'Krist-2'">
                      <label class="form-check-label" :for="'Krist-2'">Krist Test 2</label>
                    </div>
                    <div class="form-check">
                      <input class="form-check-input" type="radio" name="Krist" :id="'Krist-3'" :value="'Krist-3'">
                      <label class="form-check-label" :for="'Krist-3'">Krist Test 3</label>
                    </div>
                      <div class="form-check">
                      <input class="form-check-input" type="radio" name="Krist" :id="'Krist-4'" :value="'Krist-4'">
                      <label class="form-check-label" :for="'Krist-4'">Krist Test 4</label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="content-box mt-2">
            <div class="accordion" id="accordionLayer">
              <div class="accordion-item">
                <h2 class="accordion-header" id="LayerTwoButton">
                  <button class="accordion-button" type="button" data-bs-toggle="collapse"
                          data-bs-target="#LayerTwo" aria-expanded="true" aria-controls="LayerTwo">
                    加入圖層
                  </button>
                </h2>
                <div id="LayerTwo" class="accordion-collapse collapse show" aria-labelledby="LayerTwoButton">
                  <div class="accordion-body">
                    <div class="form-check">
                      <input class="form-check-input" type="radio" name="MapController" :id="'Krist-1'" :value="'Krist-1'" @click="addInitMap">
                      <label class="form-check-label" :for="'Krist-1'">原始地圖</label>
                    </div>
                    <div class="form-check">
                      <input class="form-check-input" type="radio" name="MapController" :id="'Krist-1'" :value="'Krist-1'" @click="addTileLayer">
                      <label class="form-check-label" :for="'Krist-1'">衛星雲圖</label>
                    </div>
                    <div class="form-check">
                      <input class="form-check-input" type="radio" name="MapController" :id="'Krist-2'" :value="'Krist-2'" @click="addAtmosphereTileLayer">
                      <label class="form-check-label" :for="'Krist-2'">經建版地圖</label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

<!-- 
          <button class="map-button btn btn-danger" @click="addTileLayer">新增國土圖層</button>
    
          <button class="map-button-1 btn btn-danger" @click="addAtmosphereTileLayer">新增氣象圖層</button> -->

        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted, ref } from 'vue';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-sidebar-v2/css/leaflet-sidebar.css';
import 'leaflet-sidebar-v2';
import 'leaflet-draw';
import 'leaflet-draw/dist/leaflet.draw.css';
import 'leaflet-geometryutil'; 

export default {
  name: 'MapComponentPage',
  setup() {
    const map = ref(null);
    const currentTileLayer = ref(null);

    // 加入初始繪圖
    const drawItems = ref(new L.FeatureGroup());

    onMounted(() => {
      initMap();
      // setupDrawEvents();
    });

    // 初始化地圖
    const initMap = () => {
      map.value = L.map('map').setView([24.91, 121.673], 13);

      const defaultTileLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(map.value);

      currentTileLayer.value = defaultTileLayer;

      // 初始化繪圖控制器
      drawItems.value = new L.FeatureGroup();
      map.value.addLayer(drawItems.value);

      const drawControl = new L.Control.Draw({
        edit: {
          featureGroup: drawItems.value
        },
        draw: {
          polygon: {
            allowIntersection: false,
            showArea: true
          },
          polyline: true,
          circle: false,
          rectangle: true,
          marker: true,
        }
      });
      map.value.addControl(drawControl);

      // 添加初始標記
      const initialMarker = L.marker([24.91, 121.673]).addTo(map.value)
        .bindPopup('初始標記')
        .openPopup()
      drawItems.value.addLayer(initialMarker);

       // 處理繪製完成的事件
      //  map.value.on(L.Draw.Event.CREATED, function (event) {
      //   const layer = event.layer;
      //   drawItems.value.addLayer(layer);


      //   console.log(drawItems.value)
      //   // Debugging logs
      //   console.log('Layer Type:', event.layerType);
      //   console.log('Layer LatLngs:', layer.getLatLngs());

      //   // 計算測量結果
      //   if (event.layerType === 'polyline') {
      //     const latLngs = layer.getLatLngs();
      //     if(latLngs.length > 0) {
      //       const length = L.GeometryUtil.length(layer);
      //       alert("Length: " + length + " meters");
      //     }
      //   } else if (event.layerType === 'polygon' || event.layerType === 'rectangle') {
      //     const latlngs = layer.getLatLngs()[0];
      //     if(latlngs.length > 0) {
      //       const area = L.GeometryUtil.geodesicArea(layer.getLatLngs()[0]);
      //       alert("Area: " + area + " square meters");
      //     }
      //   }
      // });

      map.value.on("draw:created", function (e) {
        const layer = e.layer;
        map.value.addLayer(layer);
        console.log(e);
      });
    

      // 側邊欄位控制器
      const sidebar = L.control.sidebar({
        autopan: true,
        closeButton: true,
        container: 'sidebar',
        position: 'right',
      }).addTo(map.value);

      sidebar.open('home');
    };

     // 設置繪圖事件
    //  const setupDrawEvents = () => {
    //   map.value.on(L.Draw.Event.CREATED, function (event) {
    //     const layer = event.layer;
    //     drawItems.value.addLayer(layer);

    //     // Debugging logs
    //     console.log('Layer Type:', event.layerType);
    //     console.log('Layer LatLngs:', layer.getLatLngs());

    //     // 計算測量結果
    //     if (event.layerType === 'polyline') {
    //       const latLngs = layer.getLatLngs();
    //       if (latLngs.length > 0) {
    //         const length = L.GeometryUtil.length(layer);
    //         alert("Length: " + length + " meters");
    //       }
    //     } else if (event.layerType === 'polygon' || event.layerType === 'rectangle') {
    //       const latlngs = layer.getLatLngs()[0];
    //       if (latlngs.length > 0) {
    //         const area = L.GeometryUtil.geodesicArea(latlngs);
    //         alert("Area: " + area + " square meters");
    //       }
    //     }
    //   });
    // };


    // 點選後回復到 openstreetmap 的地圖
    const addInitMap = () => {
      if (map.value && currentTileLayer.value) {
        map.value.removeLayer(currentTileLayer.value);
      }
      const tileInit = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(map.value);

      currentTileLayer.value = tileInit;
    }

    // 點選後進入到國土測繪中心的地圖
    const addTileLayer = () => {
      if (map.value && currentTileLayer.value) {
        map.value.removeLayer(currentTileLayer.value);
      }

      const tileLayer1 = L.tileLayer('https://wmts.nlsc.gov.tw/wmts/PHOTO2/default/GoogleMapsCompatible/{z}/{y}/{x}', {
        attribution: '國土測繪中心',
        maxZoom: 19,
      }).addTo(map.value);

      currentTileLayer.value = tileLayer1;
    };

    // 點選後進入到氣象局的地圖
    const addAtmosphereTileLayer = () => {
      if (map.value && currentTileLayer.value) {
        map.value.removeLayer(currentTileLayer.value);
      }

      const tileLayer2 = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}', {
        attribution: 'Tiles &copy; Esri &mdash; Source: Esri',
        maxZoom: 19,
      }).addTo(map.value);

      currentTileLayer.value = tileLayer2;
    };

    return {
      addInitMap,
      addTileLayer,
      addAtmosphereTileLayer,
    };
  }
};
</script>


<!-- <style>
@import '@/leaflet/dist/leaflet.css';
@import '@/leaflet-draw/dist/leaflet.draw.css';
</style> -->

<!-- <style>
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
</style> -->
