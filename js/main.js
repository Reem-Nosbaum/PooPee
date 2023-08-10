let coordes;
let map;             // renanim                 green kfer saba         Ayalon Mall
const toiletArry = [[32.1974516, 34.8732257], [32.1920517,34.8891483], [32.100446,34.8240358]];
let markers = [];

function toiletLocations() {
    // Clear previous markers
    markers.forEach(marker => marker.removeFrom(map));

    // Add new markers
    toiletArry.forEach(coords => {
        const marker = L.marker(coords).addTo(map);
        markers.push(marker);
    });

    // Find nearest marker and move map to it
    if (coordes) {
        let nearestMarker = null;
        let nearestDistance = Infinity;

        markers.forEach(marker => {
            const markerCoords = marker.getLatLng();
            const distance = coordes.distanceTo(markerCoords);

            if (distance < nearestDistance) {
                nearestMarker = marker;
                nearestDistance = distance;
            }
        });

        if (nearestMarker) {
            map.setView(nearestMarker.getLatLng(), 15);
        }
    }
}

if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function (position) {
        const { latitude } = position.coords;
        const { longitude } = position.coords;
        coordes = L.latLng(latitude, longitude);

        map = L.map('map').setView(coordes, 13);
        L.tileLayer('https://tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '© OpenStreetMap'
        }).addTo(map);
    }, function () {
        alert('Could not get your position');
    });
}
