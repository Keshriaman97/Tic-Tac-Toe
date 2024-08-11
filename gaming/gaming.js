const boxes = document.querySelectorAll(".box");
const currnetturn = document.querySelector(".current-turn");
const startbtn = document.querySelector(".new-start");

var audio = new Audio('mixkit-arcade-game-jump-coin-216 (1).wav');
var audiowin = new Audio('mixkit-instant-win-2021.wav');
var audiodraw = new Audio('mixkit-failure-arcade-alert-notification-240.wav');
var audiostartbtn = new Audio('mixkit-gear-metallic-lock-sound-2858.wav')

let currentPlayer;
let gameGrid;
//winning positions
const winningPositions = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];
let playerb = 'XO';

function getRanPlayer() {
    return playerb.charAt(Math.floor(Math.random() * 2));
}

//let's create a function to initialise the game
function iniGame() {
    currentPlayer = getRanPlayer();
    gameGrid = ["", "", "", "", "", "", "", "", ""];
    startbtn.classList.remove("newx-startx");
    currnetturn.innerText = "Current Player - " + currentPlayer;
    boxes.forEach(function (box, index) {
        boxes[index].innerText = "";//in place of boxes[index] we can use only box also
        box.style.pointerEvents = "all"; //ye sirf pointer ko hath me badaldenga
        box.classList.remove("win");//border wil remove
    });
    audiostartbtn.play();
}
iniGame();

function swapTurn() {
    if (currentPlayer === "X") {
        currentPlayer = "O";
    } else {
        currentPlayer = "X";
    }
    //UI 
    currnetturn.innerText = `Current Player - ${currentPlayer}`; //line no 19 ki jagah use kr skte h dono same hai
}

function checkGameOver() {
    let answer = "";
    //values non empty ho aur same ho teeno pr
    winningPositions.forEach(function (position) {
        if ((gameGrid[position[0]] !== "" || gameGrid[position[1]] !== "" || gameGrid[position[2]] !== "")
            && (gameGrid[position[0]] === gameGrid[position[1]]) && (gameGrid[position[1]] === gameGrid[position[2]])) {
            if (gameGrid[position[0]] === "X")
                answer = "X";
            else
                answer = "O";

            //winner milne ke baad pointer kaam krna band kr de
            boxes.forEach(function (box) {
                box.style.pointerEvents = "none";
            })
            //now we know who (X/O) is winner so backgroud color set
            boxes[position[0]].classList.add("win");
            boxes[position[1]].classList.add("win");
            boxes[position[2]].classList.add("win");

            audiowin.play();
            currnetturn.innerText = "Winner Player - " + answer;
            startbtn.classList.add("newx-startx");
            return;
        }
    });
    //tie conditions and maybe in 9 place the winner is also possible so answer khali ho tabhi ye chale
    if (answer === "") {
        let fillcount = 0;
        gameGrid.forEach(function (value) {
            if (value !== "")
                fillcount++;
        });
        if (fillcount === 9) {
            currnetturn.innerText = "Gamen Tied";
            startbtn.classList.add("newx-startx");
            audiodraw.play();
        }
    }
}
        
function handleClick(index) {
    if (gameGrid[index] === "") {
        boxes[index].innerText = currentPlayer;
        gameGrid[index] = currentPlayer;
        audio.play();
        //ab jispr click kiya h us pr dubara ma click kre isiliye pointer event none kr diye
        boxes[index].style.pointerEvents = "none";
        //swap krna padenga
        swapTurn();
        //checking the winner
        checkGameOver();
    }
}

boxes.forEach(function (box, index) {
    box.addEventListener("click", function () {
        handleClick(index);
    });
});

startbtn.addEventListener("click", iniGame);

