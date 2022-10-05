import {
    games
} from "./questions.js";

/**
 * This function runs when the user has selected to start the game. 
 */
const backgroundMusic = new Audio('./answertime/../assets/audio/background-audio.mp3');
const clickSound = new Audio('./answertime/../assets/audio/click.wav');
const correctSound = new Audio('./answertime/../assets/audio/correct.mp3');
const incorrectSound = new Audio('./answertime/../assets/audio/incorrect.mp3');
const answerDivs = document.querySelectorAll('.answer');
const quiz = document.getElementsByClassName("quiz-container")[0];
const welcomeScreen = document.getElementById("welcome-screen");
const questionResult = document.getElementById("question-result");
const resultText = document.getElementById("result-text");
const nextQuestion = document.getElementById('next-question');
let qstnNumber = 0;
let currentQuestion = document.getElementById('question-number');
let seconds = 0;
const countdownBar = document.getElementsByClassName('progress');
const startButton = document.getElementById('start-button');
const gameType = document.querySelectorAll('.game-type');
const gameTypes = document.getElementById('game-types');
let gameTypeNumber;
const buttons = document.querySelectorAll('.divbtn');
startButton.addEventListener('click', chooseGame);
const soundOn = document.getElementsByClassName('fa-volume-high')[0];
const soundOff = document.getElementsByClassName('fa-volume-xmark')[0];
let selectedAnswer = "";
let correctAnswer;
let scoreAmount = parseInt(document.getElementById('score-amount').innerText);
var cD = 100,
    interval, running = false;
let gameNumber = 0;
const maxScoreText = document.getElementById('max-score');
let maxScoreAmount;
const howToPlay = document.getElementById('how-to-play');
const howToClose = document.getElementById('how-to-close');
const instructions = document.getElementById('instructions');



soundOn.addEventListener('click', function () {
    backgroundMusic.muted = true;
    incorrectSound.muted = true;
    correctSound.muted = true;
    clickSound.muted = true;
    soundOff.classList.add('active');
    soundOn.classList.remove('active');

});

soundOff.addEventListener('click', function () {
    backgroundMusic.muted = false;
    incorrectSound.muted = false;
    correctSound.muted = false;
    clickSound.muted = false;
    soundOff.classList.remove('active');
    soundOn.classList.add('active');

});

buttons.forEach(button => {

    button.addEventListener('click', event => {
        if (button.classList == 'answer divbtn' && button.id != correctAnswer) {
            incorrectSound.play();
        } else if (button.classList == 'answer divbtn') {
            correctSound.play();
            document.getElementById('answered').style.color = "green";
        } else {
            clickSound.play();
        }
    });
 
 });


function chooseGame() {
    welcomeScreen.classList.add('exit-animation');
    setTimeout(function () {
        gameTypes.classList.add('active', 'enter-animation');
        welcomeScreen.classList.remove('active');
    }, 1000);

   gameType.forEach (type => {
        type.addEventListener('click', function () {
            if (type== gameType[0]){
                maxScoreAmount = 100;
                maxScoreText.innerText = maxScoreAmount;
                gameTypeNumber = 0;
                startGame();
            }

            else{
                maxScoreAmount = 80;
                maxScoreText.innerText = maxScoreAmount;
                gameTypeNumber = 1;
                startGame();
            }
          
        });
    });
}


document.addEventListener("DOMContentLoaded", function () {
    answerDivs.forEach(answer => {
            answer.addEventListener("click", function () {
                nextQuestion.classList.add('enter-animation');
                selectedAnswer = answer;
                stopGame = true;
                answerSelected(selectedAnswer);

            })
    

    });

    howToPlay.addEventListener('click', function () {
        instructions.classList.add('active');
        welcomeScreen.classList.remove('active')
    })

    howToClose.addEventListener('click', function () {
        instructions.classList.remove('active');
        welcomeScreen.classList.add('active')

    })

    nextQuestion.addEventListener("click", function () {
        qstnNumber += 1;
        newQuestion()
    })
});


function answerSelected(answer) {
    stopGame = true;
    let qstnScore;
    if (seconds == 0) {
        qstnScore = 10;
    } else {
        qstnScore = 11 - seconds;
    }
    clearInterval(interval);
    if (qstnNumber + 1 < games[gameTypeNumber].length) {
        questionResult.classList.add("active");
        quiz.classList.remove("active");
        if (answer.getAttribute('id') == games[gameTypeNumber][qstnNumber].correct) {
            document.getElementById('answered').innerText = answer.innerText;
            scoreAmount += qstnScore;
            document.getElementById('score-amount').innerText = scoreAmount;
            document.getElementById('seconds').innerText = seconds;
            if(seconds < 3){
                document.getElementById('seconds').style.color = "green";
            }
            else if (seconds >= 3 && seconds < 7){
                document.getElementById('seconds').style.color = "orange";
            }
            else {
                document.getElementById('seconds').style.color = "red";

            }
            document.getElementById('current-question-score').innerText = qstnScore;


        } else {
            document.getElementById('result-text').innerHTML = `You answered: <br> <span style="color: red; text-transform: uppercase">${answer.innerText}</span> <br> Incorrect! <br> 
            </span>`
        }
        seconds = 0;
    } else {
        scoreAmount += qstnScore;
        quiz.innerHTML = `<div id="end">GAME OVER!<br><br> You scored ${scoreAmount}/${maxScoreAmount}</div>
        <button class="divbtn" id="new-game">New Game</button>`
        document.getElementById('current-question-score').innerText = Math.floor(10.9 - seconds);
        document.getElementById('new-game').addEventListener('click', function () {
            location.reload();
        })

    }

}

function startGame() {
    backgroundMusic.play();
    gameTypes.classList.remove('enter-animation');
    gameTypes.classList.add('exit-animation');
    setTimeout(function () {
        quiz.classList.add('enter-animation', 'active');
        gameTypes.classList.remove('active');
        newQuestion();

    }, 1000)

    /*play audio music in background*/

    /* hide the welcome screen and show the main quiz container */
}
let stopGame;

function newQuestion() {

    resultText.innerHTML = `You answered:<br> <strong><span id="answered"></span></strong><br> in <span
    id="seconds"></span> seconds! <br>
CORRECT!<br> 
+<span id="current-question-score"></span> points`
    quiz.classList.add('active');
    questionResult.classList.remove("active");
    stopGame = false;
    currentQuestion.innerText = qstnNumber + 1;
    seconds = 0;
    setQuestion();
    clearInterval(interval)
    interval = setInterval(function () {
        countdown()
    }, 1000); /* test code */
    /* declared outside the countdown function as it repeats */
    /** This is the function which controls the timer, and timeout */

    /**
     * The below function will set the question and answer values for the quiz
     */
    function setQuestion() {
        if (qstnNumber < games[gameTypeNumber].length) {

            document.getElementById('question').innerHTML = games[gameTypeNumber][qstnNumber].question;
            correctAnswer = games[gameTypeNumber][qstnNumber].correct;
            let answerOptions = [];
            answerOptions = Object.values(games[gameTypeNumber][qstnNumber])
            answerOptions = answerOptions.slice(1, 5);
            for (let i = 0; i < answerDivs.length; i++) {
                answerDivs[i].innerHTML = answerOptions[i];
            }


        } else {
            return;
        }
        for (let bar of countdownBar) {
            bar.style.backgroundColor = "#cbf078";
        }
    }

    setQuestion();
}
/* this is being called twice on the newGame function ??*/
function countdown() {
    if (seconds == 9 && qstnNumber + 1 < games[gameTypeNumber].length) {
        resultText.innerHTML = `TIMES UP!`;
        questionResult.classList.add('active')
        quiz.classList.remove('active')
    }
   else if (seconds == 9 && qstnNumber + 1 == games[gameTypeNumber].length) {
    quiz.innerHTML = `<div id="end">GAME OVER!<br><br> You scored ${scoreAmount}/${maxScoreAmount}</div>
    <button class="divbtn" id="new-game">New Game</button></div>`
    document.getElementById('current-question-score').innerText = Math.floor(10.9 - seconds);
    document.getElementById('new-game').addEventListener('click', function () {
        location.reload();
    })
    }
     else if (seconds < 10 && stopGame != true) {
        ++seconds;
        let countdownBarStage = document.getElementById(`seconds${seconds}`)
        countdownBarStage.style.backgroundColor = "black";
    } else {
        clearInterval(interval);
        running = false;
    }

}