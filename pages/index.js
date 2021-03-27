import { useState } from "react";
import { GetStaticProps, GetStaticPaths, GetServerSideProps } from "next";
import Head from "next/head";
import { Button } from "../components/Button";
import { Row } from "../components/Row";
import { Modal } from "../components/Modal";
import moment from "moment";

import { getUserList, getVisualNovel } from "../services/vndb/index";

const userID = `131608`;
const limit = 100; // ! Maximum number of item per request (though I doubt I'd ever gonna read this many VN)

const Home = ({ fullList }) => {
  const [modalOn, setModalOn] = useState(false);
  const [sorted, setSorted] = useState(false);
  const [selectedRow, setSelectedRow] = useState(0);
  const [current, setCurrent] = useState(0);
  const [showAll, setShowAll] = useState(false);
  const [filteredOn, setFilteredOn] = useState(false);
  const [displayList, setDisplayList] = useState(() =>
    fullList.slice(current * 10, (current + 1) * 10)
  );
  const [currentList, setCurrentList] = useState(fullList);


  

  const [mode, setMode] = useState(1);
  const pages = Math.ceil(fullList.length / 10);

  const prevBtnClass =
    "w-full p-4 border text-base rounded-l-xl text-gray-600 bg-white hover:bg-gray-100";
  const nextBtnClass =
    "w-full p-4 border-t border-b border-r text-base rounded-r-xl text-gray-600 bg-white hover:bg-gray-100";

  const unsortBtnClass = `
        py-3 px-6 bg-white
        focus:ring-indigo-300 focus:ring-offset-indigo-200 text-indigo-600 
        text-center shadow-md focus:outline-none focus:ring-2     
        transform
        transition duration-300 ease-in-out
        focus:ring-offset-2 rounded-full
      `;
  const test = "asdasdasdasd";
  const showAllBtnClass = `
      py-3 px-6
      focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white 
      text-center shadow-md focus:outline-none focus:ring-1     
      transform hover:scale-110
      transition duration-200 ease-in-out
      focus:ring-offset-1 rounded-full
    `;

  const handleFilter = (event) => {
    event.preventDefault();
    const keyword = event.target.value.toLowerCase();
    if (keyword.length === 0) {
      setDisplayList(() => fullList.slice(current * 10, (current + 1) * 10));
      return;
    }
    setFilteredOn(keyword !== "");
    const filtered = fullList.filter(
      (vn) =>
        vn.vn.title.toLowerCase().includes(keyword) ||
        vn.vn.original?.includes(keyword) ||
        vn.vn.description?.includes(keyword)
    );

    setDisplayList(filtered);
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

  const switchPage = (index, isOneStep) => {
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

  const onSelectRow = (idx) => {
    setSelectedRow(() => idx);
    setModalOn(() => true);
  };

  return (
    <div className={`index-container`}>
      <main className="index-main">
        <Head>
          <title>CzeroC's Visual Novel List</title>
        </Head>
        <h1 className="text-5xl w-8/12 sm:text-6xl sm:w-10/12 text-center  text-green-400 font-semibold text-opacity-90">
          CzeroC's Visual Novel List
        </h1>

        <div className="px-4 pt-9 flex gap-6">
          <Button
            className={`${unsortBtnClass} ${
              !sorted
                ? "disabled:opacity-75 cursor-not-allowed"
                : "hover:scale-110"
            }`}
            eventHandler={unsort}
            text="Unsort"
            disabled={!sorted}
          />

          <Button
            className={`${showAllBtnClass} ${
              showAll ? "bg-purple-500" : " bg-indigo-500"
            }`}
            eventHandler={displayAll}
            text={!showAll ? "Show All" : "Show Less"}
          />
        </div>

        {/* 
            
            // TODO TRY isLOADING
              
            */}

        {fullList && fullList.length > 0 ? (
          <div className="container mx-auto px-4 xl:px-8 max-w-5xl">
            <div className="py-12">
              <div className="flex flex-row mb-1 sm:mb-0 justify-end w-full">
                <div className="text-end">
                  <div className=" relative ">
                    <input
                      type="text"
                      id="form-subscribe-Filter"
                      className=" w-full h-10 pl-8 pr-3 text-base placeholder-gray-600 border rounded-lg focus:shadow-outline focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                      placeholder="Filter List"
                      onChange={handleFilter}
                    />
                    <div className="absolute inset-y-0 left-0 flex items-center px-2 pointer-events-none">
                      <svg className="w-4 h-4" viewBox="0 0 24 24">
                        <path d="M23.832 19.641l-6.821-6.821c2.834-5.878-1.45-12.82-8.065-12.82-4.932 0-8.946 4.014-8.946 8.947 0 6.508 6.739 10.798 12.601 8.166l6.879 6.879c1.957.164 4.52-2.326 4.352-4.351zm-14.886-4.721c-3.293 0-5.973-2.68-5.973-5.973s2.68-5.973 5.973-5.973c3.294 0 5.974 2.68 5.974 5.973s-2.68 5.973-5.974 5.973z" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
              <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
                <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
                  <table className="min-w-full leading-normal main-table">
                    <thead>
                      <tr>
                        <th
                          scope="col"
                          className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-bold"
                        >
                          #
                        </th>
                        <th
                          scope="col"
                          className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-bold"
                        >
                          Visual Novel
                        </th>
                        <th
                          scope="col"
                          className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-center text-sm uppercase font-bold"
                        >
                          Vote Date
                        </th>
                        <th
                          scope="col"
                          className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-center text-sm uppercase font-bold"
                        >
                          Status
                        </th>
                        <th
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
                              const temp = Array.from(fullList).sort((a, b) =>
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
                        </th>
                        <th
                          scope="col"
                          className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal"
                        ></th>
                      </tr>
                    </thead>
                    <tbody>
                      {displayList && displayList.length > 0
                        ? displayList.map((vn, idx) => (
                            <Row
                              data={vn}
                              index={idx}
                              selectedRow={modalOn && selectedRow}
                              toggleModal={() => onSelectRow(idx)}
                            />
                          ))
                        : null}
                    </tbody>
                  </table>

                  {/* 
                    
                      // !PAGINATION 
                    
                    */}

                  {displayList.length !== fullList.length ? (
                    <div className="px-5 opacity-90 bg-white py-5 flex flex-col xs:flex-row items-center xs:justify-between">
                      <div className="flex items-center">
                        <button
                          type="button"
                          className={`${prevBtnClass} ${
                            current === 0
                              ? "disabled:opacity-50 cursor-not-allowed"
                              : ""
                          }`}
                          onClick={() => switchPage(-1, true)}
                          disabled={current === 0}
                        >
                          <svg
                            width="9"
                            fill="currentColor"
                            height="8"
                            className=""
                            viewBox="0 0 1792 1792"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path d="M1427 301l-531 531 531 531q19 19 19 45t-19 45l-166 166q-19 19-45 19t-45-19l-742-742q-19-19-19-45t19-45l742-742q19-19 45-19t45 19l166 166q19 19 19 45t-19 45z"></path>
                          </svg>
                        </button>
                        {[...Array(pages).keys()].map((i) => (
                          <Button
                            className={`w-full px-4 py-2 border-t border-b text-base text-indigo-500 ${
                              i === current ? "bg-gray-200" : "bg-white"
                            } hover:bg-gray-200`}
                            text={i + 1}
                            eventHandler={() => switchPage(i, false)}
                          />
                        ))}
                        <button
                          type="button"
                          className={`${nextBtnClass} ${
                            current === pages - 1
                              ? "disabled:opacity-50 cursor-not-allowed"
                              : ""
                          }`}
                          onClick={() => switchPage(1, true)}
                          disabled={current === pages - 1}
                        >
                          <svg
                            width="9"
                            fill="currentColor"
                            height="8"
                            className=""
                            viewBox="0 0 1792 1792"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path d="M1363 877l-742 742q-19 19-45 19t-45-19l-166-166q-19-19-19-45t19-45l531-531-531-531q-19-19-19-45t19-45l166-166q19-19 45-19t45 19l742 742q19 19 19 45t-19 45z"></path>
                          </svg>
                        </button>
                      </div>
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        ) : (
          "An error has occurred"
        )}

        <Modal
          isVisible={modalOn}
          details={fullList[selectedRow]}
          selected={selectedRow}
          toggleModal={() => setModalOn(false)}
        />
      </main>
    </div>
  );
}

export default Home; 

// ! Server Side Rendering
// export async function getServerSideProps({ req, params }) {
//   const fullList = await getFullList();

//   return {
//     props: { fullList: vns },
//   };
// }

// ! Static Site Generator
export const getStaticProps = async ({ params }) => {
  const fullList = await getFullList();
  
  return {
    props: { fullList },
  };
};

const getFullList = async () => {
  try {
    const getUList = await getUserList(userID, limit);

    if (!getUList.success) {
      console.error("Could not fetch ulist");
    }

    const userList = getUList.data;

    const vnIDs = getUList.data.map((item) => item.vn);

    const pages = Math.ceil(userList.length / 25); // ! VNDB only allows 25 items per request for get VN query

    const visualNovels = [];

    for (let i = 0; i < pages; i++) {
      const currentBatchIDs = vnIDs.slice(i * 25, i * 25 + 25);
      const getCurrentBatch = await getVisualNovel(currentBatchIDs);

      if (!getCurrentBatch.success) {
        console.error("Could not fetch VNs");
      }

      visualNovels.push(...getCurrentBatch.data);
    }

    return joinAndClean(userList, visualNovels);
    
  } catch (error) {
    console.error(error);
  }

  return [];
}

const joinAndClean = (uList, vns) => {
  const fullList = uList.map((base, index) => {
    const {
      labels,
      lastmod,
      started,
      finished,
      added,
      uid,
      ...formatedBase
    } = base;

    const {
      languages,
      aliases,
      image_flagging,
      orig_lang,
      links,
      platforms,
      ...formatedVN
    } = vns[index];

    return {
      ...formatedBase,
      status: base.labels[0].id,
      vote: base.vote / 10 || "Not Rated",
      voted: moment(base.voted * 1000).format("MM/DD/YYYY") || "Not Rated",
      vn: formatedVN,
    };
  });

  return fullList;
};
