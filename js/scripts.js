var numbers = document.querySelectorAll(".number");
var result = document.getElementById("result");
var instantmathmods = document.querySelectorAll(".instantmathmod");
var aboveresult = document.getElementById("aboveresult");
var clear = document.getElementById("clear");
var operators = document.querySelectorAll(".operator");
var equals = document.querySelector(".equals");
var hist = document.getElementById("history");
var pib = document.querySelector(".pibutton");
var reverseb = document.querySelector(".reversebutton");
var negator = document.querySelector(".negator");

var curroperator = "";
var currfunction = "";
result.innerHTML = "0";
hist.innerHTML = "";
var lastbuttonpushed = "";
var buffer = "";
updateaboveresult();



//clear the calculator
clear.onclick = function() { 
	clearabovebox();
	result.innerHTML = 0;
	updateaboveresult();
	lastbuttonpushed = "clear";
};

//equals button pressed
equals.onclick = function() {

	updateaboveresult();

	if (lastbuttonpushed == "number" || lastbuttonpushed == "equals" || lastbuttonpushed == "") {
			aboveresult.innerHTML += result.innerHTML;
	}

	else {
		aboveresult.innerHTML = currfunction;
	}
	
	hist.innerHTML = aboveresult.innerHTML + "<br>" + hist.innerHTML;
	calculateit(aboveresult.innerHTML);
	aboveresult.innerHTML = "";
	clearabovebox();
	updateaboveresult();
	
	lastbuttonpushed = "equals";
	};

//any number button is pressed
for (var i=0; i < numbers.length; i++) {
	
	numbers[i].onclick = function() {

		if (lastbuttonpushed == "operator") {
			result.innerHTML = this.innerHTML; 
		}

		else if (lastbuttonpushed == "number") {
			result.innerHTML += this.innerHTML; 
		}

		else {
			clearabovebox();
			updateaboveresult();
			result.innerHTML = this.innerHTML;
		}

		lastbuttonpushed = "number";
		}

};

// +, =, *, /, % pressed
for (var i=0; i < operators.length; i++) {
	operators[i].onclick = function() { 
		
	if (lastbuttonpushed != "operator") {	

		if (lastbuttonpushed == "number" || lastbuttonpushed == "") {
			if (currfunction != "") {
			currfunction += curroperator + result.innerHTML;
			calculateit(currfunction); }
			else {

				currfunction = result.innerHTML;

			}
		}

		else if (lastbuttonpushed == "instantmathmod") {
			currfunction+= curroperator + buffer;
			buffer = "";
			updateaboveresult();
			calculateit(currfunction);

		}

		else if (lastbuttonpushed == "negator" || lastbuttonpushed == "pib") {
			if (currfunction != "") {
			currfunction += curroperator + "("+ result.innerHTML + ")";
			calculateit(currfunction); }
			else {

				currfunction = result.innerHTML;

			}
		}

		else {
			currfunction+= result.innerHTML;
		}
}
	if (curroperator != this.innerHTML) {
			curroperator = this.innerHTML;
			 }
	updateaboveresult();
	lastbuttonpushed = "operator";
		}
	};

//sin, cos, ln, log, etc pressed
for (var i=0; i < instantmathmods.length; i++) {

	instantmathmods[i].onclick = function() {

		if ((this.innerHTML) == "X^2") {

			if (buffer == "") {
				buffer = "pow(" + result.innerHTML + ", 2)"; 
			}
			else {
				buffer = "pow(" + buffer + ", 2)"; 
			}
		}

		else if ((this.innerHTML) == "1/X") {

			if (buffer == "") {
				buffer = "(1/" + result.innerHTML + ")"; 
			}
			else {
				buffer = "(1/" + buffer + ")"; 
			}
		}

		else {
			if (buffer == "") {
				buffer = this.innerHTML + "(" + result.innerHTML  + ")"; 
			}
			else {
				buffer = this.innerHTML + "(" + buffer  + ")";
			}
		}
		calculateit(buffer);
		updateaboveresult();


		lastbuttonpushed = "instantmathmod";}

	

};

//pi button special case
pib.onclick = function() {
	result.innerHTML = Math.PI;
	lastbuttonpushed = "pib";
}

//+- button special case
negator.onclick = function() {
	result.innerHTML = result.innerHTML * -1;
	lastbuttonpushed = "negator";
}

//update box above main result
function updateaboveresult() {
aboveresult.innerHTML = currfunction + curroperator + buffer;
};

//calculate result box
function calculateit(thing) {
	temp = thing.replace(/sqrt/g, "Math.sqrt").replace(/sin/g, "Math.sin").replace(/cos/g, "Math.cos").replace(/tan/g, "Math.tan").replace(/log/g, "(1/Math.log(10))*Math.log").replace(/ln/g, "Math.log").replace(/pow/g, "Math.pow");
	result.innerHTML = eval(temp);
};

//clear the box above main result
function clearabovebox() {
	curroperator = "";
	currfunction = "";
	buffer = "";
};