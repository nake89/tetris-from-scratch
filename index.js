var stdin = process.stdin
stdin.setRawMode(true)
stdin.resume()
stdin.setEncoding('utf8')
const height = 20
const width = 10

const jPiece = [
  [0, 1, 0],
  [0, 1, 0],
  [1, 1, 0],
]

// const lPiece = [
//   [0, 1, 0, 0],
//   [0, 1, 0, 0],
//   [0, 1, 0, 0],
//   [0, 1, 1, 0],
// ]

function getBorderedBoard() {
  let board = []
  for (let i = 0; i < height + 2; i++) {
    // generate first row
    if (i === 0) {
      board.push(generateFirstRow())
    }

    if (i !== 0 || i !== height + 1) {
      board.push(generateMidRow())
    }

    if (i === height + 1) {
      board.push(generateLastRow())
    }
  }
  return board
}
let x = 5
let rotate = 0
let currentPiece = 'j'
async function drawBoard() {
  let board = getBorderedBoard()
  // console.log(board.length)
  // console.log(newBoard.length)
  let d = 0
  while (true) {
    console.clear()
    let newBoard = addPieceToBoard(x, d, piece(), board)
    d++
    for (let i = 0; i < height + 4; i++) {
      printRow(newBoard[i])
    }
    if (currentPiece === 'j' && rotate === 0 && d > 20) {
      board = newBoard
      d = 0
    }
    if (currentPiece === 'j' && rotate === 1 && d > 21) {
      board = newBoard
      d = 0
    }
    if (currentPiece === 'j' && rotate === 2 && d > 20) {
      board = newBoard
      d = 0
    }
    // if (d > 20) {
    //   break
    // }
    await sleep(75)
  }
}

function piece() {
  if (rotate === 1) {
    return rotatePiece(jPiece)
  }
  if (rotate === 2) {
    return rotatePiece(rotatePiece(jPiece))
  }
  if (rotate === 3) {
    return rotatePiece(rotatePiece(rotatePiece(jPiece)))
  }
  return jPiece
}

// https://stackoverflow.com/questions/17470554/how-to-capture-the-arrow-keys-in-node-js
stdin.on('data', function (key) {
  if (key == '\u001B\u005B\u0041') {
    // process.stdout.write('up')
    if (rotate < 3) {
      rotate++
    } else {
      rotate = 0
    }
  }
  if (key == '\u001B\u005B\u0043') {
    // process.stdout.write('right')
    x++
  }
  if (key == '\u001B\u005B\u0042') {
    process.stdout.write('down')
  }
  if (key == '\u001B\u005B\u0044') {
    // process.stdout.write('left')
    x--
  }

  if (key == '\u0003') {
    process.exit()
  } // ctrl-c
})
function addPieceToBoard(x, y, piece, board) {
  var newArray = board.map(function (arr) {
    return arr.slice()
  })
  for (let i = 0; i < piece.length; i++) {
    for (let j = 0; j < piece[i].length; j++) {
      if (piece[i][j] === 1) {
        newArray[i + y][j + x] = '#'
      }
    }
  }
  return newArray
}

drawBoard()
// let b = getBorderedBoard()
// console.log('bordered board')
// console.log(b)
function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms)
  })
}
function generateFirstRow() {
  let row = []
  for (let i = 0; i < width + 2; i++) {
    row[i] = 'X'
  }
  return row
}

function generateMidRow() {
  let row = []
  for (let i = 0; i < width + 2; i++) {
    if (i === 0 || i === width + 1) {
      row[i] = 'X'
    } else {
      row[i] = ' '
    }
  }
  return row
}

function generateLastRow() {
  let row = []
  for (let i = 0; i < width + 2; i++) {
    row[i] = 'X'
  }
  return row
}

function printRow(row) {
  let rowString = ''
  for (let i = 0; i < width + 2; i++) {
    rowString += row[i] + ' '
  }
  console.log(rowString)
}

function rotatePiece(arrayPiece) {
  var newArray = arrayPiece.map(function (arr) {
    return arr.slice()
  })
  return newArray[0].map((val, index) =>
    newArray.map((row) => row[index]).reverse()
  )
}

// // https://stackoverflow.com/questions/17428587/transposing-a-2d-array-in-javascript
// function transpose(matrix) {
//   const rows = matrix.length,
//     cols = matrix[0].length
//   const grid = []
//   for (let j = 0; j < cols; j++) {
//     grid[j] = Array(rows)
//   }
//   for (let i = 0; i < rows; i++) {
//     for (let j = 0; j < cols; j++) {
//       grid[j][i] = matrix[i][j]
//     }
//   }
//   return grid
// }
