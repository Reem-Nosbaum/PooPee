var map = L.map('map')
map.setView([32.0790096,34.7680621], 13);


L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap'
}).addTo(map);
