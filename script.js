const gameCards = document.querySelectorAll(".game-card");

const selectedTitle = document.getElementById("selected-title");
const selectedIcon = document.getElementById("selected-icon");
const startButton = document.getElementById("start-button");

const gameData = {
    debug: {
        title: "Debug It",
        icon: "🐛",
        url: "games/debug.html"
    },

    "one-line": {
        title: "One Line",
        icon: "⚡",
        url: "games/one-line.html"
    },

    output: {
        title: "What's the Output?",
        icon: ">_",
        url: "games/output.html"
    },

    puzzle: {
        title: "Code Puzzle",
        icon: "◈",
        url: "games/puzzle.html"
    }
};


let selectedGame = "debug";


// Select a game
gameCards.forEach(card => {

    card.addEventListener("click", () => {

        const game = card.dataset.game;

        selectedGame = game;

        // Remove existing selections
        gameCards.forEach(item => {
            item.classList.remove("selected");
        });

        // Select current card
        card.classList.add("selected");

        // Update bottom selection bar
        selectedTitle.textContent = gameData[game].title;
        selectedIcon.textContent = gameData[game].icon;

    });

});


// Start selected game
startButton.addEventListener("click", () => {

    const selected = gameData[selectedGame];

    console.log(`Starting ${selected.title}`);

    // For now, show a simple message.
    // Later this will navigate to the actual game.

    alert(`Starting ${selected.title}!`);

    // Later:
    window.location.href = selected.url;
});


// Start with Debug It selected
gameCards[0].classList.add("selected");



const cursorGlow = document.querySelector(".cursor-glow");

let mouseX = 0;
let mouseY = 0;

let glowX = 0;
let glowY = 0;


document.addEventListener("mousemove", (event) => {

    mouseX = event.clientX;
    mouseY = event.clientY;

});


function animateGlow() {

    glowX += (mouseX - glowX) * 0.21;
    glowY += (mouseY - glowY) * 0.21;

    cursorGlow.style.left = `${glowX}px`;
    cursorGlow.style.top = `${glowY}px`;

    requestAnimationFrame(animateGlow);

}


animateGlow();