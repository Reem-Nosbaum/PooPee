let coords;
let map;
let toiletMarkers = []; // Array to store the toilet markers
let myLocationMarker = null; // Variable to store the My Location marker
let closestToilet = null;

if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(
    function (position) {
      const { latitude } = position.coords;
      const { longitude } = position.coords;
      coords = L.latLng(latitude, longitude);

      map = L.map("map", { zoomControl: false }).setView(coords, 15);
      L.tileLayer("https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png", {
        maxZoom: 19,
        attribution: "© OpenStreetMap",
      }).addTo(map);

      L.control.zoom({ position: "topright" }).addTo(map);
    },
    function () {
      alert("Could not get your position");
    }
  );
}

const toiletArry = [
  {
    coords: [32.1974516, 34.8732257],
    label: "renanim",
    details: "Rennanim Mall located in Ra'anana city",
    accessibility: true,
    rating: 4.5,
    reviews: [],
  },
  {
    coords: [32.1920517, 34.8891483],
    label: "green kfer saba",
    details: "Green Kfer Saba Park restroom",
    accessibility: false,
    rating: 3.2,
  },
  {
    coords: [32.100446, 34.8240358],
    label: "Ayalon Mall",
    details: "Ayalon Mall shopping center toilet",
    accessibility: true,
    rating: 4.0,
  },
];

function myLocation() {
  // Remove the existing My Location marker from the map
  if (myLocationMarker) {
    map.removeLayer(myLocationMarker);
    myLocationMarker = null;
  }

  // Add a new My Location marker to the map
  myLocationMarker = L.marker(coords)
    .addTo(map)
    .bindPopup("<b>My Location</b>")
    .openPopup();
  map.setView(coords, 15);
}

function toggleFooter() {
  const footer = document.querySelector(".footer");
  footer.classList.toggle("hidden");
}

function findClosestToilet() {
  //   let closestToilet = null;
  let minDistance = Infinity;

  toiletArry.forEach((toilet) => {
    const toiletLatLng = L.latLng(toilet.coords[0], toilet.coords[1]);
    const distance = toiletLatLng.distanceTo(coords); // Calculate distance in meters

    if (distance < minDistance) {
      minDistance = distance;
      closestToilet = toilet;
    }
  });

  return closestToilet;
}

function toiletLocation() {
  // Remove existing toilet markers and lines from the map
  toiletMarkers.forEach((markerEl) => map.removeLayer(markerEl));
  toiletMarkers = []; // Clear the array

  if (myLocationMarker) {
    map.removeLayer(myLocationMarker);
    myLocationMarker = null;
  }

  const closestToilet = findClosestToilet();

  if (closestToilet) {
    // Draw line between my location and closest toilet
    const closestLatLng = L.latLng(
      closestToilet.coords[0],
      closestToilet.coords[1]
    );
    const line = L.polyline([coords, closestLatLng], {
      color: "#845020",
    }).addTo(map);

    const toiletMarker = L.marker(closestToilet.coords).addTo(map);
    toiletMarkers.push(toiletMarker); // Store the marker in the array
    map.setView(closestToilet.coords, 13);

    myLocationMarker = L.marker(coords)
      .addTo(map)
      .bindPopup("<b>My Location</b>")
      .openPopup();
    toiletMarker.bindPopup(closestToilet.label).openPopup();

    toggleFooter();
  }
}

function navigationGoTo() {
  const closestToilet = findClosestToilet();

  if (closestToilet) {
    const [lat, lon] = closestToilet.coords;
    const wazeUrl = `https://www.waze.com/ul?ll=${lat}%2C${lon}&navigate=yes`;
    window.open(wazeUrl, "_blank");
  }
}

function DetailsBtn() {
  const toiletPopup = L.popup();

  if (closestToilet) {
    const details = `
    <h2> 📍 ${closestToilet.label}</h2>
    <p>${closestToilet.details}</p>
    <p> ♿️ Accessibility: ${closestToilet.accessibility ? "Yes" : "No"}</p>
    <p> ⭐️ Rating: ${closestToilet.rating}</p>
  `;

    toiletPopup
      .setLatLng(L.latLng(closestToilet.coords[0], closestToilet.coords[1]))
      .setContent(details)
      .openOn(map);
  } else {
    toiletPopup
      .setLatLng(coords)
      .setContent("No toilet details available.")
      .openOn(map);
  }
}
