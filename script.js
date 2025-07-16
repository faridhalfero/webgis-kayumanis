// Inisialisasi peta
const map = L.map('map').setView([-0.5, 100.5], 9); // Ubah sesuai wilayah kayu manis

// Basemap citra satelit Esri
const satellite = L.tileLayer(
  'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
  {
    attribution: 'Tiles © Esri & Contributors',
    maxZoom: 19
  }
).addTo(map);

// Tampilkan GeoJSON
fetch('Kayumanis.geojson')
  .then(res => res.json())
  .then(data => {
    const geoLayer = L.geoJSON(data, {
      style: {
        color: "#ff7800",
        weight: 2,
        fillOpacity: 0.5
      },
      onEachFeature: function (feature, layer) {
        let info = "";
        for (const key in feature.properties) {
          info += `<strong>${key}</strong>: ${feature.properties[key]}<br>`;
        }
        layer.bindPopup(info);
      }
    }).addTo(map);

    // Zoom ke area poligon
    map.fitBounds(geoLayer.getBounds());
  })
  .catch(err => {
    console.error("Gagal memuat GeoJSON:", err);
  });
