import {
    questions
} from "./questions.js";
/**
 * This function runs when the user has selected to start the game. 
 */
function startGame() {
    /*play audio music in background*/
    let backgroundMusic = new Audio('/assets/audio/background-audio.mp3');
    backgroundMusic.play();

    /* hide the welcome screen and show the main quiz container */
    var quiz = document.getElementsByClassName("quiz-container")[0];
    quiz.classList.add("active");

    var welcomeScreen = document.getElementById("welcome-screen");
    welcomeScreen.classList.remove("active");

    newQuestion();
}

    function newQuestion(){
        let seconds = 0; /* declared outside the countdown function as it repeats */
        /** This is the function which controls the timer, and timeout */
    function countdown() {
        if (seconds < 10) {
            ++seconds;
            let countdownBarStage = document.getElementById(`seconds${seconds}`)
            countdownBarStage.style.backgroundColor = "red";
        } else {
            backgroundMusic.pause();
            alert('Game Over!')
            return;
        }
        setTimeout(countdown, 1000);
    }
    countdown();

    let answerDivs = document.getElementsByClassName('answer');

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
    }

    function answerSelected(){

    }

    answerDivs.addEventListener('click', answerSelected);




    setQuestion();
}

const startButton = document.getElementById('start-button');
startButton.addEventListener('click', startGame)