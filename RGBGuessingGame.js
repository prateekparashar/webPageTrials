// author : Prateek Parashar
// Simple game for guessing RGB colours
// Made during the Web Developement Bootcamp Cource is udemy

// Reading all relevent elements
var squares = document.querySelectorAll(".square");
var picked = document.querySelector(".picked")
var message = document.getElementById("message");
var h1 = document.querySelector("h1");
var modebtn = document.querySelectorAll(".modebtn");
var resetButton = document.querySelector("#reset");
var cor = document.querySelector("#correct");
var wro = document.querySelector("#wrong");

// Declaring Variable
var arr = [];
var pick;
var arrlength = 6;

// Calling main function
init();


// ******* Functions *******
// Declaring all functions

// init
function init()
{
	reset();
	resetButton.addEventListener("click",reset);
	for (var i = 0; i < modebtn.length; i++)
	{ modebtn[i].addEventListener("click",button); }
}

// Generate random numbers
function rnm(num) { return Math.floor(Math.random()*num) };

// Function to play audio
function play(audio) { audio.play(); }

// Populate array with random colours
function get_random_color(num) 
{
	arr = []
	for(var i = 0; i< num; i++)
	{ arr[i] = "rgb(" + rnm(256) + ", " + rnm(256) + ", " + rnm(256) + ")"; }
}

// Reset function to start/restart the game
function reset()
{
	get_random_color(arrlength);
	pick = rnm(arrlength);
	h1.style.background = 'steelblue';
	message.textContent = "";
	resetButton.textContent = "New Colours";
	picked.textContent = arr[pick];

	for(var i = 0; i < squares.length; i++)
	{
		squares[i].style.display = "block";	
		arr[i] ? squares[i].style.backgroundColor = arr[i] : squares[i].style.display = "none";
		squares[i].addEventListener("click", squareCheck);
	}
}

// To compare the colour on the square with the picked colour
function squareCheck() 
{
	var colour = this.style.backgroundColor;
	colour == picked.textContent ? correct(colour) : wrong(this);
}

// Actions to perform when correct
function correct(color)
{
	h1.style.backgroundColor = color;
	message.textContent = "You Have Chosen Wisely!";
	play(cor);
	resetButton.textContent = "Play Again?";
	for(var i = 0; i < squares.length; i++)
	{ squares[i].style.backgroundColor = color; }
}

// Actions to perform when wrong
function wrong(value)
{
	value.style.backgroundColor = '#232323';
	message.textContent = "It's a Trap!";
	play(wro);
}

// Actions to perform when button is clicked
function button()
{
	for(var i = 0; i < modebtn.length; i++)
	{ modebtn[i].classList.remove("selected"); }
	this.classList.add("selected");
	this.textContent == "Easy" ? arrlength = 3 : arrlength = 6;
	reset();
}
