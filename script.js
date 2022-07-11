// Window load event:

window.addEventListener("load", async function() {

    // calling myFetch function from scripthelper.js:   
    let listedPlanetsResponse = await myFetch();    
    let pickedPlanet = pickPlanet(listedPlanetsResponse);
    addDestinationInfo(document,pickedPlanet.name, pickedPlanet.diameter, pickedPlanet.star, pickedPlanet.distance, pickedPlanet.moons, pickedPlanet.image)

   //Calling form submission function from scripthelper.js:
   let form = document.querySelector("form");   
   form.addEventListener("submit", function(event) {
      event.preventDefault();
      let pilot = document.getElementsByName("pilotName")[0].value;
      let copilot = document.getElementsByName("copilotName")[0].value;
      let fuelLevel = document.getElementsByName("fuelLevel")[0].value;
      let cargoMass = document.getElementsByName("cargoMass")[0].value; 
      let list = document.getElementById("faultyItems");
     
      formSubmission(document, list, pilot, copilot, fuelLevel, cargoMass);
      
   });
   
});