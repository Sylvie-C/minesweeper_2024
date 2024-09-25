import { useState , useContext , useEffect } from "react"

import "./Modal.css"
import { GameContext } from "../../utils/GameContext"; 

export default function Modal () {
  const context = useContext ( GameContext )
  const { loose , win } = context

  const [ modalVisible , setModalVisible ] = useState(false)
  const [ text , setText ] = useState("")

  useEffect (
    () => {
      if (loose) {
        setText("Sorry, you loose ! ")
        setModalVisible(true)
      }else if (win) { 
        setText ("Congratulations, you win ! ")
        setModalVisible(true)
      }
    } , [ loose , win ]
  )

  const handleClick = () => {
    setModalVisible(false)
  }

  return (
    <>
      {
        modalVisible && 
        <div className="modal-container" >
          <div className="modal-content" >
            <p>{text}</p>
            <button onClick={ handleClick }>OK</button>
          </div>
        </div>
      }
    </>
  )
}