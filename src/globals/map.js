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

    window.scrollTo(0,1);

    window.getOnlineStatus = function getOnlineStatus() {
        return navigator.onLine;
    };

    console.log(getOnlineStatus());

    marker.addListener('click', function() {
        console.log('test animation');
            TweenMax.to('.timer-pop-up-window', 1, {y: -290, ease: Circ.easeOut});
    });

    map.addListener('click', function() {
        console.log('test animation');
        TweenMax.to('.timer-pop-up-window', 1, {y: 0, ease: Circ.easeOut});
    });
};