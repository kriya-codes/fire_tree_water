let userScore=0;
let compScore=0;


const choices=document.querySelectorAll(".choice");
const msg = document.querySelector("#msg");

const userScorePara  = document.querySelector("#user-score");
const compScorePara  = document.querySelector("#comp-score");

let targetScore = parseInt(prompt("Enter Target Score (e.g., 3, 5, 10):"), 10);

if (isNaN(targetScore) || targetScore <= 0) {
    alert("Invalid input. Setting default target score to 5.");
    targetScore = 5;
}

alert(`🎯 Target score set to: ${targetScore}`);

msg.innerText = `Play your move. Target score: ${targetScore}`;



const gencompChoice = () =>{
     const options = ["fire", "tree", "water"];
     const ranIdx = Math.floor(Math.random()*3);
     return options[ranIdx];
}

const drawGame = () =>{
    msg.innerText = ("Game was Draw. Play again.");
    msg.style.backgroundColor ="#081b31";
}

const finalWin = (winner) => {
    if (winner === "user") {
        msg.innerText = "🎉 You are the FINAL WINNER!";
        msg.style.backgroundColor = "green";
    } else {
        msg.innerText = "💀 Computer is the FINAL WINNER!";
        msg.style.backgroundColor = "red";
    }

    choices.forEach(choice => {
        choice.style.pointerEvents = "none";
    });
};

const showWinner = (userWin, userChoice, compChoice) =>{
    if (userWin){
        userScore++;
        userScorePara.innerText = userScore;
        msg.innerText = (`You Win! Your ${userChoice} beats ${compChoice}.`);
        msg.style.backgroundColor ="green";
    }else{
        compScore++;
        compScorePara.innerText=compScore;
        msg.innerText = (`You Lose. ${compChoice} beats your ${userChoice}.`);
        msg.style.backgroundColor ="red";
    }

    // Check for FINAL WIN (target score = targetScore())
    if (userScore === targetScore) {
        finalWin("user");
    }
    if (compScore === targetScore) {
        finalWin("comp");
    }
};

const playGame = (userChoice) =>{
    //Generate computer choice
    const compChoice = gencompChoice();

    if (userChoice === compChoice){
        // Draw game
        drawGame();
    }else{
        let userWin = true;
        if (userChoice === "fire"){
            // water, tree
            userWin = compChoice === "water" ? false : true;
        }else if (userChoice === "tree"){
            // fire, water
            userWin = compChoice === "fire" ? false : true;
        }else {
            // fire, tree
            userWin = compChoice === "tree" ? false : true;
        }
        showWinner(userWin, userChoice, compChoice);
    }
}

choices.forEach((choice) =>{
    choice.addEventListener("click", () =>{
        const userChoice=choice.getAttribute("id");   
        playGame(userChoice);
    });
});