const startBtn=document.querySelector('#startBtn');
const holes = document.querySelectorAll('.hole');
const scoreBoard = document.querySelector('.score');
const moles = document.querySelectorAll('.mole');
let lastHole;
let timeUp = false;
let score = 0;

//how long a mole stays visible
function randomTime(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

//which hole will the mole come
function randomHole(holes) {
  const idx = Math.floor(Math.random() * holes.length);
  const hole = holes[idx];
  if (hole === lastHole) {
    console.log('Fir se Wahi Hole');
    return randomHole(holes);
  }
  lastHole = hole;
  return hole;
}

//shows the mole by adding class for randomhole and time
function peep() {
  const time = randomTime(100, 1000);
  const hole = randomHole(holes);
  hole.classList.add('up');
  setTimeout(() => {
    hole.classList.remove('up');
    if (!timeUp) peep();
  }, time);
}

//starts 
function startGame() {
  scoreBoard.textContent = 0;
  timeUp = false;
  score = 0;
  peep();
  setTimeout(() => timeUp = true, 10000)
}

//mole is caught
function bonk(e) {
  if(!e.isTrusted) return;
  score++;
  this.parentNode.classList.remove('up');
  scoreBoard.textContent = score;
}

moles.forEach(mole => mole.addEventListener('click', bonk));
startBtn.addEventListener('click',startGame);
