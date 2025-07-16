const map = L.map('map').setView([-0.5, 100.5], 9);

const osm = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '© OpenStreetMap contributors'
}).addTo(map);

const satellite = L.tileLayer(
  'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
    attribution: 'Tiles © Esri'
});

L.control.layers({
  "Peta Biasa": osm,
  "Citra Satelit": satellite
}).addTo(map);

fetch('Kayumanis.geojson')
  .then(res => res.json())
  .then(data => {
    const geoLayer = L.geoJSON(data).addTo(map);
    map.fitBounds(geoLayer.getBounds());
  });
