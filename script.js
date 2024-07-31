var mymap = L.map('mymap').setView([37.322729, -121.915732], 13);
var mylayer = L.geoJSON().addTo(mymap);

 function onEachFeature(feature, layer) {
    if (feature.properties && feature.properties.Project_Name) {
        layer.bindPopup("<p><b>" + feature.properties.Project_Name + 
        "</b></p><p><b>Developer:</b> " + feature.properties.Owner_Developer + "</p>", {closeButton: false});
        layer.on('mouseover', function() { layer.openPopup(); });
        layer.on('mouseout', function() { layer.closePopup(); });
        layer.on('click', function() { window.open(feature.properties.Website_Page);
        }); 
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
