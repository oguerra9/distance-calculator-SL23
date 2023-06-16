var coordFormEl = document.getElementById('coordForm');
var pointAIn = document.getElementById('pointACoords');
var pointBIn = document.getElementById('pointBCoords');
var distDisplayEl = document.getElementById('distanceDisplay');

let map;
let markerA;
let markerB;
let coordPath;

var pointAString = '';
var pointBString = '';

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

    pointAString = pointAIn.value;
    pointBString = pointBIn.value;


    // pointACoords.lat = pointALatIn.value;
    // pointACoords.lon = pointALonIn.value;
    // pointBCoords.lat = pointBLatIn.value;
    // pointBCoords.lon = pointBLonIn.value;

    retrieveCoords();
    resetForm();
    distance = calculateDistance();
    displayDistance();
    showPoints();
}

function retrieveCoords() {
    let pointACommaIn = pointAString.indexOf(',');
    let pointBCommaIn = pointBString.indexOf(',');

    pointACoords.lat = pointAString.substring(0,pointACommaIn);
    pointACoords.lon = pointAString.substring((pointACommaIn + 1), (pointAString.length + 1));

    pointBCoords.lat = pointBString.substring(0,pointBCommaIn);
    pointBCoords.lon = pointBString.substring((pointBCommaIn + 1), (pointBString.length + 1));

    console.log(pointACoords);
    console.log(pointBCoords);
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

    pointAIn.value = '';
    pointBIn.value = '';

    distDisplayEl.textContent = '';
}

function displayDistance() {
    distDisplayEl.textContent = `Distance = ${Math.round(distance*100)/100} km`;
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