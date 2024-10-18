let tiles = document.querySelectorAll('.box');
let statusText = document.querySelector('.game-status');
let resetBtn = document.querySelector('.reset-btn');

let turn = 'O';
let currState = Array(9).fill("")
let gameOver = false;

const getWinner = (currState)=> {
    // 0 1 2
    // 3 4 5
    // 6 7 8
    const winningPattern = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ]
    for (let i = 0; i < winningPattern.length; i++) {
        const [x, y, z] = winningPattern[i];
        if (currState[x] && currState[x] === currState[y] && currState[y] === currState[z] && currState[x] === currState[z])
            return currState[x];
    }
    return null;
}

const updateStatus = ()=>{
    // cases for wining, draw and current turn status

    if (!getWinner(currState) && currState.every((item) => item !== "")){
        statusText.innerHTML = `<span class="special-text">Match is Draw!</span> Please restart the game`;
        gameOver = !gameOver;
    }
    else if (getWinner(currState)){
        statusText.innerHTML = `Winner is <span class="special-text">${getWinner(currState)}</span>`;
        gameOver = !gameOver;
    }
    else{
        statusText.innerHTML = `Current Player is <span class="special-text">${turn}</span>`
    }
}

const resetGame = ()=>{
    turn = 'O';
    currState = Array(9).fill("")
    gameOver = false;
    statusText.innerHTML = ""
    tiles.forEach((tile)=>{
        tile.innerHTML = ""
    })
}
resetBtn.addEventListener('click', ()=>{
    resetGame();
})
tiles.forEach((tile, ind)=>{
    tile.addEventListener('click', ()=>{
        if(!gameOver && tile.innerHTML==""){
            tile.innerHTML = turn;
            currState[ind] = turn;
            turn =='O' ? turn='X' : turn='O';
            console.log(currState);
            updateStatus();
        }
    })
})
