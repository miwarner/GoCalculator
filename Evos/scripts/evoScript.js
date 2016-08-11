function calculateEvolves(candyHold, candyReq, transfer, pokemonHeld) {

	var evolveInfo = [];

	// Checks for undefined held pokemon
	if (isNaN(pokemonHeld)) {

		evolveInfo = calculateEvolvesNoLimit(candyHold, candyReq, transfer)
	} 
	else {

		evolveInfo = calculateEvolvesWithLimit(candyHold, candyReq, transfer,
				pokemonHeld)
	}

	return evolveInfo;

}

function calculateEvolvesNoLimit(candyHold, candyReq, transfer) {
	// Calculates how many candy will be unused during first round of evolutions
	var candyRemainder = candyHold % candyReq;

	// Calculates how many evolutions can be done with initial settings
	var evolutions = (candyHold - candyRemainder) / candyReq;

	if (transfer == true) {
		var transferCandy = evolutions;
	} else {
		transferCandy = 0;
	}

	// Calculates how many candy will be left over after 1st pass of evolutions,
	// including candy gained
	var candyPlus = candyRemainder + evolutions + transferCandy;

	// Tracks total number of evolutions possible
	var totalEvolutions = evolutions;

	while (candyPlus != 0 && candyPlus >= candyReq) {

		candyRemainder = candyPlus % candyReq;

		evolutions = (candyPlus - candyRemainder) / candyReq;

		if (transfer == true) {
			var transferCandy = evolutions;
		} else {
			transferCandy = 0;
		}

		candyPlus = candyRemainder + evolutions + transferCandy;

		totalEvolutions = totalEvolutions + evolutions;

	}

	var evolveInfo = [];
	evolveInfo["totalEvolutions"] = totalEvolutions;
	evolveInfo["candyRemainder"] = candyRemainder;

	return evolveInfo;
}

function calculateEvolvesWithLimit(candyHold, candyReq, transfer, pokemonHeld) {

	var totalEvolutions = 0;
	var evolveInfo = [];

	while (totalEvolutions < pokemonHeld && candyHold >= candyReq) {
		totalEvolutions++;

		// Calculates new candyHold by reducing candyHold by num candy required
		// and then adding back candy gained by evolving
		candyHold = candyHold - candyReq + 1;

		// Takes into account extra candy gained by transfer, if selected on UI
		if (transfer == true) {
			candyHold++;
		}

	}

	evolveInfo["totalEvolutions"] = totalEvolutions;
	evolveInfo["candyRemainder"] = candyHold;

	return evolveInfo;
}
	  
function calculateXP(totalEvolutions,luckyEgg,newPokemon){
	//Calculate XP and Create Text for luckyEgg
	var eggStatus = "NO";
	var newPokeStatus = "NO";
    var evolutionXP = totalEvolutions * 500;
	
	if (newPokemon == true){
		evolutionXP = evolutionXP + 500;
		newPokeStatus = $('#newPokemon').val().toUpperCase();
	}
	
	if (luckyEgg == true){
		  evolutionXP = evolutionXP*2
		  eggStatus = $('#luckyEgg').val().toUpperCase();
	}
	
	
	var XPinfo = [];
	
	XPinfo["evolutionXP"] = evolutionXP;
	XPinfo["eggStatus"] = eggStatus;
	XPinfo["newPokeStatus"] = newPokeStatus;
	
	return XPinfo;
}

function calculateSeconds(totalEvolutions,transfer,newPokemon){
	//Calculate minutes to execute based on # of evos and whether its a new Pokedex entry
	
	var seconds = 0;
	
	//Assume 25 seconds for evo w/o transfer
	if (transfer != true){
		seconds = totalEvolutions * 25;
	}else{
	//Assume 30 seconds for evo w/ transfer
		seconds = totalEvolutions * 30;
	}

	//Assume 15 seconds for new Pokedex entry sequence
	if(newPokemon == true){
		seconds = seconds + 15;
	}
	
	return seconds;
}
	   
function setupGrind(){
	//Setup variables and prepare display
	
	var transfer = $('#transfer').is(':checked');	
	var luckyEgg = $('#luckyEgg').is(':checked');
	var newPokemon = $('#newPokemon').is(':checked');
	var pokemonName = $('#candiesNeeded option:selected').text();
	var candiesHeld = $('#candiesHeld').val();
	var candiesNeeded = $('#candiesNeeded').val();
	var pokemonHeld = parseInt($('#numPokemonHeld').val());
	var startingTotalXP = $('#totalXp').html();
	var startingTotalMinutes = $('#totalMin').html();
	var resultsAmount = Math.floor(Math.random() * 900) + 10000;
	resultsAmount=resultsAmount.toString();
	
	//run the fun!
	var evolveInfo = calculateEvolves(candiesHeld,candiesNeeded,transfer,pokemonHeld);
	var XPinfo = calculateXP(evolveInfo["totalEvolutions"],luckyEgg,newPokemon);
	var evoSeconds = calculateSeconds(evolveInfo["totalEvolutions"],transfer,newPokemon);
	
	//Set evolution specific variables
	var evolutionXP = XPinfo["evolutionXP"];
	var evoMinutes = parseInt(Math.ceil(evoSeconds/60));
	
	//Set-up total calculation
	var totalXP = evolutionXP;
	var totalMin = evoMinutes;
	//var totalTime = secondsToHms(evoSeconds);
	
	if (startingTotalXP != ""){
		 var pastXP = parseInt(startingTotalXP);
		 totalXP=  pastXP + totalXP;
	}
	
	if (startingTotalMinutes != ""){
		 var pastMin = parseInt(startingTotalMinutes);
		 totalMin =  pastMin + totalMin;
	}
	
	$('#totalXp').html(totalXP);
	$('#totalMin').html(totalMin);
         
	var onclickClassifier='removeRow("'+resultsAmount+'","'+totalXP+'","'+totalMin+'")';	 
	

		 
    $("#results").append("<tr id='"+resultsAmount+"'><td>" +pokemonName+"</td><td>" +evolveInfo["totalEvolutions"]+"</td><td class='evoXpResults'>"+evolutionXP+"</td><td>"+evolveInfo["candyRemainder"]+"</td><td class='evoMinResults'>"+evoMinutes+"</td><td>"+XPinfo["newPokeStatus"]+"</td><td>"+XPinfo["eggStatus"]+"</td><td><span onclick='"+onclickClassifier+"'class='glyphicon glyphicon-remove' aria-hidden='true' style='cursor:pointer;color:red'></span></td></tr>");
	
	$("form#evoPlanner")[0].reset();
	
}

function removeRow(row,XP,min){
 row = 	'#'+row;
 var evoSubtraction = parseInt($(row+" .evoXpResults").text())
 var minSubtraction = parseInt($(row+" .evoMinResults").text());
 var totalXP = XP - evoSubtraction;
 var totalMin = min - minSubtraction;
 
 $(row).remove();
 $('#totalXp').html(totalXP);
 $('#totalMin').html(totalMin);
	
}

function clearTable(){
	 $("#results").html("");
	 $('#totalXp').html("0");
	 $('#totalMin').html("0");
	
}

//function secondsToHms(d) {
//d = Number(d);

//var time = [];

//var time["h"] = parseInt(Math.floor(d / 3600));
//var time["m"] = parseInt(Math.floor(d % 3600 / 60));
//var time["s"] = parseInt(Math.floor(d % 3600 % 60));

//return time; 
//}

//((h > 0 ? h + ":" + (m < 10 ? "0" : "") : "") + m + ":" + (s < 10 ? "0" : "") + s)

//function hmsToSeconds(time){
	
//	var seconds = time["h"]*3600+time["m"]*60+time["s"];
	
//	return seconds;
//}
 