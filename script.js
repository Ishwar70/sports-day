const logDiv = document.getElementById("log");
const startBtn = document.getElementById("startBtn");

// Score object
let score = {
  red: 0,
  blue: 0,
  green: 0,
  yellow: 0
};

// Helper function to log messages
function log(message) {
  console.log(message);
  logDiv.innerText += message + "\n";
  logDiv.scrollTop = logDiv.scrollHeight; // auto scroll
}

// Opening Ceremony
function OpeningCeremony(callback) {
  log("🏁 Opening Ceremony Started...");
  log("Initializing scores...");
  log(JSON.stringify(score));
  setTimeout(() => {
    log("🎉 Let the games begin!");
    if (callback) callback(score);
  }, 1000);
}

// 100M Race
function Race100M(score, callback) {
  log("🏃 100M Race is starting...");
  setTimeout(() => {
    const times = {
      red: Math.floor(Math.random() * 10 + 10),
      blue: Math.floor(Math.random() * 10 + 10),
      green: Math.floor(Math.random() * 10 + 10),
      yellow: Math.floor(Math.random() * 10 + 10)
    };
    log("⏱ Race times: " + JSON.stringify(times));

    const sortedColors = Object.entries(times)
      .sort((a, b) => a[1] - b[1])
      .map(entry => entry[0]);

    score[sortedColors[0]] += 50;
    score[sortedColors[1]] += 25;

    log("🏆 Updated Scores after 100M Race: " + JSON.stringify(score));

    if (callback) callback(score);
  }, 3000);
}

// Long Jump
function LongJump(score, callback) {
  log("🏃‍♂️ Long Jump is starting...");
  setTimeout(() => {
    const colors = Object.keys(score);
    const winner = colors[Math.floor(Math.random() * colors.length)];
    score[winner] += 150;
    log(`🥇 Long Jump winner: ${winner}`);
    log("🏆 Updated Scores after Long Jump: " + JSON.stringify(score));
    if (callback) callback(score);
  }, 2000);
}

// High Jump
function HighJump(score, callback) {
  log("🤸 High Jump is starting...");
  setTimeout(() => {
    let winner = prompt(
      "Enter the color of the player who jumped highest (red, blue, green, yellow):"
    );
    if (winner && score.hasOwnProperty(winner.toLowerCase())) {
      score[winner.toLowerCase()] += 100;
      log(`🥇 High Jump winner: ${winner}`);
    } else {
      log("No valid input provided. No points awarded.");
    }
    log("🏆 Updated Scores after High Jump: " + JSON.stringify(score));
    if (callback) callback(score);
  }, 1000);
}

// Award Ceremony
function AwardCeremony(score) {
  log("🎉 Award Ceremony is starting...");
  const sortedScores = Object.entries(score)
    .sort((a, b) => b[1] - a[1]);
  log("🏆 Final Scores:");
  sortedScores.forEach(([color, points], index) => {
    log(`${index + 1} place: ${color} with ${points} points`);
  });
  log(`🎊 Congratulations to ${sortedScores[0][0]}!`);
}

// Start the Sports Day
startBtn.onclick = () => {
  score = { red: 0, blue: 0, green: 0, yellow: 0 }; // reset
  logDiv.innerText = ""; // clear previous logs
  OpeningCeremony((score) => {
    Race100M(score, (score) => {
      LongJump(score, (score) => {
        HighJump(score, (score) => {
          AwardCeremony(score);
        });
      });
    });
  });
};
