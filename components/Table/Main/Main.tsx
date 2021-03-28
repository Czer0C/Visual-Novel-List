import React, { useState } from "react";
import { THeader } from "./THeader";
import { Row } from './Row';
import { Modal } from "../Modal/Modal";

interface MainProps {
  displayList: any;
}

type Header = [string, boolean, "center" | "left" | "right" | "justify"]

export const Main = ({ displayList }: MainProps) => {
  const [modalOn, setModalOn] = useState(false);
  const [selectedRow, setSelectedRow] = useState(0);

  const headers: Header[] = [
    ["#", false, "center"],
    ["Visual Novel", false, "left"],
    ["Status", false, "center"],  
    ["Vote", true, "center"],
    ["View", false, "center"],
  ];

  const onSelectRow = (idx: number) => {
    setSelectedRow(() => idx);
    setModalOn(() => true);
  };
  
  return (
    <table className="min-w-full max-w-7xl leading-normal main-table">
      <thead>
        <tr>
          {headers.map((header) => (
            <THeader sortable={header[1]} align={header[2]}>
              {header[0]}
            </THeader>
          ))}

          {/* <th
              scope="col"
              className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-center text-sm uppercase font-bold"
              style={{ minWidth: "100px" }}
            >
              Vote
              <button
                className={`
            rounded-md border border-transparent 
             bg-transparent text-lg font-large text-gray
            focus:outline-none sm:ml-2 
            sm:w-auto               `}
                onClick={() => {
                  let temp = Array.from(fullList).sort((a, b) =>
                    a.vote > b.vote
                      ? 1 * mode
                      : b.vote === undefined
                        ? 1 * mode
                        : -1 * mode
                  );
                  setSorted(true);
                  setCurrentList(temp);
                  if (!showAll) {
                    temp = temp.slice(
                      current * 10,
                      (current + 1) * 10
                    );
                  }
                  setDisplayList(temp);
                  setMode(-1 * mode);
                }}
              >
                {mode === 1 ? "↓" : "↑"}
              </button>
            </th> */}
        </tr>
      </thead>

      <tbody>
        {
          displayList.map((row: any, index: number) => (
            <Row
              key={`Row-${index}`}
              data={row}
              index={index}
              selectedRow={modalOn && selectedRow}
              toggleModal={() => onSelectRow(index)}
            />
          ))
        }
      </tbody>
      <Modal
          isVisible={modalOn}
          details={displayList[selectedRow]}
          selected={selectedRow}
          toggleModal={() => setModalOn(false)}
        />
    </table>
  );
};
