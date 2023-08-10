let coords;
let map;
const toiletArry = [
    { coords: [32.1974516, 34.8732257], label: 'renanim' },
    { coords: [32.1920517, 34.8891483], label: 'green kfer saba' },
    { coords: [32.100446, 34.8240358], label: 'Ayalon Mall' },
];
let markers = [];

function GoBackToMyLocation() {
    const myLocationMarker = L.marker(coords).addTo(map);
    myLocationMarker.bindPopup("<b>My Location</b>").openPopup();
    
    map.setView(coords, 16);
}


function toiletLocations() {
    // Clear previous markers
    markers.forEach(marker => marker.removeFrom(map));

    // Add new markers
    toiletArry.forEach(entry => {
        const { coords, label } = entry;
        const marker = L.marker(coords).addTo(map);
        marker.bindPopup(label);
        markers.push(marker);
    });

    // Find nearest marker and move map to it
    if (coords) {
        let nearestMarker = null;
        let nearestDistance = Infinity;

        markers.forEach(marker => {
            const markerCoords = marker.getLatLng();
            const distance = coords.distanceTo(markerCoords);

            if (distance < nearestDistance) {
                nearestMarker = marker;
                nearestDistance = distance;
            }
        });

        if (nearestMarker) {
            map.setView(nearestMarker.getLatLng(), 16);
            nearestMarker.openPopup();
        }
    }
}


if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function (position) {
        const { latitude } = position.coords;
        const { longitude } = position.coords;
        coords = L.latLng(latitude, longitude);

        map = L.map('map').setView(coords, 15);
        L.tileLayer('https://tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '© OpenStreetMap'
        }).addTo(map);
    }, function () {
        alert('Could not get your position');
    });
}
