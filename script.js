var xp = 0;
var xpNeededForLevelUp = 100;
var level = 1;

function flipCoin() {
  var coin = document.getElementById("coin");
  var historyList = document.getElementById("history-list");
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
    alert("Result: " + result);

    // Update the history log
    var listItem = document.createElement("li");
    listItem.textContent = result;
    historyList.appendChild(listItem);

    // Update the counter
    if (result === "Heads") {
      headsCountElement.textContent = parseInt(headsCountElement.textContent) + 1;
    } else {
      tailsCountElement.textContent = parseInt(tailsCountElement.textContent) + 1;
    }

    // Update XP and check for level up
    xp += 10; // Adjust the XP gain as needed
    updateXPProgress();

  }, 1000);
}

function updateXPProgress() {
  var xpProgress = (xp / xpNeededForLevelUp) * 100;
  document.getElementById('xp-progress').style.width = xpProgress + '%';

  if (xp >= xpNeededForLevelUp) {
    levelUp();
  }
}

function levelUp() {
  level++;
  xp = 0;
  xpNeededForLevelUp *= 2; // Adjust the XP needed for the next level as needed

  document.getElementById('level').textContent = level;
  updateXPProgress();
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
}

