alert("First player to get to 5 points wins!")

let playerScoreValue = 0;
let pcScoreValue = 0;

const playerScore =document.querySelector(".player-score");
const pcScore =document.querySelector(".pc-score");
playerScore.textContent = playerScoreValue;
pcScore.textContent = pcScoreValue;

const playerChoice = document.querySelector(".player-choice");
const pcChoice = document.querySelector(".pc-choice");
const roundResult = document.querySelector(".round-result")
const choices = document.querySelectorAll('.choice');
choices.forEach((choice) => choice.addEventListener('click', playRound));
const result = document.querySelector('.result');
const newGame = document.querySelector('.new-game');
newGame.addEventListener('click', reset);

function getComputerChoice(){
    let selection = Math.floor(Math.random()*10) % 3;
    if(selection == 1) return 'rock';
    else if(selection == 2) return 'paper';
    return 'scissors';
}


function playRound(playerSelection) {    
    let ps = playerSelection.originalTarget.innerText.toLowerCase();
    console.log(ps);
    let computerSelection = getComputerChoice();
    console.log(computerSelection);
    playerChoice.textContent = ps;
    pcChoice.textContent = computerSelection;
    if(ps == 'rock'){     
        if(computerSelection == 'rock') roundResult.textContent = "Draw!";
        else if(computerSelection == 'paper'){
            roundResult.textContent = "You lose! Paper beats rock!";
            pcScoreValue++;
        }
        else {
            roundResult.textContent = "You win! Rock beats scissors!";
            playerScoreValue++;
        }
    }
    else if(ps == 'scissors'){
        if(computerSelection == 'scissors') roundResult.textContent = "Draw!";
        else if(computerSelection == 'rock'){
            roundResult.textContent = "You lose! Rock beats scissors!";
            pcScoreValue++;
        }
        else{
            roundResult.textContent = "You win! Scissors beat paper!";
            playerScoreValue++;
        }
    }
    else if(ps == 'paper'){
        if(computerSelection == 'paper') roundResult.textContent = "Draw!";
        else if(computerSelection == 'scissors') {
            roundResult.textContent = "You lose! Scissors beat paper!";
            pcScoreValue++;
        }
        else{
            roundResult.textContent = "You win! Paper beats rock!";
            playerScoreValue++;
        }
    }
    playerScore.textContent = playerScoreValue;
    pcScore.textContent = pcScoreValue;
    gameEnd();
}
   

function gameEnd(){
    if(playerScoreValue == 5 || pcScoreValue == 5){
        document.querySelectorAll('.choice').forEach(btn => btn.classList.add('hidden'));
        document.querySelector('.new-game').classList.remove('hidden');
        if(playerScoreValue == 5){
            result.textContent = "YOU WON!!!"
        }
        else{
            result.textContent = "...YOU LOST..."
        }
    }
}

function reset(){
    document.querySelectorAll('.choice').forEach(btn => btn.classList.remove('hidden'));
    document.querySelector('.new-game').classList.add('hidden');
    playerScoreValue = 0;
    pcScoreValue = 0;
    roundResult.textContent = "";
    playerChoice.textContent = "";
    playerScore.textContent = "";
    pcChoice.textContent = "";
    pcScore.textContent = "";
}