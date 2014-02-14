var count=0;
var userData = [];
city='';



function initizalize() {

    //This function brings up the map.
    //Defualt is set to 0,0, min zoom.

    mapOptionsObject = {
        center: new google.maps.LatLng(0, 0),
        zoom: 1,
        mapTypeId: google.maps.ROADMAP

    };


    MapOnThePage = new google.maps.Map(document.getElementById('map-canvas'),
    mapOptionsObject);

    console.log("Map has initzalized.");
    


}

google.maps.event.addDomListener(window, 'load', initizalize);

$(document).ready(function () {

    $('#playIt').attr('disabled', 'disabled')

    var userHint= '';
    var userAnswer= '';

    $("#zonePicker").keypress(function() {

            setTimeout(function() {dropPoint($('#zonePicker').val(),$('#hintPicker').val());}, 1250);

    });

    $('#playIt').click(function(){
        window.location.href = 'home.html';
    })


    $("#addPoint").click(function(){

        



        userHint=$('#hintPicker').val();

        marker = new google.maps.Marker({
            map: MapOnThePage,
            position: city[0].geometry.location,
            animation: google.maps.Animation.DROP
        });

        var infowindow = new google.maps.InfoWindow({
                content: userHint
            });

       setTimeout(function() {infowindow.open(MapOnThePage, marker)}, 750);

        userAnswer=$('#zonePicker').val().toLowerCase();
        userData[count] = {Hint: userHint, Zoner: userAnswer};
        $('#hintPicker').val('');
        $('#zonePicker').val('');

        $('#playerList').append('<li id='+userHint+'>' + userHint + ', in ' + userAnswer)



        count++;

        console.log(userData);
    });

    $('#storeIt').click(function()
    {
        localStorage.setItem("userGame", JSON.stringify(userData));
        localStorage.setItem("userTime", ($('#theTime').val()));
        $('#playIt').removeAttr('disabled')


        console.log (localStorage);
    });



});






function dropPoint(zone, info){

    var userCity = zone;
    geocoderData = new google.maps.Geocoder();

    geocoderData.geocode({
        'address': userCity
    }, function (results) {


        city=results;
        MapOnThePage.setCenter(results[0].geometry.location);

        MapOnThePage.setZoom(5);


    });
}


