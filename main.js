var newGameBtn = document.getElementById("js-newGameButton");
newGameBtn.addEventListener("click", newGame);

var pickRock = document.getElementById("js-playerPick_rock");
var pickPaper = document.getElementById("js-playerPick_paper");
var pickScissors = document.getElementById("js-playerPick_scissors");
var pickLizard = document.getElementById("js-playerPick_lizard");
var pickSpock = document.getElementById("js-playerPick_spock");

pickRock.addEventListener("click", function(){
    playerPick("rock")
    });
pickPaper.addEventListener("click", function(){
    playerPick("paper")
    });
pickScissors.addEventListener("click", function(){
    playerPick("scissors")
    });
pickLizard.addEventListener("click", function(){
    playerPick("lizard")
    });
pickSpock.addEventListener("click", function(){
    playerPick("spock");
    });

var player = {
    name: "",
    score: 0,
    lives: 0
};

var computer = {
    score: 0,
    lives: 0
};

var newGameElem = document.getElementById("js-newGameElement");
var pickElem = document.getElementById("js-playerPickElement");
var resultsElem = document.getElementById("js-resultsTableElement");

var gameState;

function setGameElements(){
    switch(gameState){
        case "started":
            newGameElem.style.display = "none";
            pickElem.style.display = "block";
            resultsElem.style.display = "block";
        break;
        case "ended":
            newGameBtn.innerText = "Play again";
        case "notStarted":
        default: 
            newGameElem.style.display = "block";
            pickElem.style.display = "none";
            resultsElem.style.display = "none";        
    }
};

var playerPointsElem = document.getElementById("js-playerPoints");
var playerNameElem = document.getElementById("js-playerName");
var computerPointsElem = document.getElementById("js-computerPoints");
var computerName = document.getElementById("js-computerName")

function dice_odds(playerRes, computerRes){
    if (playerRes > computerRes) {
        return "Dice have been rolled!\nOdds are in your favour, you have " + playerRes + " lives, computer " + computerRes + "!"
    };
    return "Dice have been rolled!\nOdds are not in your favour, you have " + playerRes + " lives, computer " + computerRes + "!"
};

function updateHearts(playerLives, computerLives) {
    for (i = 0; i < playerLives; i++) {
        playerNameElem.innerHTML += '<i class="fa fa-heart" aria-hidden="true"></i>';
    };

    for (i = 0; i < computerLives; i++) {
        computerName.innerHTML += '<i class="fa fa-heart" aria-hidden="true"></i>';
    };
};

function newGame(){
    player.name = prompt("Please enter your name", "Name");
    player.lives = Math.floor(Math.random() * 10) + 1;
    computer.lives = Math.floor(Math.random() * 10) + 1;
    alert(dice_odds(player.lives, computer.lives));

    if (player.name) {
        player.score = computer.score = 0;
        gameState = "started";
        setGameElements();
        
        playerNameElem.innerHTML = player.name;
        updateHearts(player.lives, computer.lives);
        setGamePoints();
    }
};

function getComputerPick(){
    var possiblePicks = ["rock","paper","scissors","lizard","spock"];
    return possiblePicks[Math.floor(Math.random()*5)];
}

var playerPickElem = document.getElementById("js-playerPick");
var computerPickElem = document.getElementById("js-computerPick");
var playerResultElem = document.getElementById("js-playerResult");
var computerResultElem = document.getElementById("js-computerResult");

function playerPick(playerPick) {
    var computerPick = getComputerPick();

    playerPickElem.innerHTML = playerPick;
    computerPickElem.innerHTML = computerPick;

    checkRoundWinner(playerPick, computerPick);
    setGamePoints();
};

function checkRoundWinner(playerPick, computerPick){
    playerResultElem.innerHTML = computerResultElem.innerHTML = " ";
    var winnerIs= "player";

        if (playerPick === computerPick){
            winnerIs = "draw";    
        } else if (
            (computerPick === "scissors" && playerPick === "paper") ||
            (computerPick === "paper" && playerPick === "rock") ||
            (computerPick === "rock" && playerPick === "lizard") ||
            (computerPick === "lizard" && playerPick === "spock") ||
            (computerPick === "spock" && playerPick === "scissors") ||
            (computerPick === "scissors" && playerPick === "lizard") ||
            (computerPick === "lizard" && playerPick === "paper") ||
            (computerPick === "paper" && playerPick === "spock") ||
            (computerPick === "spock" && playerPick === "rock") ||
            (computerPick === "rock" && playerPick === "scissors")){
        
            winnerIs = "computer";
        };

        if (winnerIs === "player") {
            playerResultElem.innerHTML = "Win!";
            player.score ++;
            computer.lives --;

        } else if (winnerIs === "computer") {
            computerResultElem.innerHTML = "Win!";
            computer.score ++;
            player.lives --;
        };
};

function setGamePoints(){
    playerPointsElem.innerHTML = player.score;
    computerPointsElem.innerHTML = computer.score;
    playerNameElem.innerHTML = player.name + " ";
    computerName.innerHTML = "Computer ";
    updateHearts(player.lives, computer.lives);
    checkAndShowWinner();
};

function checkAndShowWinner(){
    console.log(player.score);
    console.log(computer.score);
    if (player.lives == 0  || computer.lives == 0) { 
        if (player.score > computer.score){
            alert(player.name + " survives and earns " + player.score + " points!");
            gameState = "ended";
            setGameElements();
        } else {
            alert("Computer survives and earns " + computer.score + " points!");
            gameState = "ended";
            setGameElements();
        };
    };
};
