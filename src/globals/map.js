export default () => {
    const uluru = {lat: 50.4501, lng: 30.523400000000038};
    const map = new google.maps.Map(document.getElementById('map'), {
        zoom: 16,
        center: uluru,
        disableDefaultUI: true
    });
    const img = 'img/marker.png';
    const marker = new google.maps.Marker({
        position: uluru,
        map: map,
        icon: img
    });
};