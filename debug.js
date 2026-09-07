// =====================================
// TODAY'S DATE (in the user's location)
// =====================================

function getToday() {

    const date = new Date();

    const year = date.getFullYear();

    const month =
        String(date.getMonth() + 1).padStart(2, "0");

    const day =
        String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
}

const today = getToday();

// =========================
// QUESTION BANK
// =========================

const questions = [

    {
        date: "2026-09-07",
        language: "JavaScript",
        difficulty: "Easy",
        errorType: "Logic Error",
        code: `1\tlet numbers = [2, 4, 6, 8];
2\t
3\tlet total = 0;
4\t
5\tfor (let i = 0; i <= numbers.length; i++) {
6\t    total += numbers[i];
7\t}
8\t
9\tconsole.log(total);`,

        bugLine: 5,

        explanation:
            "The loop uses <= instead of <. This causes the loop to run one extra time because the final valid array index is numbers.length - 1.",

        fix:
            "Change <= to < so the loop stops before reaching numbers.length."
    },


    {
        date: "2026-09-08",
        language: "Python",
        difficulty: "Easy",
        errorType: "Logic Error",

        code: `1\tnumbers = [1, 2, 3, 4, 5]
2\t
3\ttotal = 0
4\t
5\tfor number in numbers:
6\t    total += numbers
7\t
8\tprint(total)`,

        bugLine: 6,

        explanation:
            "The loop stores each individual value in the variable 'number', but the code tries to add the entire 'numbers' list to total.",

        fix:
            "Change 'total += numbers' to 'total += number'."
    },


    {
        date: "2026-09-12",
        language: "JavaScript",
        difficulty: "Easy",
        errorType: "Logic Error",

        code: `1\tlet score = 10;
2\t
3\tif (score = 10) {
4\t    console.log("Perfect!");
5\t} else {
6\t    console.log("Try again!");
7\t}`,

        bugLine: 3,

        explanation:
            "The condition uses the assignment operator = instead of the comparison operator ===. This assigns 10 to score instead of checking whether score is 10.",

        fix:
            "Change 'score = 10' to 'score === 10'."
    },


    {
        date: "2026-09-13",
        language: "Python",
        difficulty: "Easy",
        errorType: "Logic Error",

        code: `1\tdef multiply(a, b):
2\t    result = a * b
3\t
4\tprint(multiply(4, 5))`,

        bugLine: 4,

        explanation:
            "The function calculates the result but never returns it. As a result, calling multiply(4, 5) produces None.",

        fix:
            "Add 'return result' inside the function."
    },


    {
        date: "2026-09-14",
        language: "JavaScript",
        difficulty: "Medium",
        errorType: "Logic Error",

        code: `1\tlet numbers = [1, 2, 3, 4];
2\t
3\tlet doubled = numbers.forEach(n => n * 2);
4\t
5\tconsole.log(doubled);`,

        bugLine: 3,

        explanation:
            "forEach() executes a function for every item but does not create or return a new array. The variable doubled therefore becomes undefined.",

        fix:
            "Use map() instead of forEach() when you want to create a new array."
    },


    {
        date: "2026-09-17",
        language: "JavaScript",
        difficulty: "Medium",
        errorType: "Logic Error",

        code: `1\tfunction square(number) {
2\t    number * number;
3\t}
4\t
5\tlet result = square(5);
6\t
7\tconsole.log(result);`,

        bugLine: 2,

        explanation:
            "The multiplication is calculated but the result is not returned from the function. The function therefore returns undefined.",

        fix:
            "Add 'return' before 'number * number'."
    },


    {
        date: "2026-09-18",
        language: "Python",
        difficulty: "Easy",
        errorType: "Runtime Error",

        code: `1\tcolours = ["red", "blue", "green"]
2\t
3\tprint(colours[3])`,
        bugLine: 3,

        explanation:
            "Python lists use zero-based indexing. The list has indexes 0, 1 and 2, so index 3 does not exist.",

        fix:
            "Use a valid index such as colours[2] to access the third item."
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

function addResponse(answer, correct) {

    const response =
        document.createElement("div");

    response.className =
        "user-response";

    response.innerHTML = `
        <span>${answer}</span>
    `;

    if (correct) {
        response.style.backgroundColor = "green";
    } else {
        response.style.backgroundColor = "red";
    }

    userResponses.appendChild(response);

    return response;
}

// =========================
// RESTORE RESPONSE HISTORY
// =========================

function restoreResponses() {

    const savedAnswers =
        localStorage.getItem(
            `debug-answers-${today}`
        );

    if (!savedAnswers) {
        return;
    }

    const savedUserAnswers =
        JSON.parse(savedAnswers);

    savedUserAnswers.forEach(answer => {

        userAnswers.push(answer);

        const isCorrect =
            Number(answer) === todayQuestion.bugLine;

        addResponse(
            answer,
            isCorrect
        );

    });

    attempts =
        savedUserAnswers.length;

    attemptsDisplay.textContent =
        attempts;
}


// =========================
// CHECK ANSWER
// =========================

function checkAnswer() {

    if (!todayQuestion || solved) {
        return;
    }

    const userAnswer =
        answerInput.value.trim();

    if (userAnswer === "") {
        return;
    }

    attempts++;

    attemptsDisplay.textContent =
        attempts;

    userAnswers.push(
        userAnswer
    );

    localStorage.setItem(
        `debug-answers-${today}`,
        JSON.stringify(userAnswers)
    );

    // Convert input to a number
    const answerNumber =
        Number(userAnswer);

    const isCorrect =
        answerNumber === todayQuestion.bugLine;

    addResponse(
        userAnswer,
        isCorrect
    );


    // =========================
    // CORRECT ANSWER
    // =========================

    if (isCorrect) {

        solved = true;

        feedback.textContent =
            "✓ Correct!";

        feedback.className =
            "answer-feedback correct";

        answerInput.disabled = true;

        submitButton.disabled = true;


        // Save completion for today

        localStorage.setItem(
            `debug-solved-${today}`,
            "true"
        );

        localStorage.setItem(
            `debug-attempts-${today}`,
            attempts
        );


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
                `✕ Out of attempts. The bug was on line ${todayQuestion.bugLine}`;

            feedback.className =
                "answer-feedback incorrect";

            answerInput.disabled = true;

            submitButton.disabled = true;


            // Save completion for today

            localStorage.setItem(
                `debug-solved-${today}`,
                "true"
            );

            localStorage.setItem(
                `debug-attempts-${today}`,
                attempts
            );


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
                Number(answer) === todayQuestion.bugLine
            ) {
                return "🟩";
            }

            return "🟥";

        });


    return `Debug It ${gameNumber.textContent} ${attempts}/6

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
// RESTORE GAME
// =========================

window.onload = function () {

    if (!todayQuestion) {
        return;
    }

    // Restore previous answers
    restoreResponses();


    const alreadySolved =
        localStorage.getItem(
            `debug-solved-${today}`
        );


    if (alreadySolved === "true") {

        const savedAttempts =
            localStorage.getItem(
                `debug-attempts-${today}`
            );

        solved = true;

        answerInput.disabled = true;

        submitButton.disabled = true;

        displayPopup(
            "Completed!",
            savedAttempts
        );

    }

};