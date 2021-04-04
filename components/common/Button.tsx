import React, { MouseEventHandler } from 'react';

interface ButtonProps {
  className: string | undefined
  eventHandler: MouseEventHandler
  children?: any
  disabled: boolean
}

export const Button = ({ className, eventHandler, children, disabled } : ButtonProps) => {
    return (
        <button 
          className={className}
          onClick={eventHandler}
          disabled={disabled || false}
        >
          {children}
        </button>
    )
}
