function isTouching(a, b) {
   const aRect = a.getBoundingClientRect();
   const bRect = b.getBoundingClientRect();

   return !(
      aRect.top + aRect.height < bRect.top ||
      aRect.top > bRect.top + bRect.height ||
      aRect.left + aRect.width < bRect.left ||
      aRect.left > bRect.left + bRect.width
   );
}

const avatar = document.querySelector("#player");
const coin = document.querySelector("#coin");
const scoreTally = document.querySelector("#myScore");
const instructions = document.querySelector("#instruct");

// Place the coin in a random location on the screen
moveCoin();

// Initialise the score variable
let score = 0;

window.setTimeout(() => {
   instructions.style.borderColor = "red";
   instructions.style.transform = "scale(1.1, 1.1)";
}, 1000);
window.setTimeout(() => {
   instructions.style.borderColor = "black";
   instructions.style.transform = "scale(1, 1)";
}, 1700);

// We will move our avatar with the arrow keys.
// They can be pressed any time to we can attach the listener directly to the window
window.addEventListener("keydown", function (evt) {
   console.log(evt.key);
   if (evt.key === "ArrowDown") {
      const currentTop = getPosition(avatar.style.top);
      avatar.style.top = `${currentTop + 50}px`;
   } else if (evt.key === "ArrowUp") {
      const currentTop = getPosition(avatar.style.top);
      avatar.style.top = `${currentTop - 50}px`;
   } else if (evt.key === "ArrowRight") {
      const currentLeft = getPosition(avatar.style.left);
      avatar.style.left = `${currentLeft + 50}px`;
      avatar.style.transform = "scale(1,1)";
   } else if (evt.key === "ArrowLeft") {
      const currentLeft = getPosition(avatar.style.left);
      avatar.style.left = `${currentLeft - 50}px`;
      avatar.style.transform = "scale(-1,1)";
   }
   if (isTouching(avatar, coin)) {
      score += Math.floor(99 * Math.random());
      console.log(score);
      scoreTally.textContent = score;
      moveCoin();
   }
});

// Function to separate out the number value from the position string (eg "200px" => 200)
function getPosition(pos) {
   return pos ? parseInt(pos.slice(0, -2)) : 100;
}

// Function to generate a new position for the coin
function moveCoin() {
   const coinPosH = Math.floor(window.innerHeight * Math.random());
   const coinPosW = Math.floor(window.innerWidth * Math.random());
   coin.style.top = `${coinPosH}px`;
   coin.style.left = `${coinPosW}px`;
}
