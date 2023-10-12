var startBtn = document.getElementById('startBtn');
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

var timer = 30;
var currentQuestionIndex = 0;

const questions = [{
        question: "Which of these is not a JavaScript data type?",
        choices: ["Number", "String", "Boolean", "Table"],
        answer: "Table"
    },
    {
        question: "Which method can turn a JSON string into a JavaScript object?",
        choices: ["JSON.stringify()", "JSON.parse()", "JSON.toObject()", "JSON.toString()"],
        answer: "JSON.parse()"
    }
    // Add more questions as needed
];
function startQuiz() {
    startBtn.classList.add('hidden');
    quizDiv.classList.remove('hidden');
    askQuestion();
    setInterval(function() {
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

function endQuiz() {
    quizDiv.classList.add('hidden');
    endDiv.classList.remove('hidden');
    scoreSpan.textContent = timer;
}

startBtn.addEventListener('click', startQuiz);
goBackBtn.addEventListener('click', () => location.reload()); // Reload the page to restart
// Implement clearScoresBtn and submitScoreBtn functionality as needed.

// ... [Previous Code] ...

const highScoresDiv = document.createElement('div'); // to display high scores

function endQuiz() {
    quizDiv.classList.add('hidden');
    endDiv.classList.remove('hidden');
    scoreSpan.textContent = timer;
    saveHighScore(timer);
}

function saveHighScore(score) {
    const storedScores = JSON.parse(localStorage.getItem("highScores") || "[]");
    const userInitials = initialsInput.value;
    storedScores.push({ initials: userInitials, score: score });
    localStorage.setItem("highScores", JSON.stringify(storedScores));
}

function displayHighScores() {
    const storedScores = JSON.parse(localStorage.getItem("highScores") || "[]");
    highScoresDiv.innerHTML = "<h2>High Scores:</h2>";
    storedScores.forEach(scoreObj => {
        highScoresDiv.innerHTML += `<p>${scoreObj.initials} - ${scoreObj.score}</p>`;
    });
    document.body.appendChild(highScoresDiv); // Add the scores div to the body
}

clearScoresBtn.addEventListener('click', () => {
    localStorage.removeItem("highScores");
    highScoresDiv.innerHTML = ""; // Clear displayed scores
});

// Call the display function to show any stored scores on page load
displayHighScores();

