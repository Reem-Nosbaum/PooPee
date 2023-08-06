var map = L.map('map')
map.setView([0, 0], 5);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap'
}).addTo(map);

navigator.geolocation .watchPosition(succsess, error)

let marker, circle, zoomed

function succsess(pos) {

    const lat = pos.coords.latitude
    const lng = pos.coords.longitude
    const accuracy = pos.coords.accuracy

    if(marker) {
        map.removeLayer(marker)
        map.removeLayer(circle)

    }

    marker = L.marker([lat, lng]).addTo(map)
    circle = L.circle( [lat, lng], { radius: accuracy }).addTo(map)


    if(!zoomed) {         
    zoomed = map.fitBounds(circle.getBounds())
    }

    map.setView([lat, lng])
}

function error(err) {

    if (err.code === 1) {
        alert("Please allow geolocation access");
        // Runs if user refuses access
    } else {
        alert("Cannot get current location");
        // Runs if there was a technical problem.
    }

}