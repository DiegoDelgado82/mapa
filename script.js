let map;

function initMap() {

    map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: -31.4201, lng: -64.1888 },
        zoom: 11,
    });
  


    const mapOptions = {
        center: { lat: -31.4167, lng: -64.1833 }, // Coordenadas de Córdoba capital
        zoom: 12,
        disableDefaultUI: true, 
        styles: [
            {
                featureType: "poi",
                stylers: [{ visibility: "off" }], 
            },
        ],
    };



    fetch('markers.json')
        .then(response => response.json())
        .then(data => {
            data.forEach(marker => {
                addMarker(marker);
            });
        })
        .catch(error => console.error('Error al cargar el archivo JSON:', error));

        map = new google.maps.Map(document.getElementById("map"), mapOptions);
           
       
}

function addMarker(markerData) {
    const iconBase = 'icons/';
    const icons = {
        express: iconBase + 'express.png',
        maxi: iconBase + 'maxi.png',
        hiper: iconBase + 'hiper.png'
    };

    const marker = new google.maps.Marker({
        map: map,
        position: { lat: markerData.lat, lng: markerData.lng },
        title: markerData.name,
        icon: icons[markerData.type]
    });

    const infoWindow = new google.maps.InfoWindow({
        content: `<h5>${markerData.name}</h5><p>${markerData.address}</p>`
    });

    marker.addListener('click', function() {
        infoWindow.open(map, marker);
    });
}
