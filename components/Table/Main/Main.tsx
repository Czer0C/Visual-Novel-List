import React, { useState, useEffect } from "react";
import { THeader } from "./THeader";
import { Row } from './Row';
import { Modal } from "../Modal/Modal";
import { UnsortButton } from "../TopController/UnsortButton";
import { MultiSelect } from "../Modal/MultiSelect";

interface MainProps {
  displayList: any;
}

type Header = 
[string, "center" | "left" | "right" | "justify", "sort" | "multiselect" | "normal"];

export const Main = ({ displayList }: MainProps) => {
  const [modalOn, setModalOn] = useState(false);
  const [selectedRow, setSelectedRow] = useState(0);


const toggleModal = () => {
  setModalOn(!modalOn);
  const hideLabel = document.getElementById('status-select');
  console.log({
    hideLabel
  })
  if (hideLabel) {
    hideLabel.style.display = modalOn ? 'inline-block' : 'none';
  }
}


  const headers: Header[] = [
    ["#", "center", "normal"],
    ["Visual Novel", "left", "normal"],
    ["Released", "center", "sort"],  
    ["Vote", "center", "sort"],
    ["Status", "center", "multiselect"],  
    ["View", "center", "normal"],
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
            <THeader align={header[1]} type={header[2]} >
              {header[0] === "Status" ? 
                <div>
                  <MultiSelect/>
                </div>
              : header[0]}
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
              toggleModal={() => {onSelectRow(index); toggleModal()}}
            />
          ))
        }
        
        <Modal
          isVisible={modalOn}
          details={displayList[selectedRow]}
          selected={selectedRow}
          toggleModal={toggleModal}
        />
      </tbody>
      
    </table>
  );
};
