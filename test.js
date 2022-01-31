function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

function pickRandomMathematicalOperator() {
    let operator = ['+', '-', '/', '*']
    return operator[Math.floor(Math.random() * operator.length)];
}

const submit = document.querySelector('#submit')
const question = document.querySelector("#question")
const userAnsTextBox = document.querySelector("#userAns")
const scoreTextBox = document.querySelector("#score")
const correctAnsTextBox = document.querySelector("#correctAns")
const timerTextBox = document.querySelector("#timer")
const quiz = document.querySelector("#quiz")
const quizAnswers = new Map()
let quizAnswersDiv = document.querySelector("#quizAnswers")
let ourQuestion 

let answer
let score = 0
let question_count = 3
let time
let inital_time_val = 20
timerTextBox.innerText = inital_time_val;

function generateQuestion() {
    
    // timerTextBox.innerText = inital_time_val;

    let num1 = getRandomInt(20);
    let num2 = getRandomInt(20);

    let operator = pickRandomMathematicalOperator()
    ourQuestion = ` ${num1} ${operator} ${num2}`
    answer = eval(ourQuestion).toFixed(2)
    question.innerText = ourQuestion
}

generateQuestion();

const timer = setInterval(() => {
    time = timerTextBox.innerText
    if (time == 0) 
    {   
        if(question_count == 0) 
        {
            clearInterval(timer)
            userAnsTextBox.style.pointerEvents = "none"
        }
        quizbackend();
        timerTextBox.innerText = inital_time_val
        
    }
    else timerTextBox.innerText = time - 1
    // console.log(time)
}, 1000)

function quizbackend()
{
    userAns = userAnsTextBox.value.toFixed(2)
    userAnsTextBox.value = ""

    if (userAns == answer && time!= 0 ) {
        score++
    }

    else
    {
        quizAnswers.set(ourQuestion, answer);
    }

    if (--question_count === 0) {
        alert('Quiz has ended')
        quiz.innerHTML = `<div>score: ${score} </div>`;
        // timerContainer.innerHTML = ""
        let quizAnswersHtml = ""
        quizAnswers.forEach((val,key)=>{
            quizAnswersHtml+= `<li> ${key} : ${val} </li>`
        })
        quizAnswersDiv.innerHTML = quizAnswersHtml
        console.log(quizAnswers);
        return;
        // showScore();
    }

    scoreTextBox.innerText = score
    correctAnsTextBox.innerText = answer
    console.log(userAns, answer, score);
    setTimeout(generateQuestion, 500);
}

submit.addEventListener('click', (e) => {
    e.preventDefault()
    quizbackend();
})

