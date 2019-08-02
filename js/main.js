
$(document).ready(function () {


    'use strict';
  
    $(window).on('scroll', function () {
  
        if ($(this).scrollTop() >= 5) {
            $('nav').addClass('nav-fixed');
            $('nav ul li a').removeClass('white');
            $('a.brand').removeClass('white');
            $('nav ul li a').addClass('black');
            $('a.brand').addClass('black');
            $('nav ul li a').addClass('blackbg');
            $('.nav').addClass('navbar_header_fixed');


        } else {
            $('nav').removeClass('nav-fixed');
            $('nav ul li a').removeClass('black');
            $('a.brand').removeClass('black');
            $('nav ul li a').addClass('white');
            $('a.brand').addClass('white');
            $('nav ul li a').removeClass('blackbg');
            $('.nav').removeClass('navbar_header_fixed');
            

        }
  
    });
  });
  // Load up the container that will house the map
const mapElement = document.getElementById('google-map');

// These coordinates point to the Uni Campus. The map will center here
const cheltenhamCoords = {
    lat: 51.887186, 
    lng: -2.088879
};

// Two markers that we want to display on the map by default
const initialMarkers = [
    {
        lat: 51.886272, 
        lng: -2.083902
    },
    {
        lat: 51.888312, 
        lng: -2.087013
    }
];

// Create a variable to store a Google Maps instance
let mapInstance = null;

// We store any markers that we add here
let markerStore = [];

// A shared function that creates a new marker 
// instance and pushes it into the marker store
function addNewMarker(coords) {
    
    // Attach marker to the map
    let markerInstance = new google.maps.Marker({
        position: coords, 
        map: mapInstance
    });
    
    // Push it into the store
    markerStore.push({
        lat: coords.lat,
        lng: coords.lng
    });
    
    console.table(markerStore);
}

// We attach this function to the map's click event
function handleNewMarker(evt) {
    let data = evt.latLng;
    
    addNewMarker({
        lat: data.lat(),
        lng: data.lng()
    });
}

// This function renders the Google Map initially
function renderMap() {
    
    // Create the map and center it on the Uni Campus
    mapInstance = new google.maps.Map(mapElement, {
        center: {
            lat: cheltenhamCoords.lat, 
            lng: cheltenhamCoords.lng
        },
        zoom: 15
    });
    
    // Loop the initial markers and push it into the add marker function
    initialMarkers.map(marker => addNewMarker(marker));
    
    // Add a click event listener to the map to add a new marker
    mapInstance.addListener('click', handleNewMarker);
}

// Run the render function by default
renderMap();