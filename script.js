// Inisialisasi peta
const map = L.map('map').setView([-0.5, 100.5], 9);

// --- Basemap: Peta Nama Jalan (OpenStreetMap) ---
const basemapOSM = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '© OpenStreetMap contributors',
  maxZoom: 19
}).addTo(map); // Aktif default

// --- Basemap: Citra Satelit Esri ---
const basemapEsri = L.tileLayer(
  'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
    attribution: 'Tiles © Esri & Contributors',
    maxZoom: 19
  }
);

// --- Basemap: Esri Streets (3D style) ---
const basemapEsriStreets = L.tileLayer(
  'https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}', {
    attribution: 'Tiles © Esri & Contributors',
    maxZoom: 19
  }
);

// --- Layer Control ---
const baseMaps = {
  "Peta Jalan (OpenStreetMap)": basemapOSM,
  "Citra Satelit (Esri)": basemapEsri,
  "Peta Jalan 3D (Esri Streets)": basemapEsriStreets
};
L.control.layers(baseMaps).addTo(map);

// --- Tampilkan Layer GeoJSON ---
fetch('Kayumanis.geojson')
  .then(res => res.json())
  .then(data => {
    const geoLayer = L.geoJSON(data, {
      style: {
        color: "#ff6600",
        weight: 2,
        fillOpacity: 0.4
      },
      onEachFeature: function (feature, layer) {
        let info = "";
        for (const key in feature.properties) {
          info += `<strong>${key}</strong>: ${feature.properties[key]}<br>`;
        }
        layer.bindPopup(info);
      }
    }).addTo(map);

    map.fitBounds(geoLayer.getBounds());
  })
  .catch(err => {
    console.error("Gagal memuat GeoJSON:", err);
  });
