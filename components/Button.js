import React from 'react'

export const Button = ({ className, eventHandler, text, disabled }) => {
    return (
        <button 
          type="button" 
          className={className}
          onClick={eventHandler}
          disabled={disabled}
        >
          {text}
        </button>
    )
}
