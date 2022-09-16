
/**
 * Below is code used to count down from 10, which will be built to set the countdown bar
 */

function startGame(){
    let backgroundMusic = new Audio('/assets/audio/background-audio.mp3');
    backgroundMusic.play();
        var quiz = document.getElementsByClassName("quiz-container")[0];
        quiz.classList.add("active");
    
        var welcomeScreen = document.getElementById("welcome-screen");
        welcomeScreen.classList.remove("active");
        let seconds = 0;

        countdown();
        function countdown() {
            console.log('testcountdown')
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
}

const startButton = document.getElementById('start-button');
startButton.addEventListener('click', startGame)