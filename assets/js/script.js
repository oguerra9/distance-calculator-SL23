var coordFormEl = document.getElementById('coordForm');
var pointALatIn = document.getElementById('pointALat');
var pointALonIn = document.getElementById('pointALon');
var pointBLatIn = document.getElementById('pointBLat');
var pointBLonIn = document.getElementById('pointBLon');

var distDisplayEl = document.getElementById('distanceDisplay');

let map;

var pointACoords = {
    lat: '',
    lon: ''
};

var pointBCoords = {
    lat: '',
    lon: ''
};

var distance = 0.0;

initMap();



function submitCoords(event) {

    event.preventDefault();

    pointACoords.lat = pointALatIn.value;
    pointACoords.lon = pointALonIn.value;
    pointBCoords.lat = pointBLatIn.value;
    pointBCoords.lon = pointBLonIn.value;

    console.log(pointACoords);
    console.log(pointBCoords);

    resetForm();
    distance = calculateDistance();
    displayDistance();
    //initMap();
    showPoints();
}

function calculateDistance() {

    var latA = parseFloat(pointACoords.lat) * (Math.PI/180);
    var lonA = parseFloat(pointACoords.lon) * (Math.PI/180);

    var latB = parseFloat(pointBCoords.lat) * (Math.PI/180);
    var lonB = parseFloat(pointBCoords.lon) * (Math.PI/180);

    var earthRadius = 6378.1; // km

    var calcDist = (Math.acos( (Math.sin(latA) * Math.sin(latB)) + (Math.cos(latA) * Math.cos(latB) * Math.cos(lonB-lonA))) * earthRadius);

    return calcDist;
}

function resetForm() {

    pointALatIn.value = '';
    pointALonIn.value = '';
    pointBLatIn.value = '';
    pointBLonIn.value = '';

    distDisplayEl.textContent = '';
}

function displayDistance() {
    distDisplayEl.textContent = `Distance = ${distance} km`;
}

async function initMap() {
    console.log('calling init map');

    const pointA = { lat: parseFloat(pointACoords.lat), lng: parseFloat(pointACoords.lon) };
    const pointB = { lat: parseFloat(pointBCoords.lat), lng: parseFloat(pointBCoords.lon) };

    const { Map } = await google.maps.importLibrary("maps");
    const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");

    map = new Map(document.getElementById("map"), {
        zoom: 2,
        center: { lat: 36.549387, lng: -7.885140 },
        mapId: "coordinatesMap",
    });

}

async function showPoints() {
    const pointA = { lat: parseFloat(pointACoords.lat), lng: parseFloat(pointACoords.lon) };
    const pointB = { lat: parseFloat(pointBCoords.lat), lng: parseFloat(pointBCoords.lon) };

    const { Map } = await google.maps.importLibrary("maps");
    const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");
    const { Marker } = await google.maps.importLibrary("marker");
    const {LatLngBounds} = await google.maps.importLibrary("core");
    //var bounds = await google.maps.LatLngBounds();
    var bounds = new LatLngBounds();

    map = new Map(document.getElementById("map"), {
        zoom: 2,
        center: { lat: 36.549387, lng: -7.885140 },
        mapId: "coordinatesMap",
    });

    const markerA = new Marker({
        position: pointA,
        title: "Point A",
        label: "A"
    });

    const markerB = new Marker({
        position: pointB,
        title: "Point B",
        label: "B"
    });

    markerA.setMap(map);
    markerB.setMap(map);
    
    map.panTo(pointA);
    bounds.extend(pointA);
    bounds.extend(pointB);
    map.fitBounds(bounds);   
    
    
    const coordPath = new google.maps.Polyline({
        path: [pointA, pointB],
        geodesic: true,
        strokeColor: "#FF0000",
        strokeOpacity: 1.0,
        strokeWeight: 2,
    });

    coordPath.setMap(map);
    
    map.setZoom(map.getZoom() - 1);
}

coordFormEl.addEventListener('submit', submitCoords);