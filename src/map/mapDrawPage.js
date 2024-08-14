import L from 'leaflet'
import 'leaflet-draw/dist/leaflet.draw.css';
import 'leaflet-draw'

export function initializeMap(mapId, center = [25.034, 121.564], zoom = 13) {
    // 初始化地圖
    const map = L.map(mapId).setView(center, zoom);

    // 添加地圖圖層
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxzoom: 18,
    }).addTo(map);

    // 定義繪製圖層
    const drawItems = new L.FeatureGroup();
    map.addLayer(drawItems);

    // 添加繪製套件
    const drawControl = new L.Control.Draw({
        edit: {
            featureGroup: drawItems,
        },
        draw: {
            polygon: true,
            polyline: true,
            rectangle: true,
            circle: true,
            marker: true,
        }
    });
    map.addControl(drawControl);

    // 處理繪製創建事件
    map.on(L.Draw.Event.CREATED, (event) => {
        const layer = event.layer;
        drawItems.addLayer(layer);
    })

}