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

  return chosen;
}

function createSlides(slides, slideTime, isAuto, startPaused, hasDeadTime, stack) {
  slides = slides || [];
  isAuto = isAuto || false;
  slideTime = slideTime || 3000;
  startPaused = startPaused || false;
  hasDeadTime = hasDeadTime || 0;
  var totalAmount = slides.length * slideTime;
  var sliderId = "slider" + Math.floor(Math.random() * 20);
  var slidesHTML = '<div id="' +sliderId+ '" class="carousel slider" data-ride="carousel"><div class="carousel-inner">';
  for(var index = 0; index < slides.length; index++) {
    slidesHTML += makeSlide(slides[index], index === 0, index === slides.length, slideTime, hasDeadTime);
  }
  slidesHTML += "</div>";
  if(isAuto) slidesHTML += '<div class="slider-controller" onclick="nextRandomSlide(this)"></div>';
  slidesHTML += "</div>";
  if(startPaused) slidesHTML += '<button onclick="forceCycle(' + totalAmount + ', this);" class="btn btn-dark btn-start btn-large">▶</button>';
  modalBody.insertAdjacentHTML("beforeend", slidesHTML);

  $('#modal .carousel').carousel({
    // interval: slideTime,
    pause: isAuto || startPaused,
    wrap: false,
  }).data('stack', JSON.stringify(stack));
  if(startPaused) $('#modal .carousel').carousel('pause');
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
  var showColors = document.querySelector("#show-colors").getAttribute('aria-expanded') == 'true';
  var showNumbers = document.querySelector("#show-numbers").checked;
  var showLetters = document.querySelector("#show-letters").checked;

  console.log(showColors);

  // Time values
  var amount = isManual
    ? document.querySelector("#amount").value
    : 1;

  var stimulus = isManual
    ? document.querySelector("#stimulus").value * 1000
    : 0;

  var deadTime = isManual
    ? document.querySelector("#deadTime").value * 1000
    : 0;

  // Paused
  var paused = isManual
    ? document.querySelector("#paused").checked
    : false;

  var totalAmount = amount * stimulus + (deadTime * (amount - 1));

  if((showColors || showNumbers || showLetters) && !started) {
    // Starting
    var randomStack = [];

    // Colors
    if(showColors) {
      $(".btn-check.color").each(function() {
        if($(this).prop('checked')) randomStack.push($(this).val());
      })
    }

    if(showNumbers) randomStack = randomStack.concat(numbers);
    if(showLetters) randomStack = randomStack.concat(letters);

    createSlides(getSlides(amount, randomStack), stimulus, isAuto, paused, deadTime, randomStack);
    modalEle.style.display = "block";
    started = true;
    if(isManual && !paused) cycleTimeout(totalAmount);
  }
}

function makeSlide(item, isFirst, isLast, interval, hasDeadTime) {
  isFirst = isFirst || false;
  isLast = isLast || false;
  interval = interval || 0;
  hasDeadTime = hasDeadTime || 0;
  var color = colors.indexOf(item) !== -1 ? " is-color is-" + item : "";
  var active = isFirst ? " active" : "";
  var dataInterval = interval > 0 ? ' data-interval="' + interval + '"' : '';
  var slide = '<div class="carousel-item' + active + '"'+ dataInterval + '><div class="slide' + color  + '">' + item + '</div></div>';
  if(hasDeadTime > 0 && !isLast) slide += '<div class="carousel-item" data-interval="' + hasDeadTime + '"><div class="slide is-dead">intervalo</div></div>';

  return slide;
}

function nextRandomSlide(controller) {
  var carousel = $(controller.parentNode);
  var stack = JSON.parse(carousel.data('stack'));
  var randomIndex = Math.floor(Math.random() * stack.length);
  carousel
    .find('.carousel-inner')
    .append(makeSlide(stack[randomIndex]))
    .parent()
    .carousel('next')
    .find('.carousel-inner > :first-child')
    .remove();
}

function cycleTimeout(at) {
  cycle = setTimeout(function() {
    forceStop();
  }, at);
}

function cycleCarousel() {
  $('#modal .carousel').carousel('cycle');
}

function forceCycle(amount, ele) {
  $(ele).remove();
  cycleCarousel();
  cycleTimeout(amount);
}
