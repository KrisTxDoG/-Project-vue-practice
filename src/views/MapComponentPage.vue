<template>
  <div>
    <div id="map" style="position: fixed; top: 0; left: 0; width: 100%; height: 100%;"></div>
    
    <button class="map-button btn btn-danger" @click="addTileLayer">新增國土圖層</button>
    
    <button class="map-button-1 btn btn-danger" @click="addAtmosphereTileLayer">新增氣象圖層</button>

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


          <button class="map-button btn btn-danger" @click="addTileLayer">新增國土圖層</button>
    
          <button class="map-button-1 btn btn-danger" @click="addAtmosphereTileLayer">新增氣象圖層</button>

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

export default {
  name: 'MapComponentPage',
  setup() {
    const map = ref(null);
    const currentTileLayer = ref(null);

    onMounted(() => {
      initMap();
    });

    const initMap = () => {
      map.value = L.map('map').setView([24.91, 121.673], 13);

      const defaultTileLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(map.value);

      currentTileLayer.value = defaultTileLayer;

      const sidebar = L.control.sidebar({
        autopan: true,
        closeButton: true,
        container: 'sidebar',
        position: 'right',
      }).addTo(map.value);

      sidebar.open('home');
    };

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
      addTileLayer,
      addAtmosphereTileLayer,
    };
  }
};
</script>

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
