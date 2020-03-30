// start by grabbing DOM elements
var homeContainerEl = document.getElementById('home-container');
var startButtonEl = document.getElementById('start-btn');
var nextButtonEl = document.getElementById('next-btn');
var questionContainerEl = document.getElementById('question-container');
var questionEl = document.getElementById('question');
var answerButtonsEl = document.getElementById('answer-buttons');
var resultEl = document.querySelector('.result');
var timerEl = document.getElementById('timer');
var formContainerEl = document.querySelector('.form-container');
var submitButtonEl = document.querySelector('.submit');
var scoreboardEl = document.querySelector('#score-list');
var userNameInput; 

// hold all questions and answer choices in a variable
// in the answer choices, state which text is the correct one so that we can reference it above
const questions = [
    {
      question: 'Inside which HTML element do we reference JavaScript?',
      choices: ['<js>', '<script>', '<javascript', '<scripting>'],
      answer: '<script>'
    },
    {
      question: 'What is the correct JavaScript syntax to change the content of the HTML element <p id = "demo"> Change me </p>',
      choices: ['#demo.innerHTML = "Hello World!', 'document.getElementById("demo").innerHTML = "Hello World"', 'document.getElement("p").innerHTML = "Hello World!"', 'document.getElementByName("P").innerHTML = "Hello World!"'],
      answer: 'document.getElementById("demo").innerHTML = "Hello World"'
    },
    {
      question: 'Where is the correct place to insert a JavaScript? Choose the MOST ACCURATE answer choice.',
      choices: ['The <head> section', 'Both the <head> section and the <body> section are correct', 'The <body> section', 'The <header> section'],
      answer: 'Both the <head> section and the <body> section are correct'
    },
    {
      question: 'How do you write "Hello World" in an alert box?',
      choices: ['msg("Hello World")', 'msgBox("Hello World")', 'alertBox("Hello World")', 'alert("Hello World")'],
      answer: 'alert("Hello World")'
    }
  ]


// on click event for starting quiz
startButtonEl.addEventListener('click', startQuiz);

// function to start the quiz, start timer, and show first question
function startQuiz() {
    startButtonEl.classList.add('hide');
    homeContainerEl.classList.add('hide');
    questionContainerEl.classList.remove('hide');
    setTimer();
    getQuestion();
}

var secondsLeft = 75;
var questionNumber = -1;
var answer;

function setTimer() {
    var countdown = setInterval(function () {
        secondsLeft--;
        timerEl.textContent = "Time: " + secondsLeft;

        if (secondsLeft === 0 || questionNumber === questions.length) {
            clearInterval(countdown);
            showForm();
            questionContainerEl.classList.add('hide');

        }
    }, 1000);
}

function getQuestion() {
    questionNumber++; //goes through one question at a time
    questionEl.textContent = questions[questionNumber].question; //gets the quiz question of any given index of the questions array
    var choices = questions[questionNumber].choices;
    answer = questions[questionNumber].answer;
    answerButtonsEl.innerHTML = '';

    for (var i = 0; i < choices.length; i++) {
        var newButton = document.createElement('button'); // for each answer button, make a new button in the HTML so we can change the text content and replace the old ones
        newButton.textContent = choices[i]; //replace the text inside each of the newly made buttons
        newButton.setAttribute('class', 'btn');
        answerButtonsEl.appendChild(newButton);
    }
}

answerButtonsEl.addEventListener("click", function (event) {
    // evaluation of user's answer choices & feedback, event.target refers to whatever was just clicked
    // show whether the answer was correct or incorrect for one second before getting nexgt question
    if (answer === event.target.textContent) {   
        resultEl.textContent = 'Correct';
        setTimeout(clearResult, 500);
    } else {
        resultEl.textContent = 'Incorrect';
        setTimeout(clearResult, 500);
        secondsLeft -= 10;
    }
    // get the next question after one second, otherwise it moves immediately to the next question and the result just stays on the page for a second
    setTimeout(getQuestion, 500);
});

function clearResult() {
    resultEl.textContent = '';
}




// when we run out of questions or the timer gets to zero, show the scoreboard
function showForm() {
    formContainerEl.classList.remove('hide');
}

submitButtonEl.addEventListener("click", function(event) {
    event.preventDefault();

    var userNameInput = document.getElementById("userName").value;
    var user = {
        name: userNameInput,
        score: secondsLeft
    };


    //set new submission
    localStorage.setItem("user", JSON.stringify(user));
    // get submissions from local storage
    var highScores = JSON.parse(localStorage.getItem("user"));
    scoreboardEl.textContent = highScores;


});