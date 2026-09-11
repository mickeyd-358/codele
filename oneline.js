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
        date: "2026-09-06",
        language: "JavaScript",
        difficulty: "easy",

        prompt: "Return the number of elements in the array.",

        starterCode: `const numbers = [4, 8, 15, 16, 23, 42];`,

        acceptedAnswers: [
            "numbers.length"
        ],

        explanation:
            "The length property returns the number of elements in an array."
    },


    {
        date: "2026-09-07",
        language: "Python",
        difficulty: "easy",

        prompt: "Convert the string to uppercase.",

        starterCode: `text = "codele"`,

        acceptedAnswers: [
            "text.upper()"
        ],

        explanation:
            "The upper() method returns a new string with all letters converted to uppercase."
    },


    {
        date: "2026-09-08",
        language: "JavaScript",
        difficulty: "easy",

        prompt: "Return the last element of the array.",

        starterCode: `const numbers = [10, 20, 30, 40, 50];`,

        acceptedAnswers: [
            "numbers[numbers.length-1]"
        ],

        explanation:
            "Array indexes start at 0, so the last element is found at index length - 1."
    },


    {
        date: "2026-09-09",
        language: "Python",
        difficulty: "easy",

        prompt: "Return the string in reverse.",

        starterCode: `text = "Codele"`,

        acceptedAnswers: [
            "text[::-1]"
        ],

        explanation:
            "Python slicing with a step of -1 creates a reversed copy of the string."
    },


    {
        date: "2026-09-10",
        language: "JavaScript",
        difficulty: "medium",

        prompt: "Return a new array containing only the even numbers. Use filter().",

        starterCode: `const numbers = [1, 2, 3, 4, 5, 6];`,

        acceptedAnswers: [
            "numbers.filter(n=>n%2===0)",
            "numbers.filter(number=>number%2===0)"
        ],

        explanation:
            "filter() creates a new array containing only elements that satisfy the given condition."
    },


    {
        date: "2026-09-11",
        language: "Python",
        difficulty: "medium",

        prompt: "Return a new list containing only the even numbers. Use a list comprehension and 'n' as the variable name.",

        starterCode: `numbers = [1, 2, 3, 4, 5, 6]`,

        acceptedAnswers: [
            "[n for n in numbers if n % 2 == 0]"
        ],

        explanation:
            "A list comprehension provides a compact way to create a list by filtering the original values."
    },


    {
        date: "2026-09-12",
        language: "JavaScript",
        difficulty: "medium",

        prompt: "Return the largest number in the array. Use Math.max().",

        starterCode: `const numbers = [12, 45, 7, 89, 23];`,

        acceptedAnswers: [
            "Math.max(...numbers)"
        ],

        explanation:
            "The spread operator (...) expands the array into individual arguments for Math.max()."
    },


    {
        date: "2026-09-13",
        language: "Python",
        difficulty: "medium",

        prompt: "Return the number of items in the list that are greater than 10. Use 'n' as the variable name.",

        starterCode: `numbers = [4, 12, 7, 25, 18, 3];`,

        acceptedAnswers: [
            "sum(n > 10 for n in numbers)"
        ],

        explanation:
            "In Python, True behaves like 1 and False behaves like 0. sum() therefore counts how many values satisfy the condition."
    },


    {
        date: "2026-09-14",
        language: "JavaScript",
        difficulty: "medium",

        prompt: "Return a new array where every number has been doubled. Use map().",

        starterCode: `const numbers = [1, 2, 3, 4];`,

        acceptedAnswers: [
            "numbers.map(n=>n*2)",
            "numbers.map(number=>number*2)"
        ],

        explanation:
            "map() creates a new array by applying a function to every element."
    },


    {
        date: "2026-09-15",
        language: "Python",
        difficulty: "hard",

        prompt: "Return the sum of all numbers in the list. Use sum() and a generator expression.",

        starterCode: `numbers = [5, 10, 15, 20];`,

        acceptedAnswers: [
            "sum(n for n in numbers)"
        ],

        explanation:
            "The generator expression produces each number from the list, and sum() adds them together."
    },


    {
        date: "2026-09-16",
        language: "JavaScript",
        difficulty: "hard",

        prompt: "Return the sum of all numbers in the array. Use reduce().",

        starterCode: `const numbers = [5, 10, 15, 20];`,

        acceptedAnswers: [
            "numbers.reduce((sum,n)=>sum+n,0)",
            "numbers.reduce((total,n)=>total+n,0)"
        ],

        explanation:
            "reduce() combines all elements into a single value. Starting at 0, each number is added to the running total."
    },


    {
        date: "2026-09-17",
        language: "Python",
        difficulty: "hard",

        prompt: "Return the sum of all even numbers in the list. Use 'n' or 'number' as your variable name.",

        starterCode: `numbers = [1, 2, 3, 4, 5, 6]`,

        acceptedAnswers: [
            "sum(n for n in numbers if n % 2 == 0)",
            "sum(number for number in numbers if number % 2 == 0)"
        ],

        explanation:
            "The generator expression selects only even numbers, and sum() adds them together."
    },


    {
        date: "2026-09-18",
        language: "JavaScript",
        difficulty: "hard",

        prompt: "Return an array containing only the unique values. Use a Set.",

        starterCode: `const numbers = [1, 2, 2, 3, 3, 4, 5, 5];`,

        acceptedAnswers: [
            "[...new Set(numbers)]",
            "Array.from(new Set(numbers))"
        ],

        explanation:
            "A Set stores only unique values. The spread operator (...) or Array.from() can then convert the Set back into an array."
    }

];

// =========================
// GET ELEMENTS FROM PAGE
// =========================

const gameNumber = document.getElementById("game-number");
const codeLanguage = document.getElementById("code-language");
const date = document.getElementById("date");

const answerInput = document.getElementById("answer-input");
const submitButton = document.getElementById("submit-button");
const feedback = document.getElementById("answer-feedback");
const attemptsDisplay = document.getElementById("attempts");

const userResponses = document.querySelector(".user-responses");
const explanation = document.getElementById("popup-explanation");

const difficulty = document.getElementById("difficulty");

const codePrompt = document.getElementById("prompt");
const starterCode = document.getElementById("starter-code");

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

    codePrompt.textContent =
        "Today's challenge isn't available yet";

    starterCode.textContent = "";

    codeLanguage.textContent = "";

    gameNumber.textContent = "";

    date.textContent = today;

    answerInput.disabled = true;

    submitButton.disabled = true;

} else {

    codeLanguage.textContent =
        todayQuestion.language;

    date.textContent =
        today;

    codePrompt.textContent =
        todayQuestion.prompt;

    starterCode.textContent =
        todayQuestion.starterCode;

    difficulty.textContent =
        todayQuestion.difficulty.toUpperCase();

    difficulty.classList.remove(
        "easy",
        "medium",
        "hard"
    );

    difficulty.classList.add(
        todayQuestion.difficulty
    );

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

    const answerText =
        document.createElement("span");

    answerText.textContent =
        answer;

    response.appendChild(answerText);

    if (correct) {
        response.style.backgroundColor = "green";
    } else {
        response.style.backgroundColor = "red";
    }

    userResponses.appendChild(response);

    return response;
}

function normaliseAnswer(answer) {
    return answer
        .replace(/\s+/g, "")
        .replace(/;$/, "");
}

// =========================
// RESTORE RESPONSE HISTORY
// =========================

function restoreResponses() {

    const savedAnswers =
        localStorage.getItem(
            `oneline-answers-${today}`
        );

    
    if (!savedAnswers) {
        return;
    }

    const savedUserAnswers =
        JSON.parse(savedAnswers);

    savedUserAnswers.forEach(answer => {

        userAnswers.push(answer);

        const normalisedAnswer =
            normaliseAnswer(answer);

        const isCorrect =
            todayQuestion.acceptedAnswers.some(
                answer =>
                    normaliseAnswer(answer) === normalisedAnswer
            );

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
        `oneline-answers-${today}`,
        JSON.stringify(userAnswers)
    );

    const normalisedAnswer =
        normaliseAnswer(userAnswer);

    const isCorrect =
        todayQuestion.acceptedAnswers.some(
            acceptedAnswer =>
                normaliseAnswer(acceptedAnswer) === normalisedAnswer
        );

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
            `oneline-solved-${today}`,
            "true"
        );

        localStorage.setItem(
            `oneline-attempts-${today}`,
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
                `✕ Out of attempts. Check the solution in the results.`;

            feedback.className =
                "answer-feedback incorrect";

            answerInput.disabled = true;

            submitButton.disabled = true;


            // Save completion for today

            localStorage.setItem(
                `oneline-solved-${today}`,
                "true"
            );

            localStorage.setItem(
                `oneline-attempts-${today}`,
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


    explanation.textContent = todayQuestion.explanation;

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
                todayQuestion.acceptedAnswers.some(
                    acceptedAnswer =>
                        normaliseAnswer(acceptedAnswer) ===
                        normaliseAnswer(answer)
                )
            ) {
                return "🟩";
            }

            return "🟥";

        });


    return `One Line ${gameNumber.textContent} ${attempts}/6

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

window.addEventListener("load", () => {

    if (!todayQuestion) {
        return;
    }

    // Restore previous answers
    restoreResponses();

    const alreadySolved =
        localStorage.getItem(
            `oneline-solved-${today}`
        );

    if (alreadySolved === "true") {

        const savedAttempts =
            localStorage.getItem(
                `oneline-attempts-${today}`
            );

        solved = true;

        answerInput.disabled = true;

        submitButton.disabled = true;

        displayPopup(
            "Completed!",
            savedAttempts
        );

    }

});