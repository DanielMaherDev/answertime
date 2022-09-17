import {
    questions
} from "./questions.js";
/**
 * This function runs when the user has selected to start the game. 
 */
const backgroundMusic = new Audio('/assets/audio/background-audio.mp3');
const answerDivs = document.getElementsByClassName('answer');
const quiz = document.getElementsByClassName("quiz-container")[0];
const welcomeScreen = document.getElementById("welcome-screen");
const questionResult = document.getElementById("question-result");
let qstnNumber = 0


document.addEventListener("DOMContentLoaded", function () {
    for (var i = 0; i < answerDivs.length; i++) {
        (function(index) {
             answerDivs[index].addEventListener("click", function(){
                let selectedAnswer =  answerDivs[index];
                answerSelected(selectedAnswer)
             })
        })(i);
     }
});



function answerSelected(answer){
    stopGame = true;
    questionResult.classList.add("active");
    quiz.classList.remove("active");
    console.log(answer)
    if(answer.getAttribute('id') == questions[qstnNumber].correct){
        document.getElementById('answered').innerText = answer.innerText    }
    else{
        document.getElementById('answered').innerText = 'wrong';
    }
    
}

function startGame() {
    /*play audio music in background*/
    backgroundMusic.play();

    /* hide the welcome screen and show the main quiz container */
    quiz.classList.add("active");

    welcomeScreen.classList.remove("active");

    newQuestion();
}
let stopGame;

function newQuestion() {
    let seconds = 0; /* declared outside the countdown function as it repeats */
    /** This is the function which controls the timer, and timeout */
    function countdown() {
        if (seconds < 10 && stopGame != true) {
            ++seconds;
            let countdownBarStage = document.getElementById(`seconds${seconds}`)
            countdownBarStage.style.backgroundColor = "red";
        } else {
            backgroundMusic.pause();
            return;
        }
        setTimeout(countdown, 1000);
    }
    countdown();



    /**
     * The below function will set the question and answer values for the quiz
     */
    function setQuestion() {
        document.getElementById('question').innerHTML = questions[qstnNumber].question;
        let answerOptions = [];
        answerOptions = Object.values(questions[qstnNumber])
        answerOptions = answerOptions.slice(2, 6);
        for (let i = 0; i < answerDivs.length; i++) {
            answerDivs[i].innerHTML = answerOptions[i];
        }
    }

    setQuestion();
}

const startButton = document.getElementById('start-button');
startButton.addEventListener('click', startGame)