if(navigator.geolocation)
    navigator.geolocation.getCurrentPosition(function(position){
        const { latitude } = position.coords
        const { longitude } = position.coords
        const coordes = [latitude, longitude]

        console.log(latitude, longitude);

        const map = L.map('map').setView(coordes, 13);

        L.tileLayer('https://tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '© OpenStreetMap'
        }).addTo(map);
    
    }, function(){
        alert('Could not get your position')
    })
