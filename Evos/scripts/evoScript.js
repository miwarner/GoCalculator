function calculateEvolves(candyHold,candyReq,transfer) {

              //Calculates how many candy will be unused during first round of evolutions
              var candyRemainder = candyHold % candyReq;
              
              //Calculates how many evolutions can be done with initial settings
              var evolutions = (candyHold-candyRemainder)/candyReq;

              if (transfer == true){
                     var transferCandy = evolutions;
              }
              else{
                     transferCandy=0;
              }
              
              //Calculates how many candy will be left over after 1st pass of evolutions, including candy gained
              var candyPlus = candyRemainder + evolutions + transferCandy;
              
              //Tracks total number of evolutions possible
              var totalEvolutions = evolutions;
              
              while(candyPlus != 0 && candyPlus >= candyReq){
                     candyRemainder = candyPlus % candyReq;
                     
                     evolutions = (candyPlus-candyRemainder)/candyReq;

                     if (transfer == true){
                     var transferCandy = evolutions;
                     }
                     else{
                            transferCandy=0;
                     }
                     
                     candyPlus = candyRemainder + evolutions + transferCandy;
                     
                     totalEvolutions = totalEvolutions + evolutions;
                     
              }
			  
			  var evolveInfo = [];
			  evolveInfo["totalEvolutions"] = totalEvolutions;
			  evolveInfo["candyRemainder"] = candyRemainder;
			  
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
	   
function setupGrind(){
	//Setup variables and prepare display
	
	var transfer = $('#transfer').is(':checked');	
	var luckyEgg = $('#luckyEgg').is(':checked');
	var newPokemon = $('#newPokemon').is(':checked');
	var candiesHeld = $('#candiesHeld').val();
	var candiesNeeded = $('#candiesNeeded').val();
	var startingTotalXP = $('#totalXp').html();
	var resultsAmount = Math.floor(Math.random() * 900) + 10000;
	resultsAmount=resultsAmount.toString();
	
	//run the fun!
	var evolveInfo = calculateEvolves(candiesHeld,candiesNeeded,transfer);
	var XPinfo = calculateXP(evolveInfo["totalEvolutions"],luckyEgg,newPokemon);
	
	var evolutionXP = XPinfo["evolutionXP"];
	var totalXP = evolutionXP;
	
	if (startingTotalXP != ""){
		 var pastXP = parseInt(startingTotalXP);
		 totalXP=  pastXP + totalXP;
	}
	
	$('#totalXp').html(totalXP);
         
	var onclickClassifier='removeRow("'+resultsAmount+'","'+totalXP+'")';	 
	

		 
    $("#results").append("<tr id='"+resultsAmount+"'><td>" +evolveInfo["totalEvolutions"]+"</td><td class='evoXpResults'>"+evolutionXP+"</td><td>"+evolveInfo["candyRemainder"]+"</td><td>"+XPinfo["newPokeStatus"]+"</td><td>"+XPinfo["eggStatus"]+"</td><td><span onclick='"+onclickClassifier+"'class='glyphicon glyphicon-remove' aria-hidden='true' style='cursor:pointer;color:red'></span></td></tr>");
	
	$("form#evoPlanner")[0].reset();
	
}
function removeRow(row,XP){
 row = 	'#'+row;
 var evoSubtraction = parseInt($(row+" .evoXpResults").text());
 var totalXP = XP - evoSubtraction;
 
 $(row).remove();
 $('#totalXp').html(totalXP);
 
	
}
function clearTable(){
	 $("#results").html("");
	 $('#totalXp').html("0");
	
}
