// =========================
// TODAY'S DATE
// =========================

const today = new Date().toISOString().split("T")[0];


// =========================
// QUESTION BANK
// =========================

const questions = [

    {
        date: "2026-09-06",
        language: "JavaScript",
        code: `let numbers = [1, 2, 3];

let result = numbers.map(n => n * 2);

console.log(result);`,
        answer: "[2, 4, 6]"
    },

    {
        date: "2026-09-07",
        language: "Python",
        code: `def fibonacci_recursive(n):
    if n <= 0:
        return 0
    elif n == 1:
        return 1
    else:
        return fibonacci_recursive(n-1) + fibonacci_recursive(n-2)

print(fibonacci_recursive(10))`,
        answer: "55"
    },

    {
        date: "2026-09-08",
        language: "JavaScript",
        code: `let x = 5;
let y = 3;

console.log(x + y);`,
        answer: "8"
    },

    {
        date: "2026-09-09",
        language: "JavaScript",
        code: `let name = "Codele";

console.log(name.length);`,
        answer: "6"
    }

];


// =========================
// GET ELEMENTS FROM PAGE
// =========================

const codeContent = document.getElementById("code-content");
const gameNumber = document.getElementById("game-number");
const codeLanguage = document.getElementById("code-language");
const date = document.getElementById("date");

const answerInput = document.getElementById("answer-input");
const submitButton = document.getElementById("submit-button");
const feedback = document.getElementById("answer-feedback");
const attemptsDisplay = document.getElementById("attempts");

const userResponses = document.querySelector(".user-responses");

const popupOverlay = document.getElementById("popupOverlay");
const popupTitle = document.getElementById("popup-title");
const popupAttempts = document.getElementById("popup-attempts");
const popupGameNumber = document.getElementById("popup-game-number");

const shareButton = document.getElementById("share-button");


// =========================
// GAME STATE
// =========================

let attempts = 0;
let solved = false;

const userAnswers = [];


// =========================
// FIND TODAY'S QUESTION
// =========================

const todayQuestion = questions.find(
    question => question.date === today
);


// =========================
// DISPLAY TODAY'S QUESTION
// =========================

if (!todayQuestion) {

    codeContent.textContent =
        "Today's challenge isn't available yet";

    codeLanguage.textContent = "";

    gameNumber.textContent = "";

    date.textContent = today;

    answerInput.disabled = true;

    submitButton.disabled = true;

} else {

    codeContent.textContent =
        todayQuestion.code;

    codeLanguage.textContent =
        todayQuestion.language;

    date.textContent =
        today;

    gameNumber.textContent =
        `#${questions.indexOf(todayQuestion) + 1}`;

}


// =========================
// ADD RESPONSE TO HISTORY
// =========================

function addResponse(answer) {

    const response =
        document.createElement("div");

    response.className =
        "user-response";

    response.innerHTML = `
        <span>${answer}</span>
    `;

    userResponses.appendChild(response);

    return response;
}


// =========================
// CHECK ANSWER
// =========================

function checkAnswer() {

    // Don't run if there is no question
    // or the game has already finished

    if (!todayQuestion || solved) {
        return;
    }


    // Get user's answer

    const userAnswer =
        answerInput.value.trim();


    // Don't allow empty answers

    if (userAnswer === "") {
        return;
    }


    // Increase attempts

    attempts++;

    attemptsDisplay.textContent =
        attempts;


    // Save answer for sharing

    userAnswers.push(
        userAnswer
    );


    // Display answer in history

    const response =
        addResponse(userAnswer);


    // =========================
    // CORRECT ANSWER
    // =========================

    if (
        userAnswer === todayQuestion.answer
    ) {

        solved = true;


        feedback.textContent =
            "✓ Correct!";

        feedback.className =
            "answer-feedback correct";


        // Turn correct response green

        response.style.backgroundColor =
            "green";


        // Disable game

        answerInput.disabled = true;

        submitButton.disabled = true;


        // Save today's completed game

        localStorage.setItem(
            `solved-${today}`,
            "true"
        );

        localStorage.setItem(
            `attempts-${today}`,
            attempts
        );


        // Show popup

        displayPopup(
            "Correct! 🎉",
            attempts
        );

    }


    // =========================
    // INCORRECT ANSWER
    // =========================

    else {

        feedback.textContent =
            "✕ Not quite. Try again.";

        feedback.className =
            "answer-feedback incorrect";


        // =========================
        // OUT OF ATTEMPTS
        // =========================

        if (attempts >= 6) {

            solved = true;


            feedback.textContent =
                `✕ Out of attempts. The answer was ${todayQuestion.answer}`;


            // Disable game

            answerInput.disabled = true;

            submitButton.disabled = true;


            // Save today's completed game

            localStorage.setItem(
                `solved-${today}`,
                "true"
            );

            localStorage.setItem(
                `attempts-${today}`,
                attempts
            );


            // Show popup

            displayPopup(
                "Better luck tomorrow!",
                attempts
            );

        }

    }


    // Clear input

    answerInput.value = "";

}


// =========================
// DISPLAY POPUP
// =========================

function displayPopup(message, attemptCount) {

    popupOverlay.style.display =
        "block";


    popupTitle.textContent =
        message;


    popupAttempts.textContent =
        attemptCount;


    popupGameNumber.textContent =
        `#${questions.indexOf(todayQuestion) + 1}`;

}


// =========================
// CLOSE POPUP
// =========================

function closePopup() {

    popupOverlay.style.display =
        "none";

}


// =========================
// GENERATE SHARE RESULTS
// =========================

function generateShareText() {

    const result =
        userAnswers.map(answer => {

            if (
                answer === todayQuestion.answer
            ) {
                return "🟩";
            }

            return "🟥";

        });


    return `Codele ${gameNumber.textContent} ${attempts}/6

${result.join("\n")}

codele.vercel.app`;

}


// =========================
// SHARE RESULTS
// =========================

async function shareResults() {

    const shareText =
        generateShareText();


    if (navigator.share) {

        await navigator.share({

            title: "Codele",

            text: shareText

        });

    } else {

        await navigator.clipboard.writeText(
            shareText
        );

        alert(
            "Results copied to clipboard!"
        );
    }

}


// =========================
// BUTTON EVENT LISTENERS
// =========================

// Submit button

submitButton.addEventListener(
    "click",
    checkAnswer
);


// Share button

shareButton.addEventListener(
    "click",
    shareResults
);


// =========================
// ENTER KEY
// =========================

answerInput.addEventListener(
    "keydown",
    (event) => {
        if (event.key === "Enter") {
            checkAnswer();

        }
    }
);


// =========================
// RESTORE COMPLETED GAME
// =========================

window.onload = function () {
    if (!todayQuestion) {return;}

    const alreadySolved = localStorage.getItem(`solved-${today}`);

    if (alreadySolved === "true") {
        const savedAttempts = localStorage.getItem(`attempts-${today}`);

        solved = true;

        answerInput.disabled = true;
        submitButton.disabled = true;

        displayPopup("Completed!", savedAttempts);
    }
};