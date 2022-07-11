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
      
// validateInput Function check input values entered by the user:
function validateInput(testinput){
    if(testinput === ""){
        return "Empty"
    }
    else if(isNaN(testinput)){
        return "Not a Number"
    }
    else{
        return "Is a Number"
    }
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
    if(validateInput(inputValues.pilot)=== "Is a Number" || validateInput(inputValues.pilot)=== "Empty"){
        alert("Pliot Name cannot be empty or number");
        return;
    }
    if(validateInput(inputValues.copilot)=== "Is a Number" || validateInput(inputValues.copilot)=== "Empty"){
        alert("Copilot Name cannot be empty or number");
        return;
    }
    if(validateInput(inputValues.fuelLevel)=== "Not a Number" || validateInput(inputValues.fuelLevel)=== "Empty"){
        alert("Fuel Level cannot be empty or string");
        return;
    }
    if(validateInput(inputValues.cargoMass)=== "Not a Number" || validateInput(inputValues.cargoMass)=== "Empty"){
        alert("Cargo Mass cannot be empty or string");
        return;
    }
    
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
            <li id="pilotStatus" data-testid="pilotStatus">Pilot <b>${pilot} is ready for launch</li>
            <li id="copilotStatus" data-testid="copilotStatus">Co-Pilot ${copilot} is ready for launch</li>
            <li id="fuelStatus" data-testid="fuelStatus">${fuelStatus}</li>
            <li id="cargoStatus" data-testid="cargoStatus">${cargoStatus}</li>
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
        
  

//myFetch function fetches the some planetary data from URL
async function myFetch() {   
    const response = await fetch("https://handlers.education.launchcode.org/static/planets.json");
    const result = await response.json();
    return result;
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