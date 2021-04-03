import React, { useState } from "react";
import Select, { ActionMeta } from "react-select";
import chroma from "chroma-js";

const options = [
    { value: "ocean", label: "Dropped", color: "red" },
    { value: "blue", label: "Finished", color: "green" },
    { value: "purple", label: "Stalled", color: "yellow" },
    { value: "gray", label: "All", color: "gray" },
];

const dot = (color = "gray") => ({
    alignItems: "center",
    display: "flex",
    ":before": {
        backgroundColor: color,
        borderRadius: 10,
        content: '" "',
        display: "block",
        marginRight: 8,
        height: 10,
        width: 10,
    },
});

const colourStyles = {
    control: (styles) => ({
        ...styles,
        backgroundColor: "white",
        width: "135px",
    }),
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
                ? "#ccc"
                : isSelected
                    ? chroma.contrast(color, "white") > 2
                        ? "white"
                        : "black"
                    : data.color,
            cursor: isDisabled ? "not-allowed" : "default",

            ":active": {
                ...styles[":active"],
                backgroundColor:
                    !isDisabled && (isSelected ? data.color : color.alpha(0.3).css()),
            },
        };
    },
    input: (styles) => ({ ...styles, ...dot() }),
    singleValue: (styles, { data }) => ({
        ...styles,
        ...dot(data.color),
        color: "white",
        fontSize: "0px",
    }),
};

interface MultiSelectProps {
    headerHandler: (filterType: string,
        value: string,
        context: string) => void
}

export const MultiSelect = ({headerHandler} : MultiSelectProps) => {
    const [color, setColor] = useState("gray");

    const handleChange = (value: any, actionMeta: ActionMeta<any>) => {
        setColor(value.color);

        headerHandler('multiselect', 'Status', value.label)
    };

    return (
        <form>
            <label
                className={` transform -translate-x-10 translate-y-2.5
                    
                    absolute text-${color}-600 z-20 inline-block
                    
                    text-gray-800 text-sm uppercase font-bold
                    `}
                id="status-select"
                htmlFor="aria-example-input"
            >
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
    );
};
