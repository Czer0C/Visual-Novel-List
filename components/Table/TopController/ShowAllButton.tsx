import React from "react";
import { Button } from "../../common/Button";

interface ShowAllButtonProps {
  displayAll: () => void;
  showAll: boolean;
  disabled: boolean;
}

export const ShowAllButton = ({
  displayAll,
  showAll,
  disabled,
}: ShowAllButtonProps) => {
  return (
    <Button
      className={`
            flex-shrink-0 px-4 py-2.5 font-semibold ml-12 
            text-white rounded-lg shadow-lg text-center transform 
             transition-all duration-500 ease-in-out font-sans text-lg
             bg-gradient-to-br from-indigo-500 to-indigo-800
            ${
              disabled
                ? "cursor-not-allowed opacity-60"
                : " hover:opacity-75  hover:from-gray-500 hover:to-gray-800"
            }

            
            
            
            `}
      eventHandler={displayAll}
      disabled={disabled}
    >
      Show {!showAll ? "All" : "Less"}
    </Button>
  );
};
