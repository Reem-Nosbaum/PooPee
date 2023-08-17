let coords;
let map;
let toiletMarkers = []; // Array to store the toilet markers
let myLocationMarker = null; // Variable to store the My Location marker

const toiletArry = [
    { coords: [32.1974516, 34.8732257], label: 'renanim' },
    { coords: [32.1920517, 34.8891483], label: 'green kfer saba' },
    { coords: [32.100446, 34.8240358], label: 'Ayalon Mall' },
];


function myLocation() {
    // Remove the existing My Location marker from the map
    if (myLocationMarker) {
        map.removeLayer(myLocationMarker);
        myLocationMarker = null;
    }

    // Add a new My Location marker to the map
    myLocationMarker = L.marker(coords).addTo(map);
    myLocationMarker.bindPopup("<b>My Location</b>").openPopup();
    map.setView(coords, 16);
}

function toggleFooter() {
    const footer = document.querySelector('.footer');
    footer.classList.toggle('hidden');
}


function toiletLocation() {
    // Remove existing toilet markers and lines from the map
    toiletMarkers.forEach(markerEl => map.removeLayer(markerEl));
    toiletMarkers = []; // Clear the array

    if (myLocationMarker) {
        map.removeLayer(myLocationMarker);
        myLocationMarker = null;
    }

    // Calculate distances and find the closest toilet
    let closestToilet = null;
    let minDistance = Infinity;

    toiletArry.forEach((toilet) => {
        const toiletLatLng = L.latLng(toilet.coords[0], toilet.coords[1]);
        const distance = toiletLatLng.distanceTo(coords); // Calculate distance in meters

        if (distance < minDistance) {
            minDistance = distance;
            closestToilet = toilet;
        }
    });

    if (closestToilet) {
        // Draw line between my location and closest toilet
        const closestLatLng = L.latLng(closestToilet.coords[0], closestToilet.coords[1]);
        const line = L.polyline([coords, closestLatLng], { color: '#845020' }).addTo(map);

        const closestMarker = L.marker(closestToilet.coords).addTo(map).bindPopup(closestToilet.label).openPopup();
        toiletMarkers.push(closestMarker); // Store the marker in the array
        map.setView(closestToilet.coords, 13);
        myLocationMarker = L.marker(coords).addTo(map);
        myLocationMarker.bindPopup("<b>My Location</b>").openPopup();    

    }
}

if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function (position) {
        const { latitude } = position.coords;
        const { longitude } = position.coords;
        coords = L.latLng(latitude, longitude);

        map = L.map('map', { zoomControl: false }).setView(coords, 15);
        L.tileLayer('https://cdn.lima-labs.com/{z}/{x}/{y}.png?api=demo', {
            maxZoom: 19,
            attribution: '© OpenStreetMap'
        }).addTo(map);

        L.control.zoom({ position: 'topright' }).addTo(map);

    }, function () {
        alert('Could not get your position');
    });
}


