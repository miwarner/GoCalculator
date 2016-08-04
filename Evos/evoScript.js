function calculateEvolves(candyHold,candyReq) {
              
              var name = $('#ais')

              //Calculates how many candy will be unused during first round of evolutions
              var candyRemainder = candyHold % candyReq;
              
              //Calculates how many evolutions can be done with initial settings
              var evolutions = (candyHold-candyRemainder)/candyReq;

              if ($('#transfer').is(':checked')){
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

                     if ($('#transfer').is(':checked')){
                     var transferCandy = evolutions;
                     }
                     else{
                            transferCandy=0;
                     }
                     
                     candyPlus = candyRemainder + evolutions + transferCandy;
                     
                     totalEvolutions = totalEvolutions + evolutions;
                     
              }
              var eggStatus = "NO"
              var evolutionXP = totalEvolutions * 500;
              if ($('#luckyEgg').is(':checked')){
                      evolutionXP = evolutionXP*2
                      eggStatus = $('#luckyEgg').val()
              }
              var totalXP = evolutionXP
              var maxEvolutions = totalEvolutions;
              if ($('#totalXp').html() != ""){
                     var pastXP = parseInt($('#totalXp').html());
                     totalXP=  pastXP + evolutionXP;
              }

              $('#totalXp').html(totalXP);

              
              $("#results").append("<tr> <td>" +maxEvolutions+"</td><td class='evoXpResults'>"+evolutionXP+"</td><td>"+candyRemainder+"</td><td>"+eggStatus+"</td></tr>");
       }
