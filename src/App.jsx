import { useState , useEffect , useContext } from "react" ;  

import './App.css'

import { boardSize , gameBoardGen } from "./utils/App_functions"
import { GameContext } from "./utils/GameContext"; 
import Tile from "./components/Tile/Tile" ; 
import Modal from "./components/Modal/Modal" ; 

// game board init
const cols = 5

const bombs = cols
const gameBoard = gameBoardGen(cols , bombs)
const boardWidth = cols * cols


export default function App() {
  const context = useContext ( GameContext )
  const { loose , win , setLoose , setWin , count , setCount } = context

  useEffect(() => {
    const mineContainer = document.querySelector(".mineContainer")
    if (mineContainer) {
      const boardStyleStr = boardSize(cols)
      mineContainer.style.gridTemplateColumns = boardStyleStr
      mineContainer.style.gridTemplateRows = boardStyleStr
    }
  }, []);


  // Handle loose / win
  const handleClick = (tileId) => {
    if (!loose) {
      setCount (count +1)
    
      if (tileId === "X") { 
        setLoose (true) 
      } 
    }
  }

  useEffect (
    () => {
      console.log ("boardWidth - bombs ? : " , boardWidth - bombs)
      if ((count === (boardWidth - bombs)) && (loose === false)) { setWin(true) }
    }
    , [count]
  )

  return (
    <>
      <div className="mineContainer" >
        { 
          gameBoard?.map( (elt , index) => (
            <Tile 
              key = { `tile${index}` } 
              imgData = { elt } 
              onClick = { (tileId) => handleClick(tileId) } 
            />
          ))
        }
      </div> 
      <Modal />
    </>
  )
}
