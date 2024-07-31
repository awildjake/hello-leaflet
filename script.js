var mymap = L.map('mymap').setView([37.322729, -121.915732], 13);
var mylayer = L.geoJSON().addTo(mymap);

// In Design
var blueIcon = new L.Icon({
    iconUrl: 'img/marker-icon-blue.png',
    shadowUrl: 'img/marker-shadow.png',
	iconSize: [25, 41],
	iconAnchor: [12, 41],
	popupAnchor: [1, -34],
	shadowSize: [41, 41] // point from which the popup should open relative to the iconAnchor
});

// Approved
var goldIcon = new L.Icon({
	iconUrl: 'img/marker-icon-gold.png',
	shadowUrl: 'img/marker-shadow.png',
	iconSize: [25, 41],
	iconAnchor: [12, 41],
	popupAnchor: [1, -34],
	shadowSize: [41, 41]
});

// Construction
var violetIcon = new L.Icon({
	iconUrl: 'img/marker-icon-violet.png',
	shadowUrl: 'img/marker-shadow.png',
	iconSize: [25, 41],
	iconAnchor: [12, 41],
	popupAnchor: [1, -34],
	shadowSize: [41, 41]
});

// Completed
var greenIcon = new L.Icon({
	iconUrl: 'img/marker-icon-green.png',
	shadowUrl: 'img/marker-shadow.png',
	iconSize: [25, 41],
	iconAnchor: [12, 41],
	popupAnchor: [1, -34],
	shadowSize: [41, 41]
});

// Withdrawn
var greyIcon = new L.Icon({
	iconUrl: 'img/marker-icon-grey.png',
	shadowUrl: 'img/marker-shadow.png',
	iconSize: [25, 41],
	iconAnchor: [12, 41],
	popupAnchor: [1, -34],
	shadowSize: [41, 41]
});

function getIcon(phase) {
    return phase == "In Design" ? blueIcon :
           phase == "Under Review" ? blueIcon :
           phase == "Approved" ? goldIcon :
           phase == "Construction" ? violetIcon :
           phase == "Completed" ? greenIcon :
           phase == "Withdrawn" ? greyIcon :
           goldIcon;
}

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
  
 const geojson = new L.GeoJSON.AJAX('https://raw.githubusercontent.com/awildjake/hello-leaflet/main/assets/projects.geojson',{
    onEachFeature:onEachFeature,
    pointToLayer: function (feature, latlng) {
    	return L.marker(latlng, { icon: getIcon(feature.properties.Phase) });
    }
  }).addTo(mylayer);
