var timeoff = 'GO!';
var clockRun;
var count = 0;
var bounds= new google.maps.LatLngBounds();
var errorCount = 0;
var ratio = '';
var arrayPASS = [];

var clockSound = new Audio("items/ticktock.wav");
var buzzerSound = new Audio("items/buzzer.mp3");
var patheticClap= new Audio ("items/fakeapplause.wav");


function initizalize() {

    //This function brings up the map.
    //Defualt is set to 0,0, min zoom.

    mapOptionsObject = {
        center: new google.maps.LatLng(0, 0),
        zoom: 2,
        mapTypeIds: [google.maps.ROADMAP, 'simple'],
        disableDefaultUI: true,
        disableDoubleClickZoom: true,
        keyboardShortcuts: false,
        scrollwheel: false

    };

    //Sets the style of the map to be mostly simplified,
    //removing all labels, datelines, etc...

    var stylerz = [
  {
    "featureType": "administrative",
    "elementType": "labels",
    "stylers": [
      { "visibility": "off" }
    ]
  },
  {
    "featureType": "road",
    "stylers": [
      { "visibility": "off" }
    ]
  },
    {
    "featureType": "water",
    "elementType": "labels",
    "stylers": [
      { "visibility": "off" }
    ]
  },
  {
     "featureType": "administrative",
     "elementType": "geometry.fill",
     "stylers": [
        { "visibility": "off" }
     ]
  },
  {
    "featureType": "administrative.country",
    "elementType": "geometry",
    "stylers": [
      { "color": "#fe8080" },
      { "visibility": "on" },
      { "weight": 0.5 }
    ]
  }

]

    //Puts the styling on the map.

    MapOnThePage = new google.maps.Map(document.getElementById('map-canvas'),
    mapOptionsObject);

    var usRoadMapType = new google.maps.StyledMapType(
    stylerz);



    MapOnThePage.mapTypes.set('simple', usRoadMapType);
    MapOnThePage.setMapTypeId('simple');


    console.log("Map has initzalized.");

}

google.maps.event.addDomListener(window, 'load', initizalize);

$(document).ready(function () {

    //Note:  The steps are noted following normal, assumed gameplay.
    //STEP 1
    //Checks to see if the user has made a game themselves.
    //If not, the button to play a custom game is disabled.
    if (localStorage.getItem("userGame")==undefined)
    {
        $('#myQuizer').text('No custom Quiz found!');
        $('#myQuizer').hide();


    }
    //STEP 2
    //Hides the elements used in GAME MODE, not in SELECT MODE.

	$('#guesses').hide();
	$('#guessgo').hide();
    $('#progressBar').hide();
    $('#barCar').hide();


    //STEP 3
    //Listener for resize.  Sets the center to 0,0 and keeps the map constant.
    window.onresize = function(event) {
        console.log("RESIZE.");
        google.maps.event.trigger(MapOnThePage, "resize");
        MapOnThePage.setCenter({lat:0,lng:0});

    };

    //STEP 4
    //Listener to see which button is pressed.
    //Passes array of data to RUNGAME when clicked.

    $('#go').click(function () {
        console.log("Go has been clicked.");
        arrayPASS=Beers;
        runGame(Beers, 30);
    });
    $('#go2').click(function () {
        console.log("Go has been clicked.");
        arrayPASS=Cars;
        runGame(Cars, 60);
    });
    $('#go3').click(function () {
        console.log("Go has been clicked.");
        arrayPASS=States;
        runGame(States, 300);
    });
    $('#go5').click(function () {
        console.log("Go has been clicked.");

        console.log(localStorage.getItem('userGame'));
        arrayPASS= JSON.parse(localStorage.getItem('userGame'));
        runGame(JSON.parse((localStorage.getItem('userGame'))),parseInt(localStorage.getItem('userTime')));
    });



    $('.refreshIt').click(function(){
        window.location.reload();
    });
});

function tickTock() {

    
    //STEP 8
    //Clock is run for TIMEOFF.

    if (timeoff >= 0) {
        $('#countdown').text(timeoff);
        timeoff--;

        $('#guesses').focus()

            if (timeoff === 8)
        {
            clockSound.play(); //Starts the "crunchtime" tick tock sound.
        }

    } 

    else {



        $('#countdown').text("TIME UP!");
        $('#guesses').attr('disabled', 'disabled');

        MapOnThePage.setZoom(2);

        MapOnThePage.setCenter({lat:0,lng:0});

        clearInterval(clockRun);
        clockSound.pause();
        buzzerSound.play();
        console.log("The count is:"+ count)
        console.log ("The error count is: "+ errorCount);
        console.log("Ratio is"+ ratio)

        var score =(count/arrayPASS.length)*100;
        $('#guessed').html("You got right: "+ (count-errorCount));
        $('#missed').html("You missed: " + (arrayPASS.length-count));
        $('#score').html("Your score: "+ score.toFixed(0) +'%');

        console.log("Things are running here.")

        if (count === 0)
        {
            $('#gussed').html("You got right: 0");
            $('#missed').html("You missed: Well, all of them");
            $('#score').html("Your score: 0%");
            $('#inReview').html("You've got to TRY!");
            $('#endModal').modal('show');   
            return;
            
        }
        if (0 <score < 50)
        {
            $('#inReview').html("Good try.  Better luck next time!");
            console.log("Bad.")
            patheticClap.play();
            
        }

        if (75 >score >50)
        {
            $('#inReview').html("Not bad!  You're getting there!");
            console.log("OK.")
            
        }

        else if ( score>75)
        {
            $('#inReview').html("So close!  Keep at it!");
            console.log("Good!")
            
        }

        $('#endModal').modal('show');   
        return;
    }
}

function runGame(array, timez) {

    //STEP 5
    //Change from SELECT MODE to GAME MODE.
    //hide and reveal the elements
    $('#starterButtons').hide();
	$('#userInput').hide();
	$('#go').hide();
	$('#guesses').show();
    $('#progressBar').show();
    $('#barCar').show();
	$('#countdown').text(timeoff);


    //STEP 6
    //Run the clock

    clockRun = setInterval(tickTock, 1000);

    //Step 7
    //Set the right CSS animation to the clock.

    if (timez===30)
    {
        $('#Handz').addClass("HandzStart30");
        timeoff = 30;
    }
    if (timez===45)
    {
        $('#Handz').addClass("HandzStart45");
        timeoff = 45;
    }    
    if (timez===60)
    {
        $('#Handz').addClass("HandzStart60");
        timeoff = 60;
    }
    if (timez===300)
    {
        $('#Handz').addClass("HandzStart300");
        timeoff = 300;
    }
    if (timez===600)
    {
        $('#Handz').addClass("HandzStart600");
        timeoff = 600;
    }


    //STEP 8
    //Shuffle the array.

	var shuffledArray = array;
	shuffledArray = shuffle(shuffledArray);

    //STEP 9
    //cycle through the array, and check answers.
	cycleThroughArray(shuffledArray);
 }

function cycleThroughArray(array){


	var currentHint = array[count].Hint;
	var currentZone = array[count].Zoner;
	$('#hint').text(currentHint);

    //STEP 10
    //When user presses enter, check answer.
    //Next steps depend on user input.

    $("#guesses").keypress(function(event){
        if(event.keyCode == 13){
            $("#guessgo").click();
        }
    });

    orignalLength = array.length; 

	$('#guessgo').click(function() {
	

		currentHint = array[count].Hint;
		currentZone = array[count].Zoner;

		$('#hint').text(currentHint);


			if ($('#guesses').val().toLowerCase()=== currentZone)
			{
                //STEP 11a 
                //If correct, drop point, user gets the next hint, and progress is shown.

				dropPoint(currentZone, currentHint);
				console.log("Correct answer.")
                console.log("Count is: "+ count + ".  The length of the array is: " + array.length);


				count++;

                if (errorCount > 0 && array.length-errorCount>= orignalLength)
                {
                    //If the USER is correcting old mistakes, remove number from errorCount.
                    errorCount--;
                }

                if (count===(array.length))
                    {
                        //STEP 11b
                        //If they've finished the array, they've won.

                        $('#hint').text("DONE!");
                        ratio= "width: 100%";
                        $('#progressBar').attr("style", ratio);
                        clockSound.pause();
                        clearInterval(clockRun);
                        MapOnThePage.setCenter({lat:0,lng:0});
                        MapOnThePage.setZoom(2);
                        $('#Handz').removeClass("HandzStart30");
                        console.log ("The error count is: "+ errorCount);
                        $('#gussed').html("You got right: " + array.length);
                        $('#missed').html("You missed: None of them!");
                        $('#score').html("Your score: 100%");
                        $('#inReview').html("YOU ROCK!");
                        $('#endModal').modal('show');  
                        return;
                    };   

                $('#guesses').val('')
                $('#hint').text(array[count].Hint);
                ratio = 'width:'+(((count-errorCount)/(array.length))*100)+'%';

                $('#progressBar').attr("style", ratio);


			}
            else if ($('#guesses').val()=='')
            {   
                //STEP 11c
                //User does not know, and the Hint is pushed to the back.

                array.push(array[count]);
                count++;
                errorCount++;
                $('#guesses').val('')
                $('#hint').text(array[count].Hint);



                ratio = 'width:'+(((count-errorCount) /(array.length))*100)+'%';

                $('#progressBar').attr("style", ratio);

            }
			else
			{
                //11d
                //User is wrong, shake the input, otherwise no change.

				console.log("Not correct!")
				$('#guesses').addClass("shakeMe")
                setTimeout(function(){$('#guesses').removeClass("shakeMe")}, 1000);
	       }
	
	});
	}

function dropPoint(zone, info){

    //Logic for dropping the point and info window.

	var userCity = zone;
    geocoderData = new google.maps.Geocoder();

    geocoderData.geocode({
        'address': userCity
    }, function (results) {

        MapOnThePage.setCenter(results[0].geometry.location);
        var marker = new google.maps.Marker({
            map: MapOnThePage,
            position: results[0].geometry.location
        });
        var infowindow = new google.maps.InfoWindow({
                content: info
            });
        MapOnThePage.setZoom(4);
        infowindow.open(MapOnThePage, marker);

    });
}

function shuffle(o) 
{	
    //Shuffle function.
    //Seriously I'm not sure how this works.

 for (var j, x, i = o.length; i; j = parseInt(Math.random() * i, 
10), x = o[--i], o[i] = o[j], o[j] = x);	
 return o;	
};



var Beers = [
	{Hint: "Budweiser", Zoner: "usa"},
	{Hint: "Guiness", Zoner: "ireland"},
	{Hint: "Stella Artois", Zoner: "belgium"},
	{Hint: "Asahi Super Dry", Zoner: "japan"},
	{Hint: "Corona Extra", Zoner: "mexico"},
	{Hint: "Becks", Zoner: "germany"},
	{Hint: "Heineken", Zoner: "netherlands"},
	{Hint: "Peroni", Zoner: "italy"},
	{Hint: "Fosters", Zoner: "australia"},
    {Hint: "Labatt", Zoner: "canada"},
    {Hint: "Baltika", Zoner: "russia"},
    {Hint: "Cristal", Zoner: "chile"},
    {Hint: "Tsingtao", Zoner: "china"}
];

var Cars = [
    {Hint: "Toyota", Zoner: "japan"},
    {Hint: "GM", Zoner: "usa"},
    {Hint: "Volkswagen", Zoner: "germany"},
    {Hint: "Hyundai", Zoner: "south korea"},
    {Hint: "Ford", Zoner: "usa"},
    {Hint: "Nissan", Zoner: "japan"},
    {Hint: "Honda", Zoner: "japan"},
    {Hint: "PSA Peugeot Citro&euml;n", Zoner: "france"},
    {Hint: "Renault", Zoner: "france"},
    {Hint: "Chrysler", Zoner: "usa"},
    {Hint: "Fiat", Zoner: "italy"},
    {Hint: "BMW", Zoner: "germany"},
    {Hint: "Dongfeng Motor", Zoner: "china"},
    {Hint: "Mahindra Group", Zoner: "india"},
    {Hint: "AvtoVAZ", Zoner: "russia"},
    {Hint: "Volvo", Zoner: "sweeden"},
];

var States = [
    {Hint: "Montgomery", Zoner: "alabama"},
    {Hint: "Juneau", Zoner: "alaska"},
    {Hint: "Phoenix", Zoner: "arizona"},
    {Hint: "Little Rock", Zoner: "arkansas"},
    {Hint: "Sacramento", Zoner: "california"},
    {Hint: "Denver", Zoner: "colorado"},
    {Hint: "Hartford", Zoner: "connecticut"},
    {Hint: "Dover", Zoner: "delaware"},
    {Hint: "Tallahassee", Zoner: "florida"},
    {Hint: "Atlanta", Zoner: "georgia"},
    {Hint: "Honolulu", Zoner: "hawaii"},
    {Hint: "Boise", Zoner: "idaho"},
    {Hint: "Springfield", Zoner: "illinois"},
    {Hint: "Indianapolis", Zoner: "indiana"},
    {Hint: "Des Moines", Zoner: "iowa"},
    {Hint: "Topeka", Zoner: "kansas"},
    {Hint: "Frankfort", Zoner: "kentucky"},
    {Hint: "Baton Rouge", Zoner: "louisiana"},
    {Hint: "Augusta", Zoner: "maine"},
    {Hint: "Annapolis", Zoner: "maryland"},
    {Hint: "Boston", Zoner: "massachusetts"},
    {Hint: "Lansing", Zoner: "michigan"},
    {Hint: "St. Paul", Zoner: "minnesota"},
    {Hint: "Jackson", Zoner: "mississippi"},
    {Hint: "Jefferson City", Zoner: "missouri"},
    {Hint: "Helena", Zoner: "montana"},
    {Hint: "Lincoln", Zoner: "nebraska"},
    {Hint: "Carson City", Zoner: "nevada"},
    {Hint: "Concord", Zoner: "new hamshire"},
    {Hint: "Trenton", Zoner: "new jersey"},
    {Hint: "Santa Fe", Zoner: "new mexico"},
    {Hint: "Albany", Zoner: "new york"},
    {Hint: "Raleigh", Zoner: "north carolina"},
    {Hint: "Bismarck", Zoner: "north dakota"},
    {Hint: "Columbus", Zoner: "ohio"},
    {Hint: "Oklahoma City", Zoner: "oklahoma"},
    {Hint: "Salem", Zoner: "oregon"},
    {Hint: "Harrisburg", Zoner: "pennsylvania"},
    {Hint: "Providence", Zoner: "rhode island"},
    {Hint: "Columbia", Zoner: "south carolina"},
    {Hint: "Pierre", Zoner: "south dakota"},
    {Hint: "Nashville", Zoner: "tennessee"},
    {Hint: "Austin", Zoner: "texas"},
    {Hint: "Salt Lake City", Zoner: "utah"},
    {Hint: "Montpelier", Zoner: "vermont"},
    {Hint: "Richmond", Zoner: "virginia"},
    {Hint: "Olympia", Zoner: "washington"},
    {Hint: "Charleston", Zoner: "west virginia"},
    {Hint: "Madison", Zoner: "wisconsin"},
    {Hint: "Cheyenne", Zoner: "wyoming"},

]

