import React, { useState } from "react";
import Select, { ActionMeta } from "react-select";
import chroma from "chroma-js";

const options = [
  { value: "All", label: "All 🌌", color: "#9CA3AF" },
  { value: "Playing", label: "Playing 🎵", color: "#818CF8" },
  { value: "Finished", label: "Finished ✅", color: "#34D399" },
  { value: "Stalled", label: "Stalled 🟨", color: "#FBBF24" },
  { value: "Dropped", label: "Dropped ❌", color: "#F87171" },
];

const dot = (color = "gray") => ({
  alignItems: "center",
  top: "55%",
  display: "flex",
  ":before": {
    backgroundColor: color,
    borderRadius: 10,
    content: '" "',
    display: "block",
    marginRight: 10,
    marginTop: -2,
    height: 8,
    width: 8,
  },
});

interface OptionProps {
  data: any;
  isDisabled: boolean;
  isFocused: boolean;
  isSelected: boolean;
}

const colourStyles = {
  control: (styles: any) => ({
    ...styles,
    backgroundColor: "white",
    width: "135px",
  }),
  option: (
    styles: any,
    { data, isDisabled, isFocused, isSelected }: OptionProps
  ) => {
    const color = chroma(data.color);
    return {
      ...styles,
      height: "2em",
      fontSize: "0.75rem",
      marginTop: "0.25rem",
      alignItems: "center",
      justifyContent: "center",
      display: "flex",
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
  input: (styles: any) => ({ ...styles, ...dot() }),
  singleValue: (styles: any, { data }: any) => ({
    ...styles,
    ...dot(data.color),
    color: "transparent",
    fontSize: "0px",
  }),
};

interface MultiSelectProps {
  headerHandler: (filterType: string, value: string, context: string) => void;
}

export const MultiSelect = ({ headerHandler }: MultiSelectProps) => {
  const [color, setColor] = useState("gray");

  const handleChange = (value: any, actionMeta: ActionMeta<any>) => {
    setColor(value.color);
    headerHandler("multiselect", "Status", value.value);
  };

  return (
    <form>
      <label
        className={` transform -translate-x-12 translate-y-2.5
                    absolute text-${color}-600 z-20 
                    text-gray-800 text-sm uppercase font-bold select-none
                    `}
        id="status-select"
        htmlFor="aria-example-input"
      >
        <span className="flex justify-center">Status</span>
      </label>

      <Select
        defaultValue={options[0]}
        label="Single select"
        options={options}
        styles={colourStyles}
        onChange={handleChange}
        instanceId="zzzz"
        isSearchable={false}
      />
    </form>
  );
};
