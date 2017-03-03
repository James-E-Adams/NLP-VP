var speak = require("speakeasy-nlp");
var nlp = require ("compromise");
const readline = require('readline'); 
// Analyze sentences at a basic level
// ------------------------------------- //
// console.log(speak.classify("Potato"))             //=> { action: "what", owner: "listener", subject: "name" }
// console.log(speak.classify("Yesterday's closing price for iress."))   //=> { action: "what", owner: "it", subject: "time" }


const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const chart_keywords = ["chart","graph","history","map"]
const time_keywords = ["second", "minute", "day", "hour","week","month","seconds", "minutes", "days", "hours","weeks","months"];

var input = "...";
rl.question("Gimme some input? \n", (answer) => {
	// input = answer;
	console.log("cheers, analyzing now.");
	var analysis = speak.classify(answer);
	let tokens = analysis.tokens;
	var parsed = {
		subject: analysis.subject
	}
	//Work out if it's a graph type.
	//Possibility for extensions: check all caps combos.
	for (var i=0; i<chart_keywords.length; i++) {
		if (tokens.includes(chart_keywords[i])) {
			parsed.graph = true;
		}
	}

	if (parsed.graph) {
		//Try extract number and time unit now:
		//Damn son this is hard without compromise's documentation:

		let a = nlp(answer);

		parsed.time_number = a.values().toNumber().out();

		//Check for seconds,minutes,days, weeks, months,
		for (var i=0; i<time_keywords.length; i++) {
			if (tokens.includes(time_keywords[i])) {
				let unit = time_keywords[i];
				if (unit.slice(-1) === "s") {
					parsed.time_units = unit.slice(0,-1);
				}
				else {
					parsed.time_units = unit;
				}
			}
		}
	}
	console.log(parsed);
	rl.close();
});




//To do:

//Match company name to code (done in search all in vp)

//Mock widget (Probably quote widget is easiest as it as an input)

//Come up with some sentence examples.

//Eg: "News stories for 'code'"


//Game plan: Think of 5 or so different sentence structures.
//Try to classify
//5 chains of logic trying to match it to a vp command.

//Let's start with bringig

