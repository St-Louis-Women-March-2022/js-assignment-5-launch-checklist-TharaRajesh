// scriptHelper functions :
require('isomorphic-fetch');

// addDestnationInfo function shows the HTML formatting for our mission target details
function addDestinationInfo(document, name, diameter, star, distance, moons, imageUrl) {
  
  let destination = document.getElementById("missionTarget");
      
      destination.innerHTML = `
                 <h2>Mission Destination</h2>
                 <ol>
                        <li>Name:  ${name}</li>
                        <li>Diameter: ${diameter}</li>
                        <li>Star: ${star}</li>
                        <li>Distance from Earth: ${distance}</li>
                        <li>Number of Moons: ${moons}</li>
                 </ol>
                     <img src=${imageUrl}>
                `;
      };


// validateInput Function checks each input values entered by user and alert the users to correct it.
function validateInput(inputValues) {
    let pilotName  = inputValues.pilot;
    let copilotName = inputValues.copilot;
    let fuelLevel = inputValues.fuelLevel;
    let cargoMass = inputValues.cargoMass;

    if(!isNaN(pilotName) ||!isNaN(copilotName) || isNaN(fuelLevel) || isNaN(cargoMass)){
       alert("Make sure to enter valid information for each field!");
       return false;
    }
    if(pilotName === "" || copilotName === "" ||  fuelLevel === "" || cargoMass === ""  ){
       alert("All Fields are required");
       return false;
    }
    
    return true;  
   
}

// formSubmission function validate the Input data by calling validateInput function
// and display the Shuttle status.
function formSubmission(document, list, pilot, copilot, fuelLevel, cargoMass) {
 
    let inputValues = {
       "pilot": pilot,
       "copilot": copilot,
       "fuelLevel": fuelLevel,
       "cargoMass": cargoMass
    }
 
    if(validateInput(inputValues)){
        
        // hidden faultyItems changed to visible 
        list.style.visibility = 'visible';
        let overallStatus = true;
        let fuelStatus = "Fuel level high enough for launch";
        let cargoStatus = "Cargo mass low enough for launch";
        

        if(fuelLevel < 10000){
            fuelStatus = "There is not enough fuel for the journey";
            overallStatus = false;
        }
        
        if(cargoMass > 10000){
            cargoStatus = "There is too much mass for the shuttle to take off";
            overallStatus = false;
        }
        list.innerHTML = `        
            <ol>
                <li id="pilotStatus" data-testid="pilotStatus">Pilot <b>${pilot} </b> Ready </li>
                <li id="copilotStatus" data-testid="copilotStatus">Co-Pilot  ${copilot} Ready</li>
                <li id="fuelStatus" data-testid="fuelStatus"> Fuel Status: ${fuelStatus}</li>
                <li id="cargoStatus" data-testid="cargoStatus"> Cargo Status: ${cargoStatus}</li>
            </ol>
        `;
        
        if(overallStatus){
            document.getElementById("launchStatus").style.color="Green";
            document.getElementById("launchStatus").innerHTML = "Shuttle is ready for launch";
        }else{
            document.getElementById("launchStatus").style.color="red";
            document.getElementById("launchStatus").innerHTML = "Shuttle not ready for launch";
        }

    }
        
  }

//myFetch function fetches the some planetary data from URL
async function myFetch() {
    return await fetch("https://handlers.education.launchcode.org/static/planets.json");
}

// pickPlanet Functions Using Math.random(), pick the one planet from the list randomly.
function pickPlanet(planets) {  
    return  planets[Math.floor(Math.random() * planets.length)];
}

module.exports.addDestinationInfo = addDestinationInfo;
module.exports.validateInput = validateInput;
module.exports.formSubmission = formSubmission;
module.exports.pickPlanet = pickPlanet; 
module.exports.myFetch = myFetch;
module.exports.myFetch1 = myFetch1;
