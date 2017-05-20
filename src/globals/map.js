export default () => {
    const uluru = {lat: 50.4501, lng: 30.523400000000038};
    const map = new google.maps.Map(document.getElementById('map'), {
        zoom: 16,
        center: uluru,
        disableDefaultUI: true,

    });
    const img = 'img/pointer.svg';
    const marker = new google.maps.Marker({
        position: uluru,
        map: map,
        icon: img
    });

    window.scrollTo(0, 1);

    window.getOnlineStatus = function getOnlineStatus() {
        return navigator.onLine;
    };

    console.log(getOnlineStatus());

    if (getOnlineStatus()) {
        $(".offline-wrapper").hide();
    } else {
        $(".offline-wrapper").show();
    }

    marker.addListener('click', function () {
        TweenMax.to('.timer-pop-up-window', 1, {y: -290, ease: Circ.easeOut});
    });

    map.addListener('click', function () {
        TweenMax.to('.timer-pop-up-window', 1, {y: 0, ease: Circ.easeOut});
    });

    $('#menu-btn').click(function () {
        TweenMax.to('#menu', 1, {autoAlpha: 1});
    });

    $('#open-close-btn').click(function () {
        if($( "#open-close-btn" ).hasClass( "open-auto" )) {
            console.log('0');
            $( "#open-close-btn" ).removeClass( "open-auto" );
            $( "#open-close-btn" ).addClass( "close-auto" );
            document.getElementById("open-close-btn").innerHTML = "Закрыть автомобиль";
            $( "#car-status" ).addClass( "red" );
            $( "#car-status" ).removeClass( "grey" );
            document.getElementById("car-status").innerHTML = "Открыт";
        } else {
            console.log('1');
            $( "#open-close-btn" ).removeClass( "close-auto" );
            $( "#open-close-btn" ).addClass( "open-auto" );
            document.getElementById("open-close-btn").innerHTML = "Открыть автомобиль";
            $( "#car-status" ).css( "font-color: #51D47F;" );
            $( "#car-status" ).addClass( "grey" );
            $( "#car-status" ).removeClass( "red" );
            document.getElementById("car-status").innerHTML = "Закрыт";
        }
    });


    // Set the date we're counting down to
    const countDownDate = new Date("Jan 5, 2018 23:59:59").getTime();

    // Update the count down every 1 second
    const x = setInterval(function () {

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