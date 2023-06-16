var coordFormEl = document.getElementById('coordForm');
var pointALatIn = document.getElementById('pointALat');
var pointALonIn = document.getElementById('pointALon');
var pointBLatIn = document.getElementById('pointBLat');
var pointBLonIn = document.getElementById('pointBLon');
var distDisplayEl = document.getElementById('distanceDisplay');

let map;
let markerA;
let markerB;
let coordPath;

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
initPoints();

function submitCoords(event) {

    event.preventDefault();

    pointACoords.lat = pointALatIn.value;
    pointACoords.lon = pointALonIn.value;
    pointBCoords.lat = pointBLatIn.value;
    pointBCoords.lon = pointBLonIn.value;

    resetForm();
    distance = calculateDistance();
    displayDistance();
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

    const { Map } = await google.maps.importLibrary("maps");

    map = new Map(document.getElementById("map"), {
        zoom: 2,
        center: { lat: 36.549387, lng: -7.885140 },
        mapId: "coordinatesMap",
    });

}

async function initPoints() {
    const { Marker } = await google.maps.importLibrary("marker");

    markerA = new Marker({
        title: "Point A",
        label: "A"
    });

    markerB = new Marker({
        title: "Point B",
        label: "B"
    });

    coordPath = new google.maps.Polyline({
        geodesic: true,
        strokeColor: "#FF0000",
        strokeOpacity: 1.0,
        strokeWeight: 2,
    });

}

async function showPoints() {

    const pointA = { lat: parseFloat(pointACoords.lat), lng: parseFloat(pointACoords.lon) };
    const pointB = { lat: parseFloat(pointBCoords.lat), lng: parseFloat(pointBCoords.lon) };

    const {LatLngBounds} = await google.maps.importLibrary("core");
    
    var bounds = new LatLngBounds();

    map.panTo(pointA);

    bounds.extend(pointA);
    bounds.extend(pointB);
    map.fitBounds(bounds);  

    markerA.setPosition(pointA);
    markerB.setPosition(pointB);

    markerA.setMap(map);
    markerB.setMap(map);
    
    coordPath.setPath([pointA, pointB]);
    coordPath.setMap(map);

}

coordFormEl.addEventListener('submit', submitCoords);