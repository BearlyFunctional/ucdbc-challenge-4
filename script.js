// ## User Story

// ```
// AS A coding boot camp student
// I WANT to take a timed quiz on JavaScript fundamentals that stores high scores
// SO THAT I can gauge my progress compared to my peers
// ```

// ## Acceptance Criteria

// ```
// GIVEN I am taking a code quiz

// WHEN I click the start button
// THEN a timer starts and I am presented with a question

// WHEN I answer a question
// THEN I am presented with another question

// WHEN I answer a question incorrectly
// THEN time is subtracted from the clock

// WHEN all questions are answered or the timer reaches 0
// THEN the game is over

// WHEN the game is over
// THEN I can save my initials and my score

// ```

var startBtn = document.querySelector(".startBtn")
var startMenu = document.querySelector(".startMenu")
var quizBody = document.querySelector(".quizBody")
var quizQuestion = document.querySelector(".quizQuestion")
var quizAnswers = document.querySelector('.quizAnswers')
var timerEl = document.querySelector('.timer')
var timerSubEl = document.querySelector('.timerSubtract')
var scoreboard = document.querySelector('.scoreboard')
var numberCorrect = 0
var currentQuestion = 1
var correctAnsr = "answer2"
var timerCount = 35
var score
var timeTaken
var timer

var highScores = localStorage.getItem('highScores')
highScores = JSON.parse(highScores)
if (highScores == null) {
    console.log('highScores not array')
    highScores = []
}

console.log("JS Running")

for (let i = 0; i < highScores.length; i++) {
    const element = highScores[i];
    var listitem = document.createElement('li')
    listitem.prepend(document.createTextNode(highScores[i][0] + ': ' + highScores[i][1] + '/5, in ' + highScores[i][2] + 's'))
    scoreboard.prepend(listitem);
    console.log(highScores[i][0] + ': ' + highScores[i][1] + '/5, ' + highScores[i][2] + 's')
}



function gameStart() {
    startMenu.setAttribute("style", "display:none");
    quizBody.setAttribute("style", "display:block");
    timerEl.setAttribute("style", "display:block");
    timerEl.textContent = timerCount;
    runTimer();
    console.log("Game Start")
    generateQuestion()
}

function runTimer(){
    timer = setInterval(countDown, 1000)
        function countDown(){
            if (timerCount > 0){
                timerCount--,
                console.log(timerCount)
                timerEl.textContent = timerCount
            } else {
                clearInterval
                gameEnd()
            }
        }
}

function generateQuestion(){
    if (currentQuestion == 1) {
        correctAnsr = 'answer2'
        quizQuestion.textContent = 'What does it mean to "declare" a variable?'
        quizAnswers.children[0].children[0].textContent = "To assign a variable's content."
        quizAnswers.children[1].children[0].textContent = "To state a variable's existance."
        quizAnswers.children[2].children[0].textContent = 'To convert a variable into an object.'
        quizAnswers.children[3].children[0].textContent = 'To call a variable for use.'
    } else if (currentQuestion == 2) {
        correctAnsr = 'answer4'
        quizQuestion.textContent = 'What is a function?'
        quizAnswers.children[0].children[0].textContent = "A modifier that converts a variable's type to that specified."
        quizAnswers.children[1].children[0].textContent = 'A modifier to be applied to a line of code when called.'
        quizAnswers.children[2].children[0].textContent = 'Code that triggers only when certain criteria are met.'
        quizAnswers.children[3].children[0].textContent = 'A multi-line block of code that triggers one after another when called.'
    } else if (currentQuestion == 3) {
        correctAnsr = 'answer4'
        quizQuestion.textContent = 'LocalStorage can only save ____'
        quizAnswers.children[0].children[0].textContent = 'Methods'
        quizAnswers.children[1].children[0].textContent = 'Functions'
        quizAnswers.children[2].children[0].textContent = 'Objects'
        quizAnswers.children[3].children[0].textContent = 'Strings'
    } else if (currentQuestion == 4) {
        correctAnsr = 'answer3'
        quizQuestion.textContent = 'What is the proper way to call a function?'
        quizAnswers.children[0].children[0].textContent = 'function(functionName)'
        quizAnswers.children[1].children[0].textContent = 'functionName.call'
        quizAnswers.children[2].children[0].textContent = 'functionName()'
        quizAnswers.children[3].children[0].textContent = 'function functionName()'
    } else if (currentQuestion == 5) {
        correctAnsr = 'answer1'
        quizQuestion.textContent = 'What is an array?'
        quizAnswers.children[0].children[0].textContent = 'A type of variable consisting of multiple values.'
        quizAnswers.children[1].children[0].textContent = 'A collection of code set to trigger simultaneously.'
        quizAnswers.children[2].children[0].textContent = 'A browser based storage medium.'
        quizAnswers.children[3].children[0].textContent = 'A type of varibale consisting of multiple "key/value" pairs.'
    } else {
        gameEnd()
    }
}

function gameEnd() {
    startMenu.setAttribute("style", "display:block")
    quizBody.setAttribute("style", "display:none")
    timerEl.setAttribute("style", "display:none")
    timeTaken = Math.abs(timerCount - 25)
    console.log(timeTaken)
    clearInterval(timer)
    currentQuestion = 1
    timerCount = 25
    var confirmation = confirm('Game over! You got ' + numberCorrect + '/5 questions correct in ' + timeTaken + ' seconds! Would you like to save your score?')
    if (confirmation == true) {
        logScore()
    } else {
        numberCorrect = 0
        timeTaken = 0
    }
}

function logScore() {
    var playerName = prompt('Please enter your name or intials.')
    score = [playerName, numberCorrect, timeTaken]
    highScores.push(score)
    localStorage.setItem('highScores', JSON.stringify(highScores))
    var listitem = document.createElement('li')
    listitem.prepend(document.createTextNode(score[0] + ': ' + score[1] + '/5, in ' + score[2] + 's'))
    scoreboard.prepend(listitem);
    console.log(score[0] + ': ' + score[1] + '/5, in ' + timeTaken + 's')
    numberCorrect = 0
    timeTaken = 0
}

function submitAnswer() {
    var clckTrgt = event.target
    if (clckTrgt.tagName.toLowerCase() !== "button"){
        return
    }
    var trgtClass = clckTrgt.classList
    if (trgtClass == (correctAnsr + ' button')){
        console.log('correct')
        numberCorrect++
        currentQuestion++
        generateQuestion()
    } else {
        console.log('incorrect')
        timerSubEl.setAttribute('style', 'display:block')
        setTimeout(() => {timerSubEl.setAttribute('style', 'display:none')}, '2000')
        timerCount = timerCount - 5
        if (timerCount < 0) {
            timerCount = 0
        }
        console.log(timerCount)
        timerEl.textContent = timerCount
        currentQuestion++
        generateQuestion()
    }
}


startBtn.addEventListener("click", gameStart);
quizBody.addEventListener('click', submitAnswer)