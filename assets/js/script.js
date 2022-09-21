import {musicQuestions,
    questions
} from "./questions.js";


/**
 * This function runs when the user has selected to start the game. 
 */
const backgroundMusic = new Audio('./answertime/../assets/audio/background-audio.mp3');
const clickSound = new Audio('./answertime/../assets/audio/click.wav');
const answerDivs = document.getElementsByClassName('answer');
const quiz = document.getElementsByClassName("quiz-container")[0];
const welcomeScreen = document.getElementById("welcome-screen");
const questionResult = document.getElementById("question-result");
const resultText = document.getElementById("result-text");
const nextQuestion = document.getElementById('next-question');
let qstnNumber = 0;
let seconds = 0;
const countdownBar = document.getElementsByClassName('progress')
const startButton = document.getElementById('start-button');
const gameType = document.getElementsByClassName('game-type');
const gameTypes = document.getElementById('game-types')
let gameTypeNumber;
const buttons = document.getElementsByClassName('divbtn');
startButton.addEventListener('click', chooseGame);
const soundOn = document.getElementById('music');
let selectedAnswer = "";
soundOn.addEventListener('click', function(){
    backgroundMusic.muted = true;
})
for(let i=0; i< buttons.length; i++){
buttons[i].addEventListener('click', function(){
    clickSound.play();
});
}

function chooseGame(){
welcomeScreen.classList.add('exit-animation')

setTimeout(function(){
    gameTypes.classList.add('active', 'enter-animation')
welcomeScreen.classList.remove('active')
}, 1000);


for(let g=0; g<gameType.length; g++){
    gameType[g].addEventListener('click', function(){
         gameTypeNumber= g;
        startGame()
    }
);
    }
}
    

document.addEventListener("DOMContentLoaded", function () {
    for (var i = 0; i < answerDivs.length; i++) {
        (function (index) {
            answerDivs[index].addEventListener("click", function () {
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
});


function answerSelected(answer) {


    stopGame = true;
    questionResult.classList.add("active");
    quiz.classList.remove("active");
    if (answer.getAttribute('id') == questions[qstnNumber].correct) {
        document.getElementById('answered').innerText = answer.innerText;

        let scoreAmount = parseInt(document.getElementById('score-amount').innerText)
        scoreAmount = scoreAmount += (10 - seconds)
        document.getElementById('score-amount').innerText = scoreAmount;
        document.getElementById('seconds').innerText = seconds +1;
        document.getElementById('current-question-score').innerText = 10 - seconds;


    } else {
        document.getElementById('result-text').innerHTML = 'Incorrect Answer'   }
    seconds = 0;


}

function startGame() {
    /*play audio music in background*/
    backgroundMusic.play();

    /* hide the welcome screen and show the main quiz container */
    quiz.classList.add("active");
    gameTypes.classList.remove("active");

    welcomeScreen.classList.remove("active");

    newQuestion();
}
let stopGame;

function newQuestion() {
    resultText.innerHTML = `  You answered:<br> <strong><span id="answered"></span></strong> in <span id="seconds"></span> seconds! <br>
    Correct!<br>
    +<span id="current-question-score"></span> points`
    questionResult.classList.remove("active");
    quiz.classList.add("active");
    stopGame = false;
    document.getElementById('question-number').innerText = qstnNumber + 1;
    seconds = 0;
    setQuestion();
    countdown();

    ; /* declared outside the countdown function as it repeats */
    /** This is the function which controls the timer, and timeout */
    function countdown() {
        if (selectedAnswer == ""){
            var timer = setInterval(function(){  
                if (seconds < 10 && stopGame != true) {
                ++seconds;
                let countdownBarStage = document.getElementById(`seconds${seconds}`)
                countdownBarStage.style.backgroundColor = "red";
            } }, 1000)
            
            
        }
      
    
        else {
            console.log(selectedAnswer)
        clearInterval(timer);
    return;
    }
    }


    /**
     * The below function will set the question and answer values for the quiz
     */
    function setQuestion() {
        if (qstnNumber<10){
        if(gameTypeNumber == 0){
        document.getElementById('question').innerHTML = questions[qstnNumber].question;
        let answerOptions = [];
        answerOptions = Object.values(questions[qstnNumber])
        answerOptions = answerOptions.slice(2, 6);
        for (let i = 0; i < answerDivs.length; i++) {
            answerDivs[i].innerHTML = answerOptions[i];
        }
    }
    else{
        document.getElementById('question').innerHTML = musicQuestions[qstnNumber].question;
        let answerOptions = [];
        answerOptions = Object.values(musicQuestions[qstnNumber])
        answerOptions = answerOptions.slice(2, 6);
        for (let i = 0; i < answerDivs.length; i++) {
            answerDivs[i].innerHTML = answerOptions[i];
    }
    }
}
else{
    console.log('game over')
}
    for (let bar of countdownBar) {
        bar.style.backgroundColor = "green";
    }
}
console.log(gameTypeNumber)

    setQuestion();
}

