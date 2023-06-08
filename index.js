const boxes = document.querySelectorAll(".box");
const gameInfo = document.querySelector(".game-info")
const newGameBtn = document.querySelector(".btn")

let currentPlayer;
let gameGrid;

const winningPosition =[
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]

//function to initialise the game
function initGame(){
    currentPlayer = "X";
    gameGrid = ["","","","","","","","",""]
    newGameBtn.classList.remove(".active")
    gameInfo.innerText = `Current Player - ${currentPlayer}`
    //remove the bg color after winning
    // boxes.forEach((box)=>{
    //     box.classList.remove("win")
    // })
    
    //make ui boxes empty
    boxes.forEach((box,index)=>{
        box.innerText = "";
        boxes[index].style.pointerEvents = "all"
        //removing bg effect of winning
        box.classList = `box box${index+1}`
    })
}

initGame();

function swapTurn(){
    if(currentPlayer === "X"){
        currentPlayer = "O";
    }
    else{
        currentPlayer = "X";
    }
    //Update UI
    gameInfo.innerText = `Current Player - ${currentPlayer}`
}


function checkGameOver(){

    let winner = "";
    winningPosition.forEach((position)=>{
        if((gameGrid[position[0]] !== "" || gameGrid[position[1]] !== "" || gameGrid[position[2]] !== "")
         && (gameGrid[position[0]] === gameGrid[position[1]]) && (gameGrid[position[1]] === gameGrid[position[2]]) ){

            //check if winner is X
            if(gameGrid[position[0]] === "X")
                winner = "X";
            else
                winner = "Y";

            //disable pointer event
            boxes.forEach((box)=>{
                box.style.pointerEvents = "none"
            })

            //add backgroung color for wining
            boxes[position[0]].classList.add("win")
            boxes[position[1]].classList.add("win")
            boxes[position[2]].classList.add("win")
         }
    })

    if(winner !== ""){
        gameInfo.innerText = `Winner Player - ${currentPlayer}`
        newGameBtn.classList.add("active")
    }

    //check for a tie
    let fillCount  = 0;
    gameGrid.forEach((box)=>{
        if(box !== ""){
            fillCount++;
        }
    });

    if(fillCount === 9){
        gameInfo.innerText = "Game Tied !"
        newGameBtn.classList.add("active")
        return
    }
}

function handleClick(index){
    if(gameGrid[index] === ""){
        //for ui
        boxes[index].innerText = currentPlayer;
        // for change in gameGrid 
        gameGrid[index] = currentPlayer;
        boxes[index].style.pointerEvents = "none"
        //check wheather any player win
        swapTurn();
        //check weather any one played
        checkGameOver();
        //swap turn
    }
}

boxes.forEach((box,index)=>{
    box.addEventListener("click", ()=>{
        handleClick(index)
    })
})

newGameBtn.addEventListener("click",initGame)