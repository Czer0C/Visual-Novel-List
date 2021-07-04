import React, { ChangeEvent, useState } from "react";
import { Header } from "../common/Header";
import { Pagination } from "./Pagination/Pagination";
import { ShowAllButton } from "./TopController/ShowAllButton";
import { Filter } from "./TopController/Filter";
import { Main } from "./Main/Main";

interface TableProps {
  fullList: any[];
}

export const Table = ({ fullList }: TableProps) => {
  const [showAll, setShowAll] = useState(false);
  const [filteredOn, setFilteredOn] = useState(false);

  const [processedList, setProcessedList] = useState(fullList);

  const [displayingData, setDisplayingData] = useState(
    processedList.slice(0, 10)
  );

  const [currentPage, setCurrentPage] = useState(0);
  const pages = Math.ceil(processedList.length / 10);

  const [reset, setReset] = useState(false);

  const handleFilter = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const keyword: string = event.target.value.toLowerCase();
    if (keyword.length === 0) {
      setDisplayingData(() =>
        processedList.slice(currentPage * 10, (currentPage + 1) * 10)
      );
    } else {
      const filtered = processedList.filter(
        (vn) =>
          vn.vn.title.toLowerCase().includes(keyword) ||
          vn.vn.original?.includes(keyword) ||
          vn.vn.description?.includes(keyword)
      );

      setDisplayingData(filtered);
    }

    const toggle = keyword.length > 0;

    setFilteredOn(toggle);
    setShowAll(false);
  };

  const displayAll = () => {
    let temp = processedList;
    setShowAll(!showAll);

    if (!showAll) {
      setDisplayingData(temp);
    } else {
      setDisplayingData(temp.slice(currentPage * 10, (currentPage + 1) * 10));
    }
  };

  const switchPage = (index: number, isOneStep: boolean) => {
    let newPointer = currentPage;
    if (isOneStep) {
      if (currentPage + index < 0 || currentPage + index > pages - 1) {
        return;
      } else {
        newPointer += index;
      }
    } else {
      newPointer = index;
    }
    setCurrentPage(newPointer);
    let nextList = processedList.slice(newPointer * 10, (newPointer + 1) * 10);
    setDisplayingData(nextList);
  };

  const headerHandler = (
    filterType: string,
    value: string,
    context: string
  ) => {
    // const properties = Object.keys(fullList[0]);
    const properties = ["notes", "vn", "voted", "vote", "status"];

    type entry = {
      notes: string;
      vn: object;
      voted: string;
      vote: number;
      status: number;
    };

    if (context === "clear" || context === "All") {
      setProcessedList(fullList);
      setDisplayingData(
        fullList.slice(currentPage * 10, (currentPage + 1) * 10)
      );
      setReset(true);
    } else {
      switch (value) {
        case "Vote": {
          const filteredList = [...processedList].sort((a, b) => {
            if (context === "ascending") {
              return +a.vote - +b.vote;
            }
            return +b.vote - +a.vote;
          });

          setProcessedList(filteredList);
          setDisplayingData(
            filteredList.slice(currentPage * 10, (currentPage + 1) * 10)
          );
          return;
        }

        case "Released": {
          const filteredList = [...processedList].sort((a, b) => {
            const d1 = Date.parse(a.vn.released);
            const d2 = Date.parse(b.vn.released);
            if (context === "ascending") {
              return d1 - d2;
            }
            return d2 - d1;
          });

          setProcessedList(filteredList);
          setDisplayingData(
            filteredList.slice(currentPage * 10, (currentPage + 1) * 10)
          );
          return;
        }

        case "Status":
          const statuses = ["", "Playing", "Finished", "Stalled", "Dropped"];

          if (statuses.includes(context)) {
            const filteredList = fullList.filter(
              (entry) => statuses[entry.status] === context
            );
            setProcessedList(filteredList);
            setDisplayingData(filteredList.slice(0, 10));
            setCurrentPage(0);
          }

          return;

        default:
          return;
      }
    }
  };

  return (
    <div className={`index-container`}>
      <main className="index-main">
        <Header title={`CzeroC's Visual Novel List`} />

        {/* //? Table Container */}
        {processedList && processedList.length > 0 ? (
          <div
            className="container mx-auto px-4 xl:px-8 xl:max-w-screen-lg max-w-screen-md w-screen"
            id="skeleton"
          >
            <div className="py-8">
              <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
                <div className="inline-block min-w-full rounded-lg overflow-hidden">
                  {/* //? Top Controllers */}
                  <div
                    className="px-5 bg-white py-5
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
                      current={currentPage}
                      pages={pages}
                      switchPage={switchPage}
                      unavailable={showAll || filteredOn}
                    />
                  </div>

                  {/* //? TABLE */}
                  {displayingData && displayingData.length > 0 ? (
                    <Main
                      displayList={displayingData}
                      headerHandler={headerHandler}
                    />
                  ) : (
                    <div className="py-4 border-gray-200 bg-white text-sm text-center">
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
