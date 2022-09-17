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
const nextQuestion = document.getElementById('next-question');
let qstnNumber = 0;
let seconds = 0;
const countdownBar = document.getElementsByClassName('progress')


document.addEventListener("DOMContentLoaded", function () {
            for (var i = 0; i < answerDivs.length; i++) {
                (function (index) {
                    answerDivs[index].addEventListener("click", function () {
                        let selectedAnswer = answerDivs[index];
                        answerSelected(selectedAnswer)
                    })
                })(i);
                nextQuestion.addEventListener("click", function () {
                        qstnNumber += 1;
                        newQuestion()
                        console.log(qstnNumber)
                }
                    )
                }
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
               document.getElementById('seconds').innerText = seconds;

            } else {
                document.getElementById('answered').innerText = 'wrong';
            }
            seconds = 0;
            

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
            questionResult.classList.remove("active");
            quiz.classList.add("active");
            stopGame = false;
            setQuestion();

            seconds=0;

            ; /* declared outside the countdown function as it repeats */
            /** This is the function which controls the timer, and timeout */
            function countdown() {
                if (seconds < 10 && stopGame != true) {
                    ++seconds;
                    let countdownBarStage = document.getElementById(`seconds${seconds}`)
                    countdownBarStage.style.backgroundColor = "red";
                } else {
                    return;
                }
                setTimeout(countdown, 1000);

            }
            setTimeout(countdown, 1000);



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
                for(let bar of countdownBar){
                bar.style.backgroundColor = "green";
                }
            }

            setQuestion();
        }

        const startButton = document.getElementById('start-button'); startButton.addEventListener('click', startGame)