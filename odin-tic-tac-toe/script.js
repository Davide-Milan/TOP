function getComputerChoice(){
    let selection = Math.floor(Math.random()*10) % 3;
    if(selection == 1) return 'rock';
    else if(selection == 2) return 'paper';
    return 'scissors';
}


function playRound(playerSelection, computerSelection) {
    let ps = playerSelection.toLowerCase();
    if(ps == 'rock'){
        if(computerSelection == 'rock') return "Draw!";
        if(computerSelection == 'paper') return "You lose! Paper beats rock!";
        else return "You win! Rock beats scissors!";
    }
    else if(ps == 'scissors'){
        if(computerSelection == 'scissors') return "Draw!";
        if(computerSelection == 'rock') return "You lose! Rock beats scissors!";
        else return "You win! Scissors beat paper!";
    }
    else if(ps == 'paper'){
        if(computerSelection == 'paper') return "Draw!";
        if(computerSelection == 'scissors') return "You lose! Scissors beat paper!";
        else return "You win! Paper beats rock!";
    }
}
   


function game(){
    return playRound(prompt("Enter 'rock', 'paper' or 'scissors'"), getComputerChoice())
}

for (let i = 0; i < 5; i++) {
    console.log(game());
}



