let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newGamebtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");
let turno = true; // playerX, player0

const winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8]
];

// Function to reset the game
const resetGame = () => {
    boxes.forEach((box) => {
        box.innerText = "";
        box.disabled = false;
    });
    turno = true;
    msgContainer.classList.add("hide");
};

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (turno && box.innerText === "") {
            // player0
            box.innerText = "0";
            turno = false;
            box.disabled = true;
        } else if (!turno && box.innerText === "") {
            // playerX
            box.innerText = "X";
            turno = true;
            box.disabled = true;
        }
        checkWinner();
    });
});

const checkWinner = () => {
    let winnerFound = false;
    for (let pattern of winPatterns) {
        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;
        if (pos1Val !== "" && pos1Val === pos2Val && pos2Val === pos3Val) {
            showWinner(pos1Val);
            winnerFound = true;
            break;
        }
    }
    // If no winner found and all boxes filled, it's a tie
    if (!winnerFound && checkTie()) {
        showGameTied();
    }
};

const showWinner = (winner) => {
    resetBtn.style.display = "none";
    msg.textContent = `Congratulations, Winner is ${winner}`;
    msgContainer.classList.remove("hide");
    disableboxes();
    newGamebtn.addEventListener("click", () => {
        resetBtn.style.display = "block"; // Show reset button again
        resetBtn.style.margin = "0 auto";
        resetGame();
    });
};

const showGameTied = () => {
    resetBtn.style.display = "none";
    msg.textContent = "Game tied!";
    msgContainer.classList.remove("hide");
    disableboxes();
    newGamebtn.addEventListener("click", () => {
        resetBtn.style.display = "block"; // Show reset button again
        resetBtn.style.margin = "0 auto";
        resetGame();
    });
};

resetBtn.addEventListener("click", () => {
    resetGame();
    resetBtn.style.margin = "0 auto";
});

// Initially hide the message container
msgContainer.classList.add("hide");

const disableboxes = () => {
    for (let box of boxes) {
        box.disabled = true;
    }
};

// Function to check if all boxes are filled
const checkTie = () => {
    for (let box of boxes) {
        if (box.innerText === "") {
            return false; // If any box is empty, game is not tied
        }
    }
    return true; // All boxes filled, game is tied
};
