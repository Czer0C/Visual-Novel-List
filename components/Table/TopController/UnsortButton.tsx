import React from 'react';
import { Button } from '../../common/Button';

interface UnsortButtonProps {
  unsort: () => void,
  sorted: boolean
}

export const UnsortButton = ({ unsort, sorted }: UnsortButtonProps) => {
  return (
    <Button
      className={`
          flex-shrink-0 px-4 py-2.5 text-base font-semibold
        text-white rounded-lg shadow-lg text-center transform 
        bg-blue-400 transition duration-200 ease-in-out mr-1.5         
          ${
            !sorted ? 
            "disabled:opacity-75 cursor-not-allowed" :
            "bg-blue-700 hover:translate-y-1"            
          }
        `}
      eventHandler={unsort}
      disabled={!sorted}
    >
      Unsort
    </Button>
  )
}
