import React, { useState } from 'react'
import Select, { ActionMeta } from 'react-select'
import chroma from 'chroma-js';

const options = [
  { value: "ocean", label: 'Dropped', color: "red" },
  { value: "blue", label:  'Finished', color: "green" },
  { value: "purple", label: 'Stalled', color: "yellow" },
  { value: "gray", label: 'All', color: "gray" },
];

const dot = (color = 'gray') => ({
  alignItems: 'center',
  display: 'flex',
  ':before': {
    backgroundColor: color,
    borderRadius: 10,
    content: '" "',
    display: 'block',
    marginRight: 8,
    height: 10,
    width: 10,
  },
});

const colourStyles = {
  control: styles => ({ ...styles, backgroundColor: 'white', width: '135px' }),
  option: (styles, { data, isDisabled, isFocused, isSelected }) => {
    const color = chroma(data.color);
    return {
      ...styles,
      backgroundColor: isDisabled
        ? null
        : isSelected
        ? data.color
        : isFocused
        ? color.alpha(0.1).css()
        : null,
      color: isDisabled
        ? '#ccc'
        : isSelected
        ? chroma.contrast(color, 'white') > 2
          ? 'white'
          : 'black'
        : data.color,
      cursor: isDisabled ? 'not-allowed' : 'default',

      ':active': {
        ...styles[':active'],
        backgroundColor:
          !isDisabled && (isSelected ? data.color : color.alpha(0.3).css()),
      },
    };
  },
  input: styles => ({ ...styles, ...dot() }),
  singleValue: (styles, { data }) => ({ ...styles, ...dot(data.color), color: 'white', fontSize: '0px' }),

};


export const MultiSelect = () => {
    const [color, setColor] = useState('gray');
    
    const handleChange = (value: any, actionMeta: ActionMeta<any>) => {
        if (actionMeta.action === 'clear') {
            
        } else setColor(value.color);
    }

        return (

     <form>
      <label 
      
      
      className={
        `text-xs transform -translate-x-8 translate-y-2.5 font-bold absolute text-${color}-600 z-20 inline-block`
      }
      
      
      id="aria-label" htmlFor="aria-example-input">
        Status
      </label>


<Select
        defaultValue={options[2]}
        label="Single select"
        options={options}
        styles={colourStyles}
        
        onChange={handleChange}
      />
    </form>
        
    )
};
