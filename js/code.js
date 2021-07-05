var cycle = null;
var started = false;

var letters = [ "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z" ];
var numbers = [ "1", "2", "3", "4", "5", "6", "7", "8", "9", "0" ];
var colors =  [ "red", "yellow", "green", "blue" ];

// Get the modal
var modal = new bootstrap.Modal(document.getElementById('modal'), {});
var modalEle = document.getElementById('modal');
var modalBtn = document.querySelector('#modal .btn-close');
var slider = document.querySelector("#slider");
var sliderInner = document.querySelector("#slider .carousel-inner");
modalBtn.onclick = forceStop;

function getSlides(amount = 0, array = []) {
  if(array === [] || amount <= 0) return [];

  var chosen = [];
  for (var i = 0; i < amount; i++) {
    var randomIndex = Math.floor(Math.random() * array.length);
    chosen.push(array[randomIndex]);
  }
  return chosen;
}

function createSlides(slides = [], slideTime = 3000) {
  var carousel = bootstrap.Carousel.getInstance(slider);
  slides.forEach(function(item, index) {
    var isColor = colors.indexOf(item) !== -1;
    var isFirst = index === 0;
    var slideHTML = "<div data-bs-interval='" + slideTime + "' class='carousel-item " + (isFirst ? "active" : "") + "'><div class='slide " + (isColor ? "is-color is-" + item : "")  + "'>" + item + "</div></div>";
    sliderInner.insertAdjacentHTML("beforeend", slideHTML);
  });
  carousel.to(0);
}

function forceStop() {
  clearTimeout(cycle);
  document.getElementById('modal').style.display = "none";
  sliderInner.innerHTML = "";
}

function start() {
  // Config Values
  var showColors = document.querySelector("#show-colors").getAttribute('aria-expanded') === 'true';
  var showNumbers = document.querySelector("#show-numbers").checked;
  var showLetters = document.querySelector("#show-letters").checked;

  // Time values
  var amount = document.querySelector("#amount").value;
  var stimulus = document.querySelector("#stimulus").value * 1000;
  var interval = document.querySelector("#interval").value;
  var totalAmount = amount * stimulus;

  if(showColors || showNumbers || showLetters) {
    // Starting
    var randomStack = [];
    if(showColors) {
      document.querySelectorAll(".btn-check.color").forEach(function(ele){
        if(ele.checked) randomStack.push(ele.value);
      })
    }
    if(showNumbers) randomStack = randomStack.concat(numbers);
    if(showLetters) randomStack = randomStack.concat(letters);

    var selectedSlides = getSlides(amount, randomStack);
    createSlides(selectedSlides, stimulus);
    modalEle.style.display = "block";

    cycle = setTimeout(function() {
      forceStop();
    }, totalAmount);
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
