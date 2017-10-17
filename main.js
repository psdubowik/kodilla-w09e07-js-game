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

player = {
    name: "",
    score: 0
},

computer = {
    score: 0
}

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

function newGame(){
    player.name = prompt("Please enter your name", "Name");
    if(player.name) {
        player.score = computer.score = 0;
        gameState = "started";
        setGameElements();
        
        playerNameElem.innerHTML = player.name;
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
    var winnerIs= "player"; //we assume we win

        if(playerPick == computerPick){
            winnerIs = "draw"; //remis      
        } else if (
            (computerPick =="scissors" && playerPick == "paper") ||
            (computerPick =="paper" && playerPick == "rock") ||
            (computerPick == "rock" && playerPick == "lizard") ||
            (computerPick == "lizard" && playerPick == "spock") ||
            (computerPick == "spock" && playerPick == "scissors") ||
            (computerPick == "scissors" && playerPick == "lizard") ||
            (computerPick == "lizard" && playerPick == "paper") ||
            (computerPick == "paper" && playerPick == "spock") ||
            (computerPick == "spock" && playerPick == "rock") ||
            (computerPick == "rock" && playerPick == "scissors")){
        
            winnerIs = "computer";
        }

        if(winnerIs == "player") {
            playerResultElem.innerHTML = "Win!";
            player.score++;
            
        } else if (winnerIs == "computer") {
            computerResultElem.innerHTML = "Win!";
            computer.score++;
        }
}

function setGamePoints(){
    playerPointsElem.innerHTML = player.score;
    computerPointsElem.innerHTML = computer.score;
    andTheWinnerIs();
}

function andTheWinnerIs(){
    console.log(player.score);
    console.log(computer.score);
    if(player.score >= 10){
        alert(player.name + " earns " + player.score + " points and wins!");
        gameState = "ended";
        setGameElements();
    }
    if(computer.score >= 10){
        alert("Computer earns " + computer.score + " points and wins!");
        gameState = "ended";
        setGameElements();
    }
}
