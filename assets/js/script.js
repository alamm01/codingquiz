const startBtn = document.getElementById('startBtn');
const quizDiv = document.getElementById('quiz');
const timerDiv = document.getElementById('timer');
const questionDiv = document.getElementById('question');
const choicesUl = document.getElementById('choices');
const feedbackDiv = document.getElementById('feedback');
const endDiv = document.getElementById('end');
const scoreSpan = document.getElementById('score');
const initialsInput = document.getElementById('initials');
const submitScoreBtn = document.getElementById('submitScore');
const goBackBtn = document.getElementById('goBack');
const clearScoresBtn = document.getElementById('clearScores');
const highScoresDiv = document.createElement('div'); 

var timer = 30;
var currentQuestionIndex = 0;
var timerInterval;

const questions = [
    {
        question: "Which of these is not a JavaScript data type?",
        choices: ["Number", "String", "Boolean", "Table"],
        answer: "Table"
    },
    {
        question: "Which method can turn a JSON string into a JavaScript object?",
        choices: ["JSON.stringify()", "JSON.parse()", "JSON.toObject()", "JSON.toString()"],
        answer: "JSON.parse()"
    },
    {
        question: "Which of these is not a JavaScript looping structure?",
        choices: ["for", "foreach", "while", "underloop"],
        answer: "underloop"
    },
    {
        question: "What does the 'this' keyword refer to inside a JavaScript object method?",
        choices: ["The window object", "The method itself", "The object the method is a part of", "Undefined"],
        answer: "The object the method is a part of"
    },
    {
        question: "What will be the output of '2' + 3 + 4 in JavaScript?",
        choices: ["9", "234", "54", "Error"],
        answer: "234"
    }
];


function startQuiz() {
    startBtn.classList.add('hidden');
    quizDiv.classList.remove('hidden');
    askQuestion();
    timerInterval = setInterval(function() {
        timer--;
        timerDiv.textContent = "Time Left: " + timer;
        if (timer <= 0) {
            endQuiz();
        }
    }, 1000);
}

function askQuestion() {
    if (currentQuestionIndex >= questions.length) {
        endQuiz();
        return;
    }

    const currentQuestion = questions[currentQuestionIndex];
    questionDiv.textContent = currentQuestion.question;
    choicesUl.innerHTML = "";

    currentQuestion.choices.forEach(choice => {
        const li = document.createElement('li');
        li.innerHTML = `<button onclick="checkAnswer('${choice}')">${choice}</button>`;
        choicesUl.appendChild(li);
    });
}

function checkAnswer(choice) {
    const correctAnswer = questions[currentQuestionIndex].answer;
    if (choice === correctAnswer) {
        feedbackDiv.textContent = "Correct!";
    } else {
        feedbackDiv.textContent = "Wrong!";
        timer -= 10;
    }
    currentQuestionIndex++;
    setTimeout(askQuestion, 1000); // Delay for 1 second before the next question
}


startBtn.addEventListener('click', startQuiz);
goBackBtn.addEventListener('click', () => location.reload()); // Reload the page to restart
// Implement clearScoresBtn and submitScoreBtn functionality as needed.

submitScoreBtn.addEventListener("click", endTheQuiz)
function endTheQuiz(){
    console.log("Quiz edded");
    scoreSpan.textContent = timer;
    saveHighScore(timer);
    
};

function endQuiz() {
    clearInterval(timerInterval); //added to fix timer not ending
    quizDiv.classList.add('hidden');
    endDiv.classList.remove('hidden');

}

function saveHighScore(score) {
    const storedScores = JSON.parse(localStorage.getItem("highScores") || "[]");
    const userInitials = initialsInput.value;
    if (score<0){
        score = 0;
    };
    storedScores.push({ initials: userInitials, score: score });
    localStorage.setItem("highScores", JSON.stringify(storedScores));
    displayHighScores();
}

function displayHighScores() {
    const storedScores = JSON.parse(localStorage.getItem("highScores") || "[]");
    highScoresDiv.innerHTML = "<h2>High Scores:</h2>";

    for (var i = 0; i < storedScores.length; i++) {
        var scoreObj = storedScores[i];
        var scoreEntry = "<p>" + scoreObj.initials + ": " + scoreObj.score + "</p>";
        highScoresDiv.innerHTML += scoreEntry;
    }
    
    document.body.appendChild(highScoresDiv); // Add the scores div to the body
}

clearScoresBtn.addEventListener('click', () => {
    localStorage.removeItem("highScores");
    highScoresDiv.innerHTML = ""; // Clear displayed scores
});

// Call the display function to show any stored scores on page load
displayHighScores();


var li = document.createElement("li");
li.innerHTML = "Forido";
document.getElementById("fruitList").appendChild(li);


var itemNew = document.createElement("li")
itemNew.innerHTML = "Item3"
var itemParent = document.getElementById("itemList");
itemParent.appendChild(itemNew);