/**
 * Below is code used to count down from 10, which will be built to se the countdown bar
 */
let seconds = 0;

function test() {

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
    setTimeout(test, 1000);
}

test();