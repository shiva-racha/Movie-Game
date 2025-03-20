const questions = [
    { lyrics: "Zindagi ek safar hai suhana", movie: "Andaz" },
    { lyrics: "Tujh mein rab dikhta hai", movie: "Rab Ne Bana Di Jodi" },
    { lyrics: "Tum paas aaye, yun muskuraye", movie: "Kuch Kuch Hota Hai" },
    { lyrics: "Agar tum saath ho", movie: "Tamasha" },
    { lyrics: "మరి అంతగా నీ జతగా ఉండాలి", movie: "Seethamma Vakitlo Sirimalle Chettu" }
];

let currentQuestion = 0;
let score = 0;

// Check if user is logged in
function checkLogin() {
    let userData = JSON.parse(localStorage.getItem("userData"));
    if (userData) {
        document.getElementById("authSection").style.display = "none";
        document.getElementById("profileSection").style.display = "block";
        document.getElementById("gameSection").style.display = "block";
        document.getElementById("username").textContent = userData.name;
        document.getElementById("logoutBtn").style.display = "block";
    }
}

// Register User
function registerUser() {
    let name = document.getElementById("usernameInput").value.trim();
    let email = document.getElementById("emailInput").value.trim();

    if (name === "" || email === "") {
        alert("Please enter both name and email!");
        return;
    }

    let userData = { name: name, email: email, score: 0 };
    localStorage.setItem("userData", JSON.stringify(userData));

    checkLogin();
}

// Logout User
document.getElementById("logoutBtn").addEventListener("click", function() {
    localStorage.removeItem("userData");
    location.reload();
});

// Game Logic
function loadQuestion() {
    document.getElementById("lyrics").textContent = questions[currentQuestion].lyrics;
    document.getElementById("userInput").value = "";
    document.getElementById("result").textContent = "";
    document.getElementById("nextBtn").style.display = "none";
}

function checkAnswer() {
    const userAnswer = document.getElementById("userInput").value.trim();
    const correctAnswer = questions[currentQuestion].movie;

    if (userAnswer.toLowerCase() === correctAnswer.toLowerCase()) {
        document.getElementById("result").textContent = "Correct! 🎉";
        document.getElementById("result").style.color = "green";
        document.getElementById("nextBtn").style.display = "inline-block";

        score++;

        let userData = JSON.parse(localStorage.getItem("userData"));
        userData.score = score;
        localStorage.setItem("userData", JSON.stringify(userData));

        document.getElementById("scoreDisplay").textContent = "Score: " + score;
    } else {
        document.getElementById("result").textContent = "Wrong! Try again. ❌";
        document.getElementById("result").style.color = "red";
    }
}

function nextQuestion() {
    currentQuestion++;
    if (currentQuestion < questions.length) {
        loadQuestion();
    } else {
        document.getElementById("lyrics").textContent = "Game Over! 🎬";
    }
}

// Load first question & check login
window.onload = function () {
    checkLogin();
    loadQuestion();
};