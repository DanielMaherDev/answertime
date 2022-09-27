import {
    musicQuestions,
    questions
} from "./questions.js";

/**
 * This function runs when the user has selected to start the game. 
 */
const backgroundMusic = new Audio('./answertime/../assets/audio/background-audio.mp3');
const clickSound = new Audio('./answertime/../assets/audio/click.wav');
const optionSound = new Audio('./answertime/../assets/audio/option.mp3');
const correctSound = new Audio('./answertime/../assets/audio/correct.mp3');
const incorrectSound = new Audio('./answertime/../assets/audio/incorrect.mp3');
const answerDivs = document.getElementsByClassName('answer');
const quiz = document.getElementsByClassName("quiz-container")[0];
const welcomeScreen = document.getElementById("welcome-screen");
const questionResult = document.getElementById("question-result");
const resultText = document.getElementById("result-text");
const nextQuestion = document.getElementById('next-question');
let qstnNumber = 0;
let currentQuestion = document.getElementById('question-number').innerText
let seconds = 10;
const countdownBar = document.getElementsByClassName('progress')
const startButton = document.getElementById('start-button');
const gameType = document.getElementsByClassName('game-type');
const gameTypes = document.getElementById('game-types')
let gameTypeNumber;
const buttons = document.getElementsByClassName('divbtn');
startButton.addEventListener('click', chooseGame);
const soundOn = document.getElementById('sound');
let selectedAnswer = "";
let correctAnswer;
let scoreAmount = parseInt(document.getElementById('score-amount').innerText)
var interval;
let stopGame = false;

document.addEventListener("DOMContentLoaded", function () {
    for (var i = 0; i < answerDivs.length; i++) {
        (function (index) {
            answerDivs[index].addEventListener("click", function () {
                    nextQuestion.classList.add('enter-animation')
                    selectedAnswer = answerDivs[index];
                    stopGame = true;
                    answerSelected(selectedAnswer);
              

            })
        })(i);

    }
    nextQuestion.addEventListener("click", function () {
        qstnNumber += 1;
        newQuestion()
    })

    soundOn.addEventListener('click', function () {
        backgroundMusic.muted = true;
    })
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].addEventListener('click', function () {
            if (buttons[i].classList == 'answer divbtn' && buttons[i].id != correctAnswer) {
                incorrectSound.play();
            } else if (buttons[i].classList == 'answer divbtn') {
                correctSound.play();
            } else {
                clickSound.play();

            }
        });
    }

    for (let i = 0; i < buttons.length; i++) {
        buttons[i].addEventListener('mouseover', function () {
            optionSound.play();
        });
    }
});



function newGame() {
    welcomeScreen.classList.add('active');
    quiz.classList.remove('active');
    quiz.innerHTML = `   <div id="">QUESTION <span id="question-number">1</span></div>
        <div id="progress-bar">
            <div class="progress" id="seconds10"></div>
            <div class="progress" id="seconds9"></div>
            <div class="progress" id="seconds8"></div>
            <div class="progress" id="seconds7"></div>
            <div class="progress" id="seconds6"></div>
            <div class="progress" id="seconds5"></div>
            <div class="progress" id="seconds4"></div>
            <div class="progress" id="seconds3"></div>
            <div class="progress" id="seconds2"></div>
            <div class="progress" id="seconds1"></div>

        </div>
        <div class="quiz">
            <div id="question"></div>
            <div class="answer divbtn" data-type="answer" id="A"></div>
            <div class="answer divbtn" data-type="answer" id="B"></div>
            <div class="answer divbtn" data-type="answer" id="C"></div>
            <div class="answer divbtn" data-type="answer" id="D"></div>
        </div>

        <div class="score">Your Score: <span id="score-amount">0</span>/100</div>`
};

function chooseGame() {
    welcomeScreen.classList.add('exit-animation')
    setTimeout(function () {
        gameTypes.classList.add('active', 'enter-animation')
        welcomeScreen.classList.remove('active')
    }, 1000);


    for (let g = 0; g < gameType.length; g++) {
        gameType[g].addEventListener('click', function () {
            gameTypeNumber = g;
            startGame()
        });
    }
}




function answerSelected(answer) {

    if (qstnNumber < 9) {
        stopGame = true;
        questionResult.classList.add("active");
        quiz.classList.remove("active");
        if (answer.getAttribute('id') == questions[qstnNumber].correct) {
            document.getElementById('answered').innerText = answer.innerText;

            scoreAmount = scoreAmount += (11 - seconds)
            document.getElementById('score-amount').innerText = scoreAmount;
            document.getElementById('seconds').innerText = seconds;
            document.getElementById('current-question-score').innerText = 11 - seconds;


        } else {
            scoreAmount = scoreAmount += (11 - seconds)
            document.getElementById('result-text').innerHTML = 'Incorrect Answer'
        }
    } else {
        document.getElementById('score-amount').innerText = scoreAmount;
        document.getElementById('current-question-score').innerText = 11 - seconds;
        quiz.innerHTML = `game over<br> You scored ${scoreAmount}/100
        <button id="new-game">New Game</button>`

        document.getElementById('new-game').addEventListener('click', newGame)
    }

}

function startGame() {
    gameTypes.classList.remove('enter-animation');
    gameTypes.classList.add('exit-animation');
    setTimeout(function () {
        quiz.classList.add('enter-animation', 'active');
        gameTypes.classList.remove('active');
        newQuestion();
    }, 1000)

    /*play audio music in background*/
    backgroundMusic.play();

    /* hide the welcome screen and show the main quiz container */
}


function newQuestion() {
    resultText.innerHTML = `  You answered:<br> <strong><span id="answered"></span></strong> in <span id="seconds"></span> seconds! <br>
    Correct!<br>
    +<span id="current-question-score"></span> points`
    quiz.classList.add('active');
    questionResult.classList.remove("active");
    currentQuestion = qstnNumber + 1;
    seconds = 10;
    
/***
 * The below code was taken from codingnepalweb.com/quiz-app-with-timer-javascript/
 */
 startTimer(10); //calling startTimer function

 let sec = 0;

 function startTimer(time){
    let counter = setInterval(timer, 1000);
    clearInterval(counter); //clear counter
     time = 10;
    stopGame = false;
     counter = setInterval(timer, 1000);
    console.log(`question ${qstnNumber}`)
    function timer(){
        
        console.log(`second ${sec}`)

            countdownBar[sec].style.backgroundColor = "black";
sec++
  if(time < 0 || stopGame == true || sec > 9){ //if timer is less than 0
            clearInterval(counter); //clear counter
         sec = 0;
        }
    }
}

    setQuestion();
    /** This is the function which controls the timer, and timeout */


    /**
     * The below function will set the question and answer values for the quiz
     */
    function setQuestion() {

        if (qstnNumber < 10) {
            if (gameTypeNumber == 0) {
                document.getElementById('question').innerHTML = questions[qstnNumber].question;
                correctAnswer = questions[qstnNumber].correct;
                let answerOptions = [];
                answerOptions = Object.values(questions[qstnNumber])
                answerOptions = answerOptions.slice(2, 6);
                for (let i = 0; i < answerDivs.length; i++) {
                    answerDivs[i].innerHTML = answerOptions[i];
                }
            } else {
                document.getElementById('question').innerHTML = musicQuestions[qstnNumber].question;
                let answerOptions = [];
                answerOptions = Object.values(musicQuestions[qstnNumber])
                answerOptions = answerOptions.slice(2, 6);
                for (let i = 0; i < answerDivs.length; i++) {
                    answerDivs[i].innerHTML = answerOptions[i];
                }
            }
        } else {
            return;
        }
        for (let bar of countdownBar) {
            bar.style.backgroundColor = "green";
        }
    }
    console.log(gameTypeNumber)

    setQuestion();
}