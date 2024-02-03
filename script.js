var xp;
var xpNeededForLevelUp = 100;
var maxLevel = 9000; // Set the maximum level
var level;

var automationInterval;
var flipsRemaining;

// Load data from local storage or initialize if not present
function initializeGameData() {
  xp = parseInt(localStorage.getItem('xp')) || 0;
  level = parseInt(localStorage.getItem('level')) || 1;
}

function saveGameData() {
  localStorage.setItem('xp', xp);
  localStorage.setItem('level', level);
}

function automateCoinFlip() {
  // Set the number of flips to be automated
  flipsRemaining = 100000; // Adjust the number of flips as needed

  // Start the automation interval
  automationInterval = setInterval(function () {
    if (flipsRemaining > 0) {
      flipCoin();
      flipsRemaining--;
    }
  }, 1500); // Adjust the interval between flips as needed
}

function showNotification(message, duration = 2000) {
  var notification = document.createElement("div");
  notification.className = "notification";
  notification.textContent = message;
  document.body.appendChild(notification);

  setTimeout(function () {
    notification.remove();
  }, duration);
}

function flipCoin() {
  var coin = document.getElementById("coin");
  var headsCountElement = document.getElementById("heads-count");
  var tailsCountElement = document.getElementById("tails-count");
  var result = Math.random() < 0.5 ? "Heads" : "Tails";

  // Add a class based on the result to animate the coin flip
  coin.classList.remove("heads", "tails");
  setTimeout(function () {
    coin.classList.add(result.toLowerCase());
  }, 100);

  // Display the result
  setTimeout(function () {
    showNotification("Result: " + result, 3000);

    // Update the counter
    if (result === "Heads") {
      headsCountElement.textContent = parseInt(headsCountElement.textContent) + 1;
    } else {
      tailsCountElement.textContent = parseInt(tailsCountElement.textContent) + 1;
    }

    // Update XP and check for level up
    xp += 10; // Adjust the XP gain as needed
    updateXPProgress();
    saveGameData(); // Save game data to local storage

  }, 1000);
}

function updateXPProgress() {
  if (level < maxLevel) { // Check if the player has not reached the maximum level
    var xpProgress = (xp / xpNeededForLevelUp) * 100;
    document.getElementById('xp-progress').style.width = xpProgress + '%';

    if (xp >= xpNeededForLevelUp) {
      levelUp();
    }
  } else {
    showNotification("Max Level Reached!", 3000);
  }
}

function levelUp() {
  if (level < maxLevel) { // Check if the player has not reached the maximum level
    level++;
    xp = 0;

    // Adjust the XP needed for the next level as needed
    xpNeededForLevelUp *= 2;

    showNotification("Level Up! You are now Level " + level, 3000);

    document.getElementById('level').textContent = level;
    updateXPProgress();
  } else {
    showNotification("Max Level Reached!", 3000);
  }
}

function resetCounter() {
  document.getElementById("heads-count").textContent = "0";
  document.getElementById("tails-count").textContent = "0";

  // Reset XP and level
  xp = 0;
  level = 1;
  xpNeededForLevelUp = 100;
  document.getElementById('level').textContent = level;
  updateXPProgress();
  saveGameData(); // Save game data to local storage
}

// Initialize game data and start automation when the script is loaded
initializeGameData();
automateCoinFlip();

