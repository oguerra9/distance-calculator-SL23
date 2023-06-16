var coordFormEl = document.getElementById('coordForm');
var pointALatIn = document.getElementById('pointALat');
var pointALonIn = document.getElementById('pointALon');
var pointBLatIn = document.getElementById('pointBLat');
var pointBLonIn = document.getElementById('pointBLon');

var distDisplayEl = document.getElementById('distanceDisplay');

var pointACoords = {
    lat: '',
    lon: ''
};

var pointBCoords = {
    lat: '',
    lon: ''
};

var distance = 0.0;

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
}

function calculateDistance() {

    var latA = parseFloat(pointACoords.lat) * (Math.PI/180);
    var lonA = parseFloat(pointACoords.lon) * (Math.PI/180);

    var latB = parseFloat(pointBCoords.lat) * (Math.PI/180);
    var lonB = parseFloat(pointBCoords.lon) * (Math.PI/180);

    var earthRadius = 6378.1; // km

    var calcDist = (Math.acos( (Math.sin(latA) * Math.sin(latB)) + (Math.cos(latA) * Math.cos(latB) * Math.cos(lonB-lonA))) * earthRadius); 

    console.log(calcDist);

    return calcDist;
}

function resetForm() {

    pointALatIn.value = '';
    pointALonIn.value = '';
    pointBLatIn.value = '';
    pointBLonIn.value = '';

}

function displayDistance() {
    var distDis = document.createElement('h3');
    distDis.textContent = `Distance from Point A to Point B = ${distance} km`;

    distDisplayEl.appendChild(distDis);
}

coordFormEl.addEventListener('submit', submitCoords);