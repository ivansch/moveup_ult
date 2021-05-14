var map = L.map('map-template').setView([-34.8628092799242, -58.3729186343873], 10);

const tileURL = 'https://b.tile.openstreetmap.org/{z}/{x}/{y}.png'
const tileURL2 = 'https://maps.wikimedia.org/osm-intl/{z}/{x}/{y}.png';
const userIcon = L.icon({
  iconUrl: '/img/icon2.png',
  iconSize: [38, 42],
})
const tile = L.tileLayer(tileURL2);

// Socket Io
const socket = io.connect();
// create popup contents


// Geolocation
map.locate({
  enableHighAccuracy: true
})
// LOCATION ACTUAL
// map.on('locationfound', (e) => {
//   const coords = [e.latlng.lat, e.latlng.lng];
//   const newMarker = L.marker(coords);
//   newMarker.bindPopup('You are Here!');
//   map.addLayer(newMarker);
//   socket.emit('userCoordinates', e.latlng);
// });

// document.getElementById('select-location').addEventListener("change", function(e) {
//   let coords = e.target.value.split(",");
//   console.log(coords);
//   L.marker(coords).addTo(map)
//   map.flyTo(coords, 18);
// });






// socket new User connected
socket.on('newUserCoordinates', (coords) => {
  console.log(coords);
  const userIcon = L.icon({
    iconUrl: '/img/icon2.png',
    iconSize: [38, 42],
  })
  const newUserMarker = L.marker([coords.lat, coords.lng], {
    icon: userIcon
  });
  newUserMarker.bindPopup('New User!');
  map.addLayer(newUserMarker);
});

map.addLayer(tile);
const requestURL = 'https://raw.githubusercontent.com/ivansch/SpaceApps2020/master/api.json';
$.getJSON("js/school.json", function(json) {
  console.log(json); // this will show the info it in firebug console
  tempgeojson = mygeojson.features.filter(function(item) {
    return (mylist.every(f => item.properties.id === f.id))
  });
  filteredgeojson = {};
  filteredgeojson.features = tempgeojson;
  filteredgeojson.crs = json.crs;
  filteredgeojson.type = "FeatureCollection";

});

mygeojson = {
  crs: {
    properties: {
      name: "EPSG:4326"
    },
    type: "name"
  },
  features: [{
      geometry: {
        coordinates: [25, 37],
        type: "Point"
      },
      eje: "Militar",
      properties: {
        "wineryid": 3
      },
      type: "Feature"
    },
    {
      geometry: {
        coordinates: [26, 37],
        type: "Point"
      },
      eje: "Militar",
      properties: {
        "wineryid": 45
      },
      type: "Feature"
    },
    {
      geometry: {
        coordinates: [25, 38],
        type: "Point"
      },
      eje: "Renacimiento",
      properties: {
        "wineryid": 34
      },
      type: "Feature"
    },
    {
      geometry: {
        coordinates: [28, 37],
        type: "Point"
      },
      eje: "Barroco",
      properties: {
        "wineryid": 42
      },
      type: "Feature"
    },
    {
      geometry: {
        coordinates: [25, 342],
        type: "Point"
      },
      eje: "Barroco",
      properties: {
        "wineryid": 80
      },
      type: "Feature"
    },
    {
      geometry: {
        coordinates: [25.24, 37.12],
        type: "Point"
      },
      eje: "Militar",
      properties: {
        "wineryid": 120
      },
      type: "Feature"
    }
  ],
  type: "FeatureCollection"
};
mylist = [{
  id: 1,
  name: "test1"
}, {
  id: 34,
  name: "test2"
}];
tempgeojson = mygeojson.features.filter(function(item) {
  return (mylist.every(f => item.properties.id === f.id))
});
filteredgeojson = {};
filteredgeojson.features = tempgeojson;
filteredgeojson.crs = mygeojson.crs;
filteredgeojson.type = "FeatureCollection";

document.getElementById('panel').addEventListener('change', function(e) {
  let value = e.target.value;
  filteredgeojson.features = mygeojson.features.filter(item => {
    if (item.eje == value) {
      L.marker(item.geometry.coordinates).addTo(map)

      map.flyTo(item.geometry.coordinates, 18);
      console.log(value + '=' + item.eje);
      return item;
      map.removeLayer(marker2)
      map.removeLayer(marker)
    }
  });
});