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

    console.log(calcDist);

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
    distDisplayEl.textContent = `Distance from Point A to Point B = ${distance} km`;
}

coordFormEl.addEventListener('submit', submitCoords);



// Initialize and add the map
let map;

async function initMap() {
    console.log('calling init map');

    const pointA = { lat: parseFloat(pointACoords.lat), lng: parseFloat(pointACoords.lon) };
    const pointB = { lat: parseFloat(pointBCoords.lat), lng: parseFloat(pointBCoords.lon) };

    const { Map } = await google.maps.importLibrary("maps");
    const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");

    map = new Map(document.getElementById("map"), {
        zoom: 4,
        //center: positionA,
        center: { lat: 36.549387, lng: -7.885140 },
        mapId: "coordinatesMap",
    });

    // const markerA = new AdvancedMarkerElement({
    //     map: map,
    //     position: positionA,
    //     title: "Point A",
    // });

    // const markerB = new AdvancedMarkerElement({
    //     map: map,
    //     position: positionB,
    //     title: "Point B",
    // });

  console.log('reached end of init map');
}


async function showPoints() {
    const pointA = { lat: parseFloat(pointACoords.lat), lng: parseFloat(pointACoords.lon) };
    const pointB = { lat: parseFloat(pointBCoords.lat), lng: parseFloat(pointBCoords.lon) };

    const { Map } = await google.maps.importLibrary("maps");
    const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");

    map = new Map(document.getElementById("map"), {
        zoom: 4,
        //center: positionA,
        center: pointA,
        mapId: "coordinatesMap",
    });

    const markerA = new AdvancedMarkerElement({
        map: map,
        position: pointA,
        title: "Point A",
    });

    map.panTo(pointA);

    const markerB = new AdvancedMarkerElement({
        map: map,
        position: pointB,
        title: "Point B",
    });

    map.panTo(pointB);
}