let coordes;
let map

if(navigator.geolocation)
    navigator.geolocation.getCurrentPosition(function(position){
        const { latitude } = position.coords
        const { longitude } = position.coords
        coordes = [latitude, longitude]

        console.log(latitude, longitude);

        map = L.map('map').setView(coordes, 13);

        L.tileLayer('https://tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '© OpenStreetMap'
        }).addTo(map);
    
    }, function(){
        alert('Could not get your position')
    })


// Define a function that uses coordes array
function useCoordinatesOutsideIfStatement() {
    if (coordes) {
        // Do something with coordes
        console.log('Using coordes array outside if statement:', coordes);
    } else {
        console.log('Coordinates not available yet.');
    }
}




function myLocation() {
    console.log(coordes)
    var marker = L.marker(coordes).addTo(map);
    marker.bindPopup("<b>I'm right here!</b>").openPopup()
}
