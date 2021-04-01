import React from 'react';
import { Button } from '../../common/Button';

interface ShowAllButtonProps {
  displayAll: () => void
  showAll: boolean
  disabled: boolean
}

export const ShowAllButton = ({ displayAll, showAll, disabled }: ShowAllButtonProps) => {
  console.log(`full list, `, { disabled })
  return (
    <Button
      className={`
            flex-shrink-0 px-4 py-2.5 font-semibold ml-12 
            focus:outline-none focus:ring-2 focus:ring-indigo-500 
            focus:ring-offset-2 focus:ring-offset-indigo-200
            text-white rounded-lg shadow-lg text-center transform 
             transition duration-200 ease-in-out font-sans text-lg
            
            ${disabled && 'cursor-not-allowed bg-indigo-400'}
            ${!disabled && showAll ?
          "bg-indigo-700 hover:bg-indigo-400 hover:translate-y-1 " :
          "bg-indigo-400 hover:bg-indigo-700 hover:translate-y-1 "}
            
            
            `}
      eventHandler={displayAll}
      disabled={disabled}
    >
      Full List {showAll ? 'On' : 'Off'}
    </Button>
  )
}
