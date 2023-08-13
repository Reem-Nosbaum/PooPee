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

function toggleFooter() {
    const footer = document.querySelector('.footer');
    footer.classList.toggle('hidden');
}

function toiletLocations() {
    // Clear previous markers
    markers.forEach(marker => marker.removeFrom(map));

    toiletArry.forEach(e => {
        const marker = L.marker(e.coords).addTo(map);
        marker.bindPopup(e.label);
        marker.on('click', () => {
            toggleFooter(); // Toggle the footer visibility on marker click
        });
        markers.push(marker);
        console.log(markers);
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

        map = L.map('map', { zoomControl: false }).setView(coords, 15);
        L.tileLayer('https://tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '© OpenStreetMap'
        }).addTo(map);

        L.control.zoom({ position: 'topright' }).addTo(map);

    }, function () {
        alert('Could not get your position');
    });
}

function openNavigationInWaze(coords) {
    console.log(coords);

    // alert('you abuot to leav this page to waze')
    // Create the Waze URL with the specified latitude and longitude
    const wazeUrl = `https://www.waze.com/ul?ll=${coords[0]},${coords[1]}&navigate=yes`;

    // Open the link in a new tab or window
    window.open(wazeUrl, '_blank');

}


    // Set up event listener for the "Directions" button click
    // const directionsButton = document.querySelector('.btn-navigation');
    // directionsButton.addEventListener('click', () => {
    //     openNavigationInWaze(e.coords, e.label); // Pass the coordinates and label
    // });