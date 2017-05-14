export default () => {
    const uluru = {lat: 50.4501, lng: 30.523400000000038};
    const map = new google.maps.Map(document.getElementById('map'), {
        zoom: 16,
        center: uluru,
        disableDefaultUI: true
    });
    const img = 'img/pointer.svg';
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

    $('#menu-btn').click(function () {
        console.log('menu');
        TweenMax.to('#menu', 1, {autoAlpha:1});
    });

    // Set the date we're counting down to
    const countDownDate = new Date("Jan 5, 2018 23:59:59").getTime();

    // Update the count down every 1 second
    const x = setInterval(function() {

        // Get todays date and time
        const now = new Date().getTime();

        // Find the distance between now an the count down date
        const distance = countDownDate - now;

        // Time calculations for days, hours, minutes and seconds
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));

        // Output the result in an element with id="demo"
        document.getElementById("timer").innerHTML = hours + ":" + minutes;

        // If the count down is over, write some text
        if (distance < 0) {
            clearInterval(x);
            document.getElementById("timer").innerHTML = "EXPIRED";
        }
    }, 1000);
};