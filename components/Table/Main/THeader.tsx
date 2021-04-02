
import { ArrowBack } from "@components/icons/ArrowBack";
import React, { useState } from "react";

interface THeaderProps {
  children: any;
  align?: "center" | "left" | "right" | "justify";
  type: "sort" | "multiselect" | "normal";
}

enum Mode {
  UNSORTED = 0,
  ASCENDING = 2,
  DESCENDING = 1,
}

enum HeaderType {
  SORT = "sort",
  MULTISELECT = "multiselect",
  NORMAL = "normal"
}

export const THeader = ({ children, align, type }: THeaderProps) => {
  const [mode, setMode] = useState(Mode.UNSORTED);
  console.log({ type })
  return (
    <th
      scope="col"
      className={`px-1 py-4 bg-white text-${align || "center"} 
        transition-all delay-100 ease-in-out  text-gray-800 
       uppercase font-bold text-base font-serif border-b border-white
                    ${'w-96'}
                    ${type === HeaderType.SORT && `hover:border-gray-600 cursor-pointer `} 
                    ${mode && `border-gray-600`}
                    header-${Mode[mode].toLowerCase()}
                `}
      onClick={() => setMode(((mode + 1) % 3) * (type === HeaderType.SORT ? 1 : 0))}
    >
      {children} {type === HeaderType.SORT && <ArrowBack />}

      {/* <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd">
        <path d="M11 21.883l-6.235-7.527-.765.644 7.521 9 7.479-9-.764-.645-6.236 7.529v-21.884h-1v21.883z" />
      </svg> */}

    </th>
  );
};
