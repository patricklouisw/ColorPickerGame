// Initialize Variable
let colors;
let solutionColor;
let squares = $(".square");
let numSquares = 3;

init();

// ALL FUNCTIONS

// Initialize
function init(){
	setUpButton();
	startGame(numSquares);
}

// Set Up Button
function setUpButton(){
	$("#newGame").on("click", function(){
		startGame(numSquares);
	});

	$("#easyBtn").on("click", function(){
		numSquares = 3;
		$(".mode").removeClass("selected");
		$(this).addClass("selected");
		startGame(numSquares);
	});

	$("#medBtn").on("click", function(){
		numSquares = 6;
		$(".mode").removeClass("selected");
		$(this).addClass("selected");
		startGame(numSquares);
	});

	$("#hardBtn").on("click", function(){
		numSquares = 9;
		$(".mode").removeClass("selected");
		$(this).addClass("selected");
		startGame(numSquares);
	});
}

// Start Game
function startGame(numSquares){

	// Initialize variables
	colors = generateRandomColors(numSquares);
	solutionColor = pickSolution();

	$("#newGame").text("New Game");
	$(".square").removeClass("wrong correct");
	$(".square").css("display", "inline");
	$("body").css({
				backgroundColor: "#495159"
			});

	//Question header
	$("#question").text(solutionColor);

	//Get all the squares to change colors
	for(let i = 0; i < squares.length; i++){
		if(colors[i]){
			$(squares[i]).css("backgroundColor", colors[i]);
		} else {
			$(squares[i]).css("display", "none");
		}
	}

	// Click event Listener
	$(".square").on("click", function(){
		let answer = $(this).css("backgroundColor");
		if(answer === solutionColor){
			$(".square").addClass("correct").removeClass("wrong");;
			$(".square").css("backgroundColor",solutionColor);
			$("#newGame").text("Play Again?");
			$("body").css("backgroundColor", convertToRGBA(solutionColor));
		} else{
			$(this).addClass("wrong");
		}
	});
}

// Pick Random Color
function pickSolution(){
	let rand = Math.floor(Math.random()*colors.length);
	return colors[rand];
}

// Generate random colors
function generateRandomColors(num){
	let arr = [];
	for(let i = 0; i < num; i++){
		arr.push(getRandomColor());
	}
	return arr;
}

function getRandomColor(){
	let red = Math.floor(Math.random() * 256);
	let green = Math.floor(Math.random() * 256);
	let blue = Math.floor(Math.random() * 256);
	return "rgb("+ red +", "+green+", "+blue+")";
}

// Convert RGB to RGBA
function convertToRGBA(rgbColor){
	let numStr = rgbColor.slice(4, rgbColor.length-1);
	return "rgba(" + numStr+", 0.25)";
}