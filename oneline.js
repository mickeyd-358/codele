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
let todayQuestion = null;

const userAnswers = [];


// =========================
// DISPLAY TODAY'S QUESTION
// =========================

function displayTodayQuestion() {

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
}


// ===================================
// LOAD TODAY'S QUESTION FROM SUPABASE
// ===================================

async function loadTodayQuestion() {

    const { data, error } =
        await supabaseClient
            .from("questions")
            .select("*")
            .eq("game", "one-line")
            .eq("date", today)
            .single();

    if (error) {

        console.error(
            "Failed to load today's question:",
            error
        );

        codePrompt.textContent =
            "Today's challenge isn't available yet";

        starterCode.textContent = "";

        codeLanguage.textContent = "";

        gameNumber.textContent = "";

        date.textContent =
            today;

        answerInput.disabled = true;

        submitButton.disabled = true;

        return;
    }

    todayQuestion = data;

    gameNumber.textContent =
        `#${todayQuestion.id}`;

    displayTodayQuestion();
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

// =========================
// NORMALISE ANSWER
// =========================

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
                acceptedAnswer => normaliseAnswer(acceptedAnswer) === normalisedAnswer
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
                normaliseAnswer(acceptedAnswer) ===
                normalisedAnswer
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


        displayPopup("Correct!", attempts);

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
                "✕ Out of attempts. Check the solution in the results.";

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

    popupGameNumber.textContent = `#${todayQuestion.id}`;
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

            const isCorrect =
                todayQuestion.acceptedAnswers.some(
                    acceptedAnswer =>
                        normaliseAnswer(acceptedAnswer) ===
                        normaliseAnswer(answer)
                );

            if (isCorrect) {
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

submitButton.addEventListener(
    "click",
    checkAnswer
);

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

window.addEventListener(
    "load",
    async () => {

        await loadTodayQuestion();

        if (!todayQuestion) {
            return;
        }

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
    }
);