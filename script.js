var mymap = L.map('mymap').setView([37.322729, -121.915732], 13);
var mylayer = L.geoJSON().addTo(mymap);

 function onEachFeature(feature, layer) {
    if (feature.properties && feature.properties.Address) {
        layer.bindPopup(feature.properties.Address);
    }
}

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(mymap);

fetch('https://raw.githubusercontent.com/awildjake/hello-leaflet/main/assets/projects.geojson')
	.then(function (response) {
  	return response.json();
  })
  .then(function (data) {
  	L.geoJSON(data, {
    	onEachFeature: onEachFeature
    }).addTo(mylayer);
  });
