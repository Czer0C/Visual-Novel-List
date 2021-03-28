import React, { ChangeEvent, useState } from "react";
import { Header } from "../common/Header";
import { Pagination } from "./Pagination/Pagination";
import { UnsortButton } from "./TopController/UnsortButton";
import { ShowAllButton } from "./TopController/ShowAllButton";
import { Filter } from "./TopController/Filter";
import { Main } from "./Main/Main";
import { Modal } from "./Modal/Modal";

interface TableProps {
  fullList: object[];
}

export const Table = ({ fullList }: TableProps) => {
  const [sorted, setSorted] = useState(false);
  const [current, setCurrent] = useState(0);
  const [showAll, setShowAll] = useState(false);
  const [filteredOn, setFilteredOn] = useState(false);
  const [displayList, setDisplayList] = useState(fullList.slice(0, 10));
  const [currentList, setCurrentList] = useState(fullList);
  const pages = Math.ceil(fullList.length / 10);

  const handleFilter = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const keyword: string = event.target.value.toLowerCase();
    if (keyword.length === 0) {
      setDisplayList(() => fullList.slice(current * 10, (current + 1) * 10));
    } else {
      const filtered = fullList.filter(
        (vn) =>
          vn.vn.title.toLowerCase().includes(keyword) ||
          vn.vn.original?.includes(keyword) ||
          vn.vn.description?.includes(keyword)
      );

      setDisplayList(filtered);
    }

    const toggle = keyword.length > 0;

    setFilteredOn(toggle);
    setShowAll(false);
  };

  const unsort = () => {
    let temp = fullList;
    setCurrentList(temp);
    if (!showAll) {
      temp = fullList.slice(current * 10, (current + 1) * 10);
    }
    setSorted(false);
    setDisplayList(temp);
  };

  const displayAll = () => {
    let temp = currentList;
    setShowAll(!showAll);
    if (!showAll) {
      setDisplayList(temp);
    } else {
      setDisplayList(temp.slice(current * 10, (current + 1) * 10));
    }
  };

  const switchPage = (index: number, isOneStep: boolean) => {
    let newPointer = current;
    if (isOneStep) {
      if (current + index < 0 || current + index > pages - 1) {
        return;
      } else {
        newPointer += index;
      }
    } else {
      newPointer = index;
    }
    setCurrent(newPointer);
    let nextList = currentList.slice(newPointer * 10, (newPointer + 1) * 10);
    setDisplayList(nextList);
  };

  console.log({ filteredOn });
  return (
    <div className={`index-container`}>
      <main className="index-main">
        <Header title={`CzeroC's Visual Novel List`} />

        {/* //? Table Container */}
        {fullList && fullList.length > 0 ? (
          <div
          className="container mx-auto px-4 xl:px-8 max-w-screen-lg w-screen"
          id="skeleton"
        >
            <div className="py-8">
              <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
                <div className="inline-block min-w-full rounded-lg overflow-hidden">
                  {/* //? Top Controllers */}
                  <div
                    className="px-5 opacity-95 bg-white py-5 
                  flex flex-row xs:flex-row justify-between 
                  items-center xs:justify-between"
                  >
                    <Filter handleFilter={handleFilter} />
                    <ShowAllButton
                      displayAll={displayAll}
                      showAll={showAll}
                      disabled={filteredOn}
                    />
                    <Pagination
                      current={current}
                      pages={pages}
                      switchPage={switchPage}
                      unavailable={showAll || filteredOn}
                    />
                  </div>

                  {/* //? TABLE */}
                  {displayList && displayList.length ? (
                    <Main displayList={displayList} />
                  ) : (
                    <div className=" opacity-90 py-4 border-gray-200 bg-white text-sm text-center">
                      <span
                        className="px-5 inline-flex text-xl leading-10 font-semibold rounded-full 
                          bg-red-100 text-red-800"
                      >
                        No Results
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ) : (
          "An error has occurred"
        )}
      </main>
    </div>
  );
};
