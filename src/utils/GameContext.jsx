import { createContext, useState } from 'react'

export const GameContext = createContext ()

export const GameProvider = ( { children } ) => { 
	const [ loose , setLoose ] = useState(false) 
  const [ win , setWin ] = useState(false) 
	const [ count , setCount ] = useState(0)

	return (
		< GameContext.Provider value={ { loose , setLoose , win , setWin , count , setCount } } > 
			{ children }
		</ GameContext.Provider >
	)
}