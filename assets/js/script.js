import {
    games
} from "./questions.js";

/* Audio */
const backgroundMusic = new Audio('./answertime/../assets/audio/background-audio.mp3');
const clickSound = new Audio('./answertime/../assets/audio/click.wav');
const correctSound = new Audio('./answertime/../assets/audio/correct.mp3');
const incorrectSound = new Audio('./answertime/../assets/audio/incorrect.mp3');
const soundOn = document.getElementsByClassName('fa-volume-high')[0];
const soundOff = document.getElementsByClassName('fa-volume-xmark')[0];
/* welcome screen */
const welcomeScreen = document.getElementById("welcome-screen");
/* choose game screen */
const gameTypes = document.getElementById('game-types');
let gameTypeNumber;
/* question screen */
const quiz = document.getElementsByClassName("quiz-container")[0];
let qstnNumber = 0;
let seconds = 0;
const answerDivs = document.querySelectorAll('.answer');
/* question result screen */
let nextQuestion = document.getElementById('next-question');
const questionResult = document.getElementById("question-result");
const resultText = document.getElementById("result-text");
let correctAnswer;
let scoreAmount = parseInt(document.getElementById('score-amount').innerText);
let interval;
let maxScoreAmount;
let stopGame;

document.addEventListener("DOMContentLoaded", function () {
    const buttons = document.querySelectorAll('.game-button');

    /* funnctionality which checks which type of button has been selected, and plays a corresponding sound */
    buttons.forEach(button => {

        button.addEventListener('click', function () {
            if (button.classList == 'answer game-button' && button.id != correctAnswer) {
                incorrectSound.play();
            } else if (button.classList == 'answer game-button') {
                correctSound.play();
                document.getElementById('answered').style.color = "green";
            } else {
                clickSound.play();
            }
        });
    });
    /* This changes the audio to muted */
    soundOn.addEventListener('click', function () {
        backgroundMusic.muted = true;
        incorrectSound.muted = true;
        correctSound.muted = true;
        clickSound.muted = true;
        soundOff.classList.add('active');
        soundOn.classList.remove('active');
    });
    /* This changes the audio to unmuted */
    soundOff.addEventListener('click', function () {
        backgroundMusic.muted = false;
        incorrectSound.muted = false;
        correctSound.muted = false;
        clickSound.muted = false;
        soundOff.classList.remove('active');
        soundOn.classList.add('active');
    });

    const startButton = document.getElementById('start-button');
    const howToPlay = document.getElementById('how-to-play');
    const howToClose = document.getElementById('how-to-close');
    const instructions = document.getElementById('instructions');
    /***
     * The below will listen for which button on the initial screen has been selected and act accordingly
     */
    startButton.addEventListener('click', chooseGame);

    howToPlay.addEventListener('click', function () {
        instructions.classList.add('active');
        welcomeScreen.classList.remove('active');
    });

    /* Functionality to close the how to play section */
    howToClose.addEventListener('click', function () {
        instructions.classList.remove('active');
        welcomeScreen.classList.add('active');
    });

    /* This will trigger when next question has been selected and will trigger the newQuestion function */
    nextQuestion.addEventListener("click", function () {
        qstnNumber += 1;
        newQuestion();
    });
});

/* plays sound when time runs up for question */
function timeOut() {
    incorrectSound.play();
}

/* once a gameType has been chosen, the below function will run */
function startGame() {
    backgroundMusic.play();
    gameTypes.classList.remove('enter-animation');
    gameTypes.classList.add('exit-animation');
    setTimeout(function () {
        quiz.classList.add('enter-animation', 'active');
        gameTypes.classList.remove('active');
        newQuestion();

    }, 1000);
}

/* This function triggers when the initial start button is selected, and displays the choose game section */
function chooseGame() {
    const maxScoreText = document.getElementById('max-score');
    const gameType = document.querySelectorAll('.game-type');
    welcomeScreen.classList.add('exit-animation');
    setTimeout(function () {
        gameTypes.classList.add('active', 'enter-animation');
        welcomeScreen.classList.remove('active');
    }, 1000);

    gameType.forEach(type => {
        type.addEventListener('click', function () {
            if (type == gameType[0]) {
                maxScoreAmount = 100;
                maxScoreText.innerText = maxScoreAmount;
                gameTypeNumber = 0;
                startGame();
            } else {
                maxScoreAmount = 80;
                maxScoreText.innerText = maxScoreAmount;
                gameTypeNumber = 1;
                startGame();
            }

        });
    });
}


/* display new question */
function newQuestion() {
    let currentQuestion = document.getElementById('question-number');
    resultText.innerHTML = `You answered:<br> <strong><span id="answered"></span></strong><br> in <span
    id="seconds"></span> seconds! <br>
CORRECT!<br> 
+<span id="current-question-score"></span> points`;
    quiz.classList.add('active');
    questionResult.classList.remove("active");
    stopGame = false;
    currentQuestion.innerText = qstnNumber + 1;
    seconds = 0;
    setQuestion();
    clearInterval(interval);
    interval = setInterval(function () {
        countdown();
    }, 1000); 
    /**
     * This function will set the question and answer values for the quiz
     */
    function setQuestion() {
        const countdownBar = document.getElementsByClassName('progress');

        if (qstnNumber < games[gameTypeNumber].length) {

            document.getElementById('question').innerHTML = games[gameTypeNumber][qstnNumber].question;
            correctAnswer = games[gameTypeNumber][qstnNumber].correct;
            let answerOptions = [];
            answerOptions = Object.values(games[gameTypeNumber][qstnNumber]);
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

/* This will listen for when an answer has been selected and call a function*/
    answerDivs.forEach(answer => {
        answer.addEventListener("click", function () {
            nextQuestion.classList.add('enter-animation');
            let selectedAnswer = answer;
            stopGame = true;
            answerSelected(selectedAnswer);
        });
    });

/* This is run when an answer has been selected from the options */
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
            if (seconds < 3) {
                document.getElementById('seconds').style.color = "green";
            } else if (seconds >= 3 && seconds < 7) {
                document.getElementById('seconds').style.color = "orange";
            } else {
                document.getElementById('seconds').style.color = "red";

            }
            document.getElementById('current-question-score').innerText = qstnScore;


        } else {
            document.getElementById('result-text').innerHTML = `You answered: <br> <span style="color: red; text-transform: uppercase">${answer.innerText}</span> <br> Incorrect! <br> 
            </span>`;
        }
        seconds = 0;
    } else {
        scoreAmount += qstnScore;
        quiz.innerHTML = `<div id="end">GAME OVER!<br><br> You scored ${scoreAmount}/${maxScoreAmount}</div>
        <button class="game-button" id="new-game">New Game</button>`;
        document.getElementById('current-question-score').innerText = Math.floor(10.9 - seconds);
        document.getElementById('new-game').addEventListener('click', function () {
            location.reload();
        });

    }

}

/* This function controls the timer */

function countdown() {
    if (seconds == 9 && qstnNumber + 1 < games[gameTypeNumber].length) {
        resultText.innerHTML = `TIMES UP!`;
        questionResult.classList.add('active');
        quiz.classList.remove('active');
        timeOut();
        clearInterval(interval);
    } else if (seconds == 9 && qstnNumber + 1 == games[gameTypeNumber].length) {
        quiz.innerHTML = `<div id="end">GAME OVER!<br><br> You scored ${scoreAmount}/${maxScoreAmount}</div>
    <button class="game-button" id="new-game">New Game</button></div>`;
        document.getElementById('current-question-score').innerText = Math.floor(10.9 - seconds);
        document.getElementById('new-game').addEventListener('click', function () {
            location.reload();
        });
    } else if (seconds < 10 && stopGame != true) {
        ++seconds;
        let countdownBarStage = document.getElementById(`seconds${seconds}`);
        countdownBarStage.style.backgroundColor = "black";
    } else {
        clearInterval(interval);
        running = false;
    }
}