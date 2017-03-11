
// 

$(document).ready( function () {
var cars = ["nissan skyline", "la ferrari", "tesla"];

function displayBtns() {
	// iterating through array to create and display buttons
	for(var i = 0; i < cars.length;i++){
		var carBtn = $("<button>");
			
		$(carBtn).html(cars[i]);
		$(carBtn).addClass("mycar");
		
			$("#buttonDisplay").append(carBtn);
	}
	
}// end of display Btns function

displayBtns();

$("#addCar").on("click", function (){
	event.preventDefault();
	// on click userInput will turn into button 

	$("#buttonDisplay").empty();
	var userInput = $("#userInput").val().trim();
	if(userInput === ""){
		alert("choose your favorite car");
		displayBtns();
	}
	else{
	cars.push(userInput);
	
	displayBtns();
    $("#carForm").children("#userInput").val("");
}


});// end of add user input function

// makes ajax call to the API and displays the gifs
$("body").on("click",'.mycar', function (){
	$("#carGifs").empty();
	var userSearch = $(this).text();
	var queryUrl = "https://api.giphy.com/v1/gifs/search?q="+ userSearch + "&rating&limit=10&api_key=dc6zaTOxFJmzC";
	

$.ajax({
	method: "GET",
	url: queryUrl
	})
.done(function (response){
	// creates gifs and ratings
	for(var i = 0; i < response.data.length;i++){
	var gifDiv = $("<div>");
	var rating= $("<p>").text("Rating: " + response.data[i].rating);
	var gifSrc = $("<img>").attr({
		"src": gifUrl,
		 "data-animate": gifUrl,
		 "data-still": stillImage,
		 "data-state": "still"
		});
	var gifUrl = response.data[i].images.fixed_height.url;
	var stillImage = response.data[i].images.fixed_height_still.url;
	
	$(gifSrc).addClass("carGif");
	$(gifDiv).prepend(gifSrc);
	$(gifDiv).append(rating);
	$(gifDiv).css({"float":"left","margin":"1em"})
	$("#carGifs").append(gifDiv);
	console.log(response.data[i].rating);

}

	
});// end of ajax call

});// end of search function

// checks state of  gif 
	$("body").on("click",".carGif", function(){
		var state = $(this).attr("data-state");
	if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
      	} 
	else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
      	}
		   
	
});// end of gif animate function



});// end of document ready function