/**
 * Below is code used to count down from 10, which will be built to set the countdown bar
 */
let seconds = 0;

function countdown() {
    document.getElementById('welcome-screen').style.display = "none";
    document.getElementsByClassName('quiz-container')[0].style.display = "block";

    if (seconds < 10) {
        ++seconds;
        let countdownBarStage = document.getElementById(`seconds${seconds}`)
        countdownBarStage.style.backgroundColor="red";
        console.log(countdownBarStage)
    } else {
        alert('Game Over!')
        return;
    }
    console.log(seconds)
    setTimeout(countdown, 1000);
}

const startButton = document.getElementById('start-button');
startButton.addEventListener('click', countdown)