import {
    questions
} from "./questions.js";
/**
 * This function runs when the user has selected to start the game. 
 */
 let backgroundMusic = new Audio('/assets/audio/background-audio.mp3');
 const answerDivs = document.getElementsByClassName('answer');
 const quiz = document.getElementsByClassName("quiz-container")[0];
 const welcomeScreen = document.getElementById("welcome-screen");
 const questionResult = document.getElementById("question-result");


 document.addEventListener("DOMContentLoaded", function() {

    for (let answer of answerDivs) {
        answer.addEventListener("click", function() {
                stopGame = true;
                questionResult.classList.add("active");
                quiz.classList.remove("active");

        });
    }

    document.getElementById("answer-box").addEventListener("keydown", function(event) {
        if (event.key === "Enter") {
            checkAnswer();
        }
    });

    runGame("addition");

});

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
        let qstnNumber = 0
        document.getElementById('question').innerHTML = questions[qstnNumber].question;
        let answerOptions = [];
        answerOptions = Object.values(questions[qstnNumber])
        answerOptions = answerOptions.slice(2, 6);
        for (let i = 0; i < answerDivs.length; i++) {
            answerDivs[i].innerHTML = answerOptions[i];
        }
        answerDivs.addEventListener('click', answerSelected);

    }


    function answerSelected() {
        stopGame = true;
    }
    
    setQuestion();
}

const startButton = document.getElementById('start-button');
startButton.addEventListener('click', startGame)