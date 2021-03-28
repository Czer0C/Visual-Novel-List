import React, { useState } from "react";

interface THeaderProps {
  children: any;
  sortable?: boolean;
  align?: "center" | "left" | "right" | "justify";
}

enum Mode {
  UNSORTED = 0,
  ASCENDING = 1,
  DESCENDING = 2,
}

export const THeader = ({ children, sortable, align }: THeaderProps) => {
  const [mode, setMode] = useState(Mode.UNSORTED);

  return (
    <th
      scope="col"
      className={`w-52 px-4 py-4 bg-white text-${align || "center"} 
      border-b border-gray-200  text-gray-800 
      text-sm uppercase font-bold                    
                    ${!sortable && `pointer-events-none`}
                    ${sortable && `hover:border-gray-600 cursor-pointer `} 
                    ${mode && `border-gray-600`}
                `}
      onClick={() => setMode(((mode + 1) % 3) * (sortable ? 1 : 0))}
    >
      {children}
      {sortable && mode === Mode.DESCENDING
        ? " ↓"
        : mode === Mode.ASCENDING
        ? " ↑"
        : ""}
    </th>
  );
};
