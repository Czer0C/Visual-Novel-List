import React, { useState, useEffect, KeyboardEvent, useLayoutEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExternalLinkAlt } from "@fortawesome/free-solid-svg-icons";
import { Close } from "@components/icons/Close";

// <motion.li layout onClick={toggleOpen} initial={{ borderRadius: 10 }}>
// <motion.div className="avatar" layout />
// <AnimatePresence>{isOpen && <Content />}</AnimatePresence>
// </motion.li>

interface ModalProps {
  details: any;
  toggleModal: () => void;
  isVisible: boolean;
}

export const Modal = ({ details, toggleModal, isVisible }: ModalProps) => {
  const { vote, added, voted, status, notes } = details;

  useEscape(toggleModal);

  useLayoutEffect(() => {
    document.body.style.overflow = isVisible ? 'hidden' : "unset";
  }, [isVisible])

  const {
    description,
    image,
    length,
    title,
    image_nsfw,
    original,
    released,
    id,
  } = details.vn;


  const colorRating = (vote: number) => {
    return vote > 9
      ? "green"
      : vote > 8
        ? "indigo"
        : vote > 6
          ? "blue"
          : vote > 4
            ? "yellow"
            : vote > 0 ?
            "red" : "purple";
  };

  return (
      <div
        className={`main-modal hidden fixed  inset-0 opacity-100 mt-5 overflow-auto`}
        aria-labelledby="dialog-1-title"
        role="dialog"
        aria-modal="true"
        id="main-modal"
      >
        <div className="justify-center pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <div
            className="
            inline-block align-bottom bg-white text-left rounded-lg overflow-hidden 
            shadow-xl transform transition-all max-w-7xl"
          >
            <div className="px-4 py-5 sm:grid sm:grid-cols-8  sm:gap-8 sm:px-6">
              <div className="col-span-2 ml-auto">
                <img className="py-2 max-h-80" src={image} />
              </div>
              <h1 className="text-4xl -m-5 mt-10 leading-normal text-green-400 text-center col-span-4 font-semibold ">
                {title}
                {original && (
                  <h3 className="text-2xl mt-5 mb-5 text-green-200 font-semibold">
                    {original}
                  </h3>
                )}
                <p className="text-base font-mono mt-3 font-medium text-gray-600">
                  Released on {released}
                </p>
                <p className="text-base font-mono mt-3 font-medium text-gray-600">
                  {parseLength(length)}
                </p>
              </h1>

              <div className="h-64 shadow-lg rounded-2xl col-span-2 w-56  bg-white dark:bg-gray-800">
                <div className=""></div>
                <div className="flex flex-row">
                  <div className="single-chart ml-auto">
                    <svg viewBox="0 0 36 36" className="circular-chart">
                      <path
                        className="circle-bg"
                        d="M18 2.0845
          a 15.9155 15.9155 0 0 1 0 31.831
          a 15.9155 15.9155 0 0 1 0 -31.831"
                      />
                      <path
                        className={`circle stroke-current text-${colorRating(vote)}-300`}
                        stroke-dasharray={[vote * 10, 100]}
                        d="M18 2.0845
          a 15.9155 15.9155 0 0 1 0 31.831
          a 15.9155 15.9155 0 0 1 0 -31.831"
                      />
                      <text
                        x="18"
                        y="22"
                        fontFamily={` ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace`}
                        className={`text-${colorRating(vote)}-200 stroke-current fill-current stroke-0`}
                        fontSize="0.75em"
                        fontWeight="600"
                        textAnchor="middle"
                      >
                        {vote === -1 ? '-' : vote}
                      </text>
                    </svg>
                  </div>
                </div>
                <span
                  className={`px-4 py-1 ml-16 leading-10 font-mono font-medium rounded-full 
                              bg-${parseStatusColor(status)}-300 
                              text-${parseStatusColor(status)}-800`}
                >
                  {parseStatus(status)}
                </span>
              </div>

              <button type="button" 
              
              className="right-10 absolute p-2 rounded-md 
              focus:outline-none focus:ring-2 focus:ring-red-500  sm:-mr-2"
              
              onClick={toggleModal}
              
              >
                <span className="sr-only">
                  Dismiss
                </span>
                <Close />
              </button>
            </div>

            <div className="bg-white  overflow-hidden sm:rounded-lg">
              <div className="grid grid-flow-col gap-4 px-20 max-w-screen-xl">
                <div className="col-span-1">
                  <div >
                    <dl className="mb-10" >
                      <div className="bg-gray-300 px-4 py-3 sm:grid sm:grid-cols-4 sm:gap-4 sm:px-6">
                        <dt className="text-black text-lg font-bold text-right mr-20 content-center">
                          <h1>Synopsis</h1>
                        </dt>
                        <dd className="mt-1 text-lg leading-7  text-gray-900 sm:mt-0 sm:col-span-3">
                          {description.slice(0, 500)}
                          {description.length > 500 ? (
                            <Tippy content="Read more on VNDB">
                              <a
                                href={`https://vndb.org/v${id}`}
                                target="_blank"
                                className="text-indigo-500 hover:text-indigo-700 sm:ml-4"
                              >
                                <FontAwesomeIcon icon={faExternalLinkAlt} />
                              </a>
                            </Tippy>
                          ) : (
                            ""
                          )}
                        </dd>
                      </div>
                      <div
                        className={`bg-${parseStatusColor(
                          status
                        )}-100 px-4 py-3 sm:grid sm:grid-cols-4 sm:gap-4 sm:px-6`}
                      >
                        <dt className="text-lg font-bold text-right mr-20 text-indigo-800 content-center">
                          <h1>Some Thoughts</h1>
                          <h3 className="font-semibold mt-8 text-base">
                            Voted on {voted}
                          </h3>
                        </dt>
                        <dd className="mt-1 text-lg leading-7 text-indigo-600 sm:mt-0 sm:col-span-3 items-center">
                          {notes}
                        </dd>
                      </div>




                    </dl>
                  </div>
                </div>
              </div>
            </div>


          </div>
        </div>
      </div>
  );
};

function parseLength(length: number) {
  switch (length) {
    case 1:
      return "Very Short (< 2 hours)";
    case 2:
      return "Short (2 - 10 hours)";
    case 3:
      return "Medium (10 - 30 hours)";
    case 4:
      return "Long (30 - 50 hours)";
    case 5:
      return "Very Long (> 50 hours)";
    default:
      return "";
  }
}

function parseStatus(status: number) {
  switch (status) {
    case 1:
      return "Playing";
    case 2:
      return "Finished";
    case 3:
      return "Stalled";
    case 4:
      return "Dropped";
    case 5:
      return "Wishlist";
    case 6:
      return "Blacklist";
  }
}

function parseStatusColor(status: number) {
  console.log(status);
  switch (status) {
    case 1:
      return "purple";
    case 2:
      return "green";
    case 3:
      return "yellow";
    case 4:
      return "red";
    case 5:
      return "white";
    case 6:
      return "indigo";
  }
}

const useEscape = (toggleModal: () => void) => {
  useEffect(() => {
    interface HandlerProps {
      key: string
    }

    function downHandler({ key }: HandlerProps) {
      if (key === 'Escape') {
        toggleModal();
      }
    }

    window.addEventListener('keydown', downHandler);

  })
}