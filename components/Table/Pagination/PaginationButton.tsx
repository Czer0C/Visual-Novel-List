import React, { MouseEventHandler } from "react";
import { Button } from "../../common/Button";

interface PaginationButtonProps {
  current: number
  switchPage: MouseEventHandler
  children?: any
  type: "back" | "num" | "forward"
  pages: number
  index: number
  unavailable: boolean
}

export const PaginationButton = ({
  current,
  switchPage,
  children,
  type,
  pages,
  index,
  unavailable
}: PaginationButtonProps) => {
  const disabled =
  unavailable ||
    (type === "back" && current === 0) ||
    (type === "forward" && current === pages - 1) || 
    (type === "num" && index === current);
  
  return (
    <Button
      className={
        {
          back: `w-full p-4 border text-base rounded-l-xl text-gray-600 bg-white hover:bg-gray-100 
          ${current === 0 || unavailable ? "disabled:opacity-50 cursor-not-allowed" : ""}`,

          forward: `w-full p-4 border-t border-b border-r text-base rounded-r-xl 
          text-gray-600 bg-white hover:bg-gray-100 
          ${current === pages - 1 || unavailable ? "disabled:opacity-50 cursor-not-allowed" : ""}`,

          num: `w-full px-4 py-2 border-t border-b text-base text-indigo-500 hover:bg-blue-200
          ${index === current ? "bg-blue-200 cursor-not-allowed" : "bg-white"} 
          ${unavailable ? "disabled:opacity-50 cursor-not-allowed" : "hover:bg-gray-200"}`,
        }[type]
      }
      eventHandler={switchPage}
      disabled={disabled}
    >
      {type === 'num' ? index + 1 : children}
    </Button>
  );
};
