import { useState , useContext } from "react" ; 

import "./Tile.css" ; 
import { GameContext } from "../../utils/GameContext";

export default function Tile ( { imgData , onClick } ) {
  const context = useContext (GameContext)
  const { count , setCount , loose , win } = context
  const [ showTile , setShowtile ] = useState(false)
  
  // Tile images paths
  let imgElt ; 
  switch (imgData) {
    case ("X") :
      imgElt = <img data-tileid="X" src="/assets/images/bomb.png" alt="bomb ! you loose !"/> 
    break; 
    case 0 : 
      imgElt = <img data-tileid="0" src="/assets/images/0.png" alt="0 bombs around"/>
    break; 
    case 1 : 
      imgElt = <img data-tileid="1" src="/assets/images/1.png" alt="1 bomb around"/>
    break; 
    case 2 : 
      imgElt = <img data-tileid="2" src="/assets/images/2.png" alt="2 bombs around"/>
    break; 
    case 3 : 
      imgElt = <img data-tileid="3" src="/assets/images/3.png" alt="3 bombs around"/>
    break; 
    case 4 :
      imgElt = <img data-tileid="4" src="/assets/images/4.png" alt="4 bombs around"/>
    break; 
    case 5 : 
      imgElt = <img data-tileid="5" src="/assets/images/5.png" alt="5 bombs around"/>
    break; 
    case 6 : 
      imgElt = <img data-tileid="6" src="/assets/images/6.png" alt="6 bombs around"/>
    break; 
    case 7 : 
      imgElt = <img data-tileid="7" src="/assets/images/7.png" alt="7 bombs around"/>
    break; 
    case 8 : 
      imgElt = <img data-tileid="8" src="/assets/images/8.png" alt="8 bombs around"/>
    break; 
    default : 
      imgElt = <img data-tileid="empty" src="/assets/images/empty.png" alt="empty tile"/>
  }

  // Handle tile click
  const clickedTileId = (tileId) => { onClick (tileId) }
  
  const handleClick = (event) => {
    if (!loose) {
      clickedTileId(event.currentTarget.dataset.tileid)   

      if ( !showTile ) {
        setShowtile(true)
        setCount (count+1)
      }
    }
  }

  console.log ("count from Tile : " , count)

  return (
    <div  className="tileContainer" data-tileid={imgData} 
          onClick={ (evt) => handleClick (evt) } > 
      <img className={ `empty ${ (showTile || loose || win) ? 'hide' : '' }` } src="/assets/images/empty.png" alt="empty tile" />
      { imgElt }
    </div>
  )
}
