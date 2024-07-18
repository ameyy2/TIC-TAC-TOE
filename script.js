document.addEventListener("DOMContentLoaded", () => {
    const boxes = document.querySelectorAll(".box");
    const resetButton = document.getElementById("reset");
    let currentPlayer = "X";
    let board = ["", "", "", "", "", "", "", "", ""];
    const winPatterns = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    const checkWin = () => {
        for (const pattern of winPatterns) {
            const [a, b, c] = pattern;
            if (board[a] && board[a] === board[b] && board[a] === board[c]) {
                pattern.forEach(index => boxes[index].style.backgroundColor = "var(--winning-blocks)");
                return true;
            }
        }
        return false;
    };

    const checkDraw = () => {
        return board.every(cell => cell !== "");
    };

    const handleBoxClick = (e) => {
        const index = e.target.dataset.index;
        if (board[index] === "") {
            board[index] = currentPlayer;
            e.target.textContent = currentPlayer;
            if (checkWin()) {
                setTimeout(() => alert(`${currentPlayer} wins!`), 100);
                boxes.forEach(box => box.removeEventListener("click", handleBoxClick));
            } else if (checkDraw()) {
                setTimeout(() => alert("It's a draw!"), 100);
            } else {
                currentPlayer = currentPlayer === "X" ? "O" : "X";
            }
        }
    };

    const resetGame = () => {
        board = ["", "", "", "", "", "", "", "", ""];
        currentPlayer = "X";
        boxes.forEach(box => {
            box.textContent = "";
            box.style.backgroundColor = "";
            box.addEventListener("click", handleBoxClick);
        });
    };

    boxes.forEach(box => box.addEventListener("click", handleBoxClick));
    resetButton.addEventListener("click", resetGame);
    resetGame(); // Initialize the game on page load
});
