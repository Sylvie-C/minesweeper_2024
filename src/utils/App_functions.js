
// Board Size
export const boardSize = (columnsNb) => {
  let string = ""; 
  let index = 1; 
  while (index <= columnsNb) {
    string += "4em "
    index += 1
  }
  return string
}

// Generate array of 5 random numbers for bombs
export const bombsArrIndexGen = (bombsNb , tilesNb) => {
  let bombIndex = 0 ; 
  let bombIndexArr = [] ;

  for (let i=0; i<bombsNb; i++) {

    bombIndex = Math.floor ( Math.random() * tilesNb ) ; 

    if (bombIndexArr.includes(bombIndex)) {
      bombIndex = Math.floor ( Math.random() * tilesNb ) ; 
    }
    bombIndexArr.push(bombIndex) ; 
  } 

  return bombIndexArr ; 
}

// Function to add bombs on game board
export const addBombs = (board , bombsArray) => {
  const arrayOut = board.map (
    (elt , index) => {
      if (elt === null) { 
        if ( bombsArray.includes(index) ) {
          return "X" ; 
        } 
      }
      return "null" ; 
    }
  ) ;  
  return arrayOut ; 
}

// detect if a tile is at left of game board
export const left = (tileIndex , columnsNb) => { 
  const modulo = tileIndex % columnsNb ; 
  if (tileIndex === 0 || modulo === 0) {
    return true ; 
  } else {
    return false ; 
  }
}

// detect if a tile is at right of game board
export const right = (tileIndex , columnsNb) => {
  const modulo = tileIndex % columnsNb ; 
  if (tileIndex === (columnsNb-1) || modulo === (columnsNb-1) ) {
    return true ; 
  } else {
    return false; 
  }
}

// detect if a tile is at center of game board
export const center = (tileIndex , columnsNb) => {
  if ( !(right(tileIndex , columnsNb)) && !(left(tileIndex , columnsNb)) ) {
    return true ; 
  }
}

// return number of bombs around a tile
export const bombsCounter = (currentTileIndex , gameBoard , colNb) => {
  let counter = 0 ; 
  let tileAroundIndex ; 

  const centerBombOffset = [ -(colNb+1), -colNb, -(colNb-1), -1 , 1 , colNb+1 , colNb, colNb-1 ] ; 
  const leftBombOffset = [ -colNb , -(colNb-1) , +1 , +colNb , +(colNb+1) ] ; 
  const rightBombOffset = [ -(colNb+1) , -colNb , -1 , +(colNb-1) , +colNb ] ;

  // if tile is on left of game board
  if (left(currentTileIndex , colNb)) {

    for (let i=0; i<leftBombOffset.length; i++) {
      tileAroundIndex = currentTileIndex + leftBombOffset[i] ; 

      if (tileAroundIndex >= 0 && tileAroundIndex < gameBoard.length) 
      {
        if (gameBoard[tileAroundIndex] === "X") {
          counter += 1 ; 
        }
      }
    }
  }

  // if tile is on right of game board
  if (right(currentTileIndex , colNb)) {
    for (let i=0; i<rightBombOffset.length; i++) {
      tileAroundIndex = currentTileIndex + rightBombOffset[i] ; 

      if (tileAroundIndex >= 0 && tileAroundIndex < gameBoard.length)
      {if (gameBoard[tileAroundIndex] === "X") {
        counter += 1 ; 
      }}
    }
  }

  // if tile is in center of game board
  if (center(currentTileIndex , colNb)) {
    for (let i=0; i<centerBombOffset.length; i++) {
      tileAroundIndex = currentTileIndex + centerBombOffset[i] ; 

      if (tileAroundIndex >= 0 && tileAroundIndex < gameBoard.length)
      {
        if (gameBoard[tileAroundIndex] === "X") {
          counter += 1 ; 
        }
      }
    }
  }

  return counter ; 
}

// Initialize game board
export const gameBoardGen = (colsNb , bombsNb) => { 

  const rowsNb = colsNb

  const tilesNb = rowsNb * colsNb
  let gameBoard = new Array (tilesNb).fill(null)
  const bombsArr = bombsArrIndexGen (bombsNb , tilesNb)

  gameBoard = addBombs(gameBoard , bombsArr)

  let bombsAroundTile = 0
  let finalGameBoard = []
  
  for (let i=0; i<gameBoard.length; i++) {
    bombsAroundTile = bombsCounter (i , gameBoard , colsNb)
    if (gameBoard[i] === "X") {
      finalGameBoard.push("X")
    } else {
      finalGameBoard.push(bombsAroundTile)
    } 
  }

  return finalGameBoard
}