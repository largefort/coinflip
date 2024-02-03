var headsCount = 0;
var tailsCount = 0;

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
      headsCount++;
      headsCountElement.textContent = headsCount;
    } else {
      tailsCount++;
      tailsCountElement.textContent = tailsCount;
    }
  }, 1000);
}

function resetCounter() {
  headsCount = 0;
  tailsCount = 0;
  document.getElementById("heads-count").textContent = headsCount;
  document.getElementById("tails-count").textContent = tailsCount;
}
