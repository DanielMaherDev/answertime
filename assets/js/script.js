import { questions } from "./questions.js";/**
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
    let seconds = 0; /* declared outside the countdown function as it repeats */
    /** This is the function which controls the timer, and timeout */
    countdown();
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
    function setQuestion(){
        document.getElementById('question').innerHTML = questions[0].question;
    }

    setQuestion();
}

const startButton = document.getElementById('start-button');
startButton.addEventListener('click', startGame)