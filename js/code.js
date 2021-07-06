let cycle = null;
let started = false;

const letters = [ "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z" ];
const numbers = [ "1", "2", "3", "4", "5", "6", "7", "8", "9", "0" ];
const colors =  [ "red", "yellow", "green", "blue", "purple", "orange" ];

// Get the modal
const modal = new bootstrap.Modal(document.getElementById('modal'), {});
const modalEle = document.getElementById('modal');
const modalBtn = document.querySelector('#modal .btn-close');
const modalBody = document.querySelector('#modalBody');
const tabs = document.querySelector("#tabs");
modalBtn.onclick = forceStop;

function getSlides(amount = 0, array = []) {
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

function createSlides(slides = [], slideTime = 3000) {
  var sliderId = "slider" + Math.floor(Math.random() * 20);
  var slidesHTML = '<div id="' +sliderId+ '" class="carousel slider" data-bs-ride="carousel"><div class="carousel-inner">';
  slides.forEach(function(item, index) {
    var isColor = colors.indexOf(item) !== -1;
    var isFirst = index === 0;
    slidesHTML += "<div class='carousel-item " + (isFirst ? "active" : "") + "'><div class='slide " + (isColor ? "is-color is-" + item : "")  + "'>" + item + "</div></div>";
  });
  slidesHTML += "</div></div>";
  modalBody.insertAdjacentHTML("beforeend", slidesHTML);
  var carousel = bootstrap.Carousel.getOrCreateInstance(document.querySelector('#modal .carousel'), {
    interval: slideTime,
    pause: false,
    wrap: false,
  });
  carousel.to(0);
  carousel.cycle();
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

  // Config Values
  const showColors = initType === "manual"
    ? document.querySelector("#show-colors").getAttribute('aria-expanded') === 'true'
    : true;

  const showNumbers =  initType === "manual"
    ? document.querySelector("#show-numbers").checked
    : true;

  const showLetters =  initType === "manual"
    ? document.querySelector("#show-letters").checked
    : true;

  // Time values
  const amount = initType === "manual"
    ? document.querySelector("#amount").value
    : 15;

  const stimulus = initType === "manual"
    ? document.querySelector("#stimulus").value * 1000
    : 4 * 1000;

  var totalAmount = amount * stimulus;

  if((showColors || showNumbers || showLetters) && !started) {
    // Starting
    var randomStack = [];
    if(showColors && initType === "manual") {
      document.querySelectorAll(".btn-check.color").forEach(function(ele){
        if(ele.checked) randomStack.push(ele.value);
      });
    } else if(initType === "auto") {
      randomStack = randomStack.concat(colors);
    }

    if(showNumbers) randomStack = randomStack.concat(numbers);
    if(showLetters) randomStack = randomStack.concat(letters);

    createSlides(getSlides(amount, randomStack), stimulus);
    modalEle.style.display = "block";
    started = true;
    cycle = setTimeout(function() {
      forceStop();
    }, totalAmount);
  }
}
