import React, { useState } from "react";

interface THeaderProps {
  children: any;
  align?: "center" | "left" | "right" | "justify";
  type: "sort" | "multiselect" | "normal";
}

enum Mode {
  UNSORTED = 0,
  ASCENDING = 1,
  DESCENDING = 2,
}

enum HeaderType {
  SORT = "sort",
  MULTISELECT = "multiselect",
  NORMAL = "normal"
}

export const THeader = ({ children, align, type }: THeaderProps) => {
  const [mode, setMode] = useState(Mode.UNSORTED);
  console.log({type})
  return (
    <th
      scope="col"
      className={`px-4 py-4 bg-white text-${align || "center"} 
      border-b border-gray-200 transition-colors ease-in  text-gray-800 
       uppercase font-bold text-base
                    ${'w-60'}
                    ${type === HeaderType.SORT && `hover:border-gray-600 cursor-pointer `} 
                    ${mode && `border-gray-600`}
                `}
      onClick={() => setMode(((mode + 1) % 3) * (type === HeaderType.SORT ? 1 : 0))}
    >
      {children}
      {type === HeaderType.SORT && mode === Mode.DESCENDING
        ? " ↓"
        : mode === Mode.ASCENDING
        ? " ↑"
        : ""}

    </th>
  );
};
