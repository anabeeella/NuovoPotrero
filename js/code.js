var cycle;

// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal
btn.onclick = function() {
  modal.style.display = "block";
}





// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}



// Get the button that opens manual configuration
let config = document.getElementById("config-manual");

// Get the button that closes manual configuration
let hideConfig = document.getElementById("config-auto");

// Get the manual configuration content
let setConfig = document.getElementById("config-manual-detail");

let setColors = document.getElementById("show-colors");
let selectColors = document.getElementById("select-colors")

// When the user clicks on "Manual" open content
config.onclick = function() {
  if (config.style.display = "none") {
    setConfig.style.display = "block"
  }
}

// When the user clicks on "Automática", close it
hideConfig.onclick = function() {
  if (config.style.display = "block") {
    setConfig.style.display = "none"
  }
}

setColors.onclick = function() {
  if (selectColors.style.display = "none") {
    selectColors.style.display = "block"
  }
}
