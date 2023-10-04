const startBtn = document.querySelector('#startBtn');
const stopBtn = document.querySelector('#stopBtn');
const boxes = document.querySelectorAll('.box');
const scoreCard = document.querySelector('#score');
const closeBtn = document.querySelector('#closeBtn');
const modal = document.querySelector('#modalOverlay');
const modalScore = document.querySelector('#score1');
const msg = document.querySelector('.msg');
const clickSound = document.getElementById("clickSound");
const bgMusic = document.getElementById("bgMusic");
const gameOver = document.getElementById("gameOver");



// global variables
let score = 0;
let timer;
let pace = 2000;
let active = 0;
let rounds = 0;

const getRndInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const clickBox = (i) => {
  if (i !== active) {
    return stopGame()
  }

  rounds--

  score += 1;

  if (score <= 1){
    scoreCard.textContent = `Caught ${score} fish`;
    scoreCard.style.color = "tomato";
  } else if (score <= 20) {
    scoreCard.textContent = `Caught ${score} fishes`;
    scoreCard.style.color = "yellow";
  } else if (score <= 50) {
    scoreCard.textContent = `Caught ${score} fishes`;
    scoreCard.style.color = "lime";
  }
   else {
    scoreCard.textContent = `Caught ${score} fishes`;
    scoreCard.style.color = "skyblue";
  }

  clickSound.play();
}

boxes.forEach((box, i) => {
  box.addEventListener('click', () => clickBox(i))
})

// same functionality as forEach() but for...of instead
/* for (const [i, item] of boxes.entries()) {
  item.addEventListener('click', () => clickBox(i))
} */

const enableBoxes = () => {
  boxes.forEach(box => {
    box.style.pointerEvents = "auto";
  })
}

const startGame = () => {
    bgMusic.play()

    startBtn.style.display = "none";
    stopBtn.style.display = "block";

    console.log("game started");

    if (rounds >= 3) {
        return stopGame()
    }

    enableBoxes();
    const newActive = pickNew(active);

    boxes[newActive].classList.toggle('active');
    boxes[active].classList.remove('active');

    active = newActive;

    timer = setTimeout(startGame, pace);

    pace -= 20
    rounds++

    function pickNew(active) {
        const newActive = getRndInt(0, 3)
        if (newActive !== active) {
        return newActive
        }
        return pickNew(active)
    }
}

const stopGame = () => {
  /* console.log('Game Over!'); */
  clearTimeout(timer);
  
  modal.style.display = "flex";
  
  /* modalScore.textContent = `Your have caught ${score} fishe(s)!`; */
  
  /* VARIABLE MESSAGES BASED ON SCORE */
  if (score <= 1) {
    msg.textContent = `Oops! Better luck next time!!`;
    msg.style.color = "tomato";
  } else if (score < 20) {
    msg.textContent = `You have caught only ${score} fishes! \r\n Pay more attention!!`;
    msg.style.color = "yellow";
  } else if (score < 50){
    msg.textContent = `${score} fishes is fair enough! \r\n But you deserve more!!`;
    msg.style.color = "lime";
  } else {
    msg.textContent = `You have caught ${score} fishes! \r\n WOW!! That's Excellent!!!`;
    msg.style.color = "skyblue";
  }

/*   if (score < 10) {
    msg.textContent = "You need to practice more!"
  } else if (score < 50){
    msg.textContent = "Well done!"
  } else {
    msg.textContent = "Excellent!"
  } */

  /* resetGame(); */

  bgMusic.pause();
  gameOver.play()
}

const resetGame = () => {
    window.location.reload()
    modal.style.display = "none";
}


startBtn.addEventListener('click', startGame);
stopBtn.addEventListener('click', stopGame);
closeBtn.addEventListener('click', resetGame);

