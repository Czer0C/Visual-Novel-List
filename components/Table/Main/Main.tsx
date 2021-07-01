import React, { useState, useEffect } from "react";
import { THeader } from "./THeader";
import { Row } from "./Row";
import { Modal } from "../Modal/Modal";
import { MultiSelect } from "../Modal/MultiSelect";

interface MainProps {
  displayList: any;
  headerHandler: (filterType: string, value: string, context: string) => void;
}
type Align = "left" | "right" | "center" | "justify";

type FilterType = "sort" | "multiselect" | "normal";

type Header = [string, Align, FilterType];

export const Main = ({ displayList, headerHandler }: MainProps) => {
  const [modalOn, setModalOn] = useState(false);
  const [activeSort, setActiveSort] = useState("");

  const [selectedItem, setSelectedItem] = useState({});

  const toggleModal = () => {
    const modal = document.getElementById('main-modal');

    if (modal) {
      if (modalOn) {
        modal.classList.remove('hidden');
      } else {
        modal.classList.add('hidden');
      }
    }

    const hideLabel = document.getElementById("status-select");

    if (hideLabel) {
      hideLabel.style.display = !modalOn ? "inline-block" : "none";
    }

    setModalOn(() => !modalOn);
  };

  const headers: Header[] = [
    ["#", "center", "normal"],
    ["Visual Novel", "left", "normal"],
    ["Released", "center", "sort"],
    ["Vote", "center", "sort"],
    ["Status", "center", "multiselect"],
    ["", "center", "normal"],
  ];

  const selectHandler = async (index: number) => {
    setSelectedItem({ ...displayList[index] });
  }

  const selectSort = (header: string) => {
    setActiveSort(header);
  };

  useEffect(() => {
    toggleModal();
  }, [selectedItem])

  return (
    <>
      <table className="min-w-full max-w-7xl leading-normal main-table">
        <thead>
          <tr>
            {headers.map((header, index) => (
              <THeader
                align={header[1]}
                type={header[2]}
                active={activeSort === header[0]}
                onSelect={selectSort}
                attribute={header[0]}
                headerHandler={headerHandler}
                key={`header-${index}`}
              >
                {header[0] === "Status" ? (
                  <div>
                    <MultiSelect headerHandler={headerHandler} />
                  </div>
                ) : (
                  header[0]
                )}
              </THeader>
            ))}
          </tr>
        </thead>

        <tbody>
          {displayList.map((row: any, index: number) => (
            <Row
              key={`Row-${index}`}
              data={row}
              index={index}
              onSelect={selectHandler}
            />
          ))}


        </tbody>

        <tfoot>
          <tr
            className={`main-row select-none cursor-pointer rounded-md 
          `
            }
          ><td colSpan={6} className="w-24 py-4 border-b border-gray-200 bg-white text-sm text-center">
              <p className="text-gray-600 whitespace-no-wrap">
                A List by CzeroC
            </p>

            </td>

          </tr>
        </tfoot>
      </table>
      {
        Object.keys(selectedItem).length > 0 && <Modal
          isVisible={modalOn}
          details={selectedItem}
          toggleModal={toggleModal}
        />
      }
    </>
  );
};
