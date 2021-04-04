import { ArrowBack } from "@components/icons/ArrowBack";
import React, { useState, useEffect } from "react";

interface THeaderProps {
  children: any;
  align?: "center" | "left" | "right" | "justify";
  type: "sort" | "multiselect" | "normal";
  attribute: string;
  headerHandler: (filterType: string, value: string, context: string) => void;
  active: boolean;
  onSelect: (header: string) => void;
}

enum Mode {
  UNSORTED = 0,
  DESCENDING = 1,
  ASCENDING = 2,
}

enum HeaderType {
  SORT = "sort",
  MULTISELECT = "multiselect",
  NORMAL = "normal",
}

export const THeader = ({
  children,
  align,
  type,
  headerHandler,
  attribute,
  onSelect,
  active,
}: THeaderProps) => {
  const [mode, setMode] = useState(Mode.UNSORTED);

  useEffect(()  => {
    if (!active) {
      setMode(Mode.UNSORTED)
    }
  })

  const headerClick = () => {
    if (type === HeaderType.NORMAL) {
      return;
    }

    // ! One step ahead of the list
    const context =
      mode === 0 ? "descending" : mode === 1 ? "ascending" : "clear";
    onSelect(attribute);
    headerHandler(type, attribute, context);
    updateHeaderIcon();
  };

  const updateHeaderIcon = () => {
    if (type === HeaderType.SORT) {
      const nextMode = (mode + 1) % 3;
      setMode(nextMode);
    }
  };

  return (
    <th
      scope="col"
      className={`px-1 py-4 bg-white text-${align || "center"} 
        transition-all delay-100 ease-in-out  text-gray-800 
       uppercase font-bold text-base font-serif border-b border-white
                    ${"w-96"}
                    ${
                      type === HeaderType.SORT &&
                      `hover:border-gray-600 cursor-pointer `
                    } 
                    ${mode && active && `border-gray-600`}
                    header-${Mode[mode].toLowerCase()}
                `}
      onClick={headerClick}
    >
      {children} {type === HeaderType.SORT && <ArrowBack />}
    </th>
  );
};
