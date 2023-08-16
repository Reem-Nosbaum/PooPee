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
    // Remove existing toilet markers from the map
    toiletMarkers.forEach(markerEl => map.removeLayer(markerEl));
    toiletMarkers = []; // Clear the array

    // Add new toilet markers to the map
    toiletArry.forEach((markerEl) => {
        const marker = L.marker(markerEl.coords).addTo(map).bindPopup(markerEl.label).openPopup();
        toiletMarkers.push(marker); // Store the marker in the array
        map.setView(markerEl.coords, 16);

    });
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


