var cycle = null;
var started = false;

var letters = [ "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z" ];
var numbers = [ "1", "2", "3", "4", "5", "6", "7", "8", "9", "0" ];
var colors =  [ "red", "yellow", "green", "blue", "purple", "orange" ];
var fullStack = letters.concat(numbers.concat(colors));

// Get the modal
var modalEle = document.getElementById('modal');
var modalBtn = document.querySelector('#modal .btn-close');
var modalBody = document.querySelector('#modalBody');
var tabs = document.querySelector("#tabs");
modalBtn.onclick = forceStop;

function getSlides(amount, array) {
  amount = amount || 0;
  array = array || 0;
  if(array === [] || amount <= 0) return [];

  var chosen = [];
  for (var i = 0; i < amount; i++) {
    var randomIndex;
    do {
      randomIndex = Math.floor(Math.random() * array.length);
    } while(chosen[chosen.length-1] == array[randomIndex]);

    chosen.push(array[randomIndex]);
  }
  console.log(chosen);
  return chosen;
}

function createSlides(slides, slideTime, isAuto) {
  slides = slides || [];
  isAuto = isAuto || false;
  slideTime = slideTime || 3000;
  var sliderId = "slider" + Math.floor(Math.random() * 20);
  var slidesHTML = '<div id="' +sliderId+ '" class="carousel slider" data-ride="carousel"><div class="carousel-inner">';
  slides.forEach(function(item, index) {
    slidesHTML += makeSlide(item, index === 0);
  });
  slidesHTML += "</div>";
  if(isAuto) slidesHTML += '<div class="slider-controller" onclick="nextRandomSlide(this)"></div>';
  slidesHTML += "</div>";
  modalBody.insertAdjacentHTML("beforeend", slidesHTML);

  $('#modal .carousel').carousel({
    interval: slideTime,
    pause: isAuto,
    wrap: false,
  });
}

function forceStop() {
  clearTimeout(cycle);
  started = false;
  document.getElementById('modal').style.display = "none";
  modalBody.innerHTML = "";
}

function start() {
  // Check Config
  var initType = tabs.querySelector('.active').value || "manual";
  var isManual = initType === "manual";
  var isAuto = initType === "auto";

  // Config Values
  var showColors = isManual
    ? document.querySelector("#show-colors").getAttribute('aria-expanded') === 'true'
    : true;

  var showNumbers =  isManual
    ? document.querySelector("#show-numbers").checked
    : true;

  var showLetters =  isManual
    ? document.querySelector("#show-letters").checked
    : true;

  // Time values
  var amount = isManual
    ? document.querySelector("#amount").value
    : 1;

  var stimulus = isManual
    ? document.querySelector("#stimulus").value * 1000
    : 0;

  var totalAmount = amount * stimulus;

  if((showColors || showNumbers || showLetters) && !started) {
    // Starting
    var randomStack = [];
    if(showColors && isManual) {
      document.querySelectorAll(".btn-check.color").forEach(function(ele){
        if(ele.checked) randomStack.push(ele.value);
      });
    } else if(isAuto) {
      randomStack = randomStack.concat(colors);
    }

    if(showNumbers) randomStack = randomStack.concat(numbers);
    if(showLetters) randomStack = randomStack.concat(letters);

    createSlides(getSlides(amount, randomStack), stimulus, isAuto);
    modalEle.style.display = "block";
    started = true;
    if(isManual) {
      cycle = setTimeout(function() {
        forceStop();
      }, totalAmount);
    }
  }
}

function makeSlide(item, isFirst) {
  isFirst = isFirst || false;
  var color = colors.indexOf(item) !== -1 ? " is-color is-" + item : "";
  var active = isFirst ? " active" : "";
  return "<div class='carousel-item" + active + "'><div class='slide" + color  + "'>" + item + "</div></div>"
}

function nextRandomSlide(controller) {
  var randomIndex = Math.floor(Math.random() * fullStack.length);
  var carousel = controller.parentNode;
  carousel.querySelector('.carousel-inner').insertAdjacentHTML('beforeend', makeSlide(fullStack[randomIndex]));
  $('#modal .carousel').carousel('next');
  carousel.querySelector('.carousel-inner > *').remove();
}
