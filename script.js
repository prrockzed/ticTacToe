const x_class = 'x'
const o_class = 'o'
let oTurn

const winning_combinations = [
  [0,1,2],
  [3,4,5],
  [6,7,8],
  [0,3,6],
  [1,4,7],
  [2,5,8],
  [0,4,8],
  [2,4,6]
]

const cellElements = document.querySelectorAll('[data-cell]')
const board = document.getElementById('board')
const winningMessageTextElement = document.querySelectorAll('[data-winning-message-text]')

startGame()

function startGame() {
  oTurn = false
  cellElements.forEach(cell => {
    cell.addEventListener('click', handleClick, { once: true });
  });
  setBoardHoverClass()
}

function handleClick(e) {
  const cell = e.target;
  const currentClass = oTurn ? o_class : x_class;
  placeMark(cell, currentClass)

  if(checkWin(currentClass)) {
    endgame(false)
  }

  swapTurns()
  setBoardHoverClass()
}

function endgame(draw) {
  if (draw) {

  } else {
    winningMessageTextElement.innerText = `${oTurn ? "O's" : "X's"} Wins!!`
  }
}

function placeMark(cell, currentClass) {
  cell.classList.add(currentClass)
}

function swapTurns() {
  oTurn = !oTurn;
}

function setBoardHoverClass() {
  board.classList.remove(x_class)
  board.classList.remove(o_class)
  if(oTurn) {
    board.classList.add(o_class)
  } else {
    board.classList.add(x_class)
  }
}

function checkWin(currentClass) {
  return winning_combinations.some(combination => {
    return combination.every(index => {
      return cellElements[index].classList.contains(currentClass)
    })
  })
}