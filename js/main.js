// using coordes and map, outside the "if" statment
let coordes
let map

if(navigator.geolocation)
    navigator.geolocation.getCurrentPosition(function(position){
        const { latitude } = position.coords
        const { longitude } = position.coords
        coordes = [latitude, longitude]

        map = L.map('map').setView(coordes, 17);
        
        L.tileLayer('https://tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '© OpenStreetMap'
        }).addTo(map);
    
    }, function(){
        alert('Could not get your position')
    })


function myLocation() {
    var myIcon = L.icon({
        iconUrl: 'poo_em.png',
        iconSize: [40, 40],
        iconAnchor: [22, 94],
        popupAnchor: [-3, -76],
    });
    
    var marker = L.marker(coordes, {icon: myIcon}).addTo(map);
    
    // var marker = L.marker(coordes).addTo(map)
    marker.bindPopup("<b>it's look like you are the toilet.. 💩💩💩!</b>").openPopup()
}
