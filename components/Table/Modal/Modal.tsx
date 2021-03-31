import React, { useState, useEffect, KeyboardEvent, useLayoutEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExternalLinkAlt } from "@fortawesome/free-solid-svg-icons";

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
  const esc = useKeyPress('Escape');
  if (esc) {
    toggleModal();
  }


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

  const transition = {
    duration: 0,
    ease: "easeInOut",
  };
  const variants = {
    hidden: {
      opacity: 0,
      scale: 0,
      transition,
    },
    show: {
      opacity: 1,
      scale: 1,
      transition,
    },
  };

  const colorRating = (vote: number) => {
    return vote > 9
      ? "green"
      : vote > 8
      ? "indigo"
      : vote > 6
      ? "blue"
      : vote > 4
      ? "yellow"
      : "red";
  };
 
  return (
    <AnimatePresence>
      <motion.div
        initial="hidden"
        animate={isVisible ? "show" : "hidden"}
        exit="hidden"
        variants={variants}
        className={`main-modal fixed  inset-0 opacity-100 mt-5 overflow-auto`}
        aria-labelledby="dialog-1-title"
        role="dialog"
        aria-modal="true"
      >
        <div className="flex items-end justify-center pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <div
            className="
            inline-block align-bottom bg-white text-left rounded-lg overflow-hidden 
            shadow-xl transform transition-all max-w-7xl"
          >
            <div className="px-4 py-5 sm:grid sm:grid-cols-8 items-center sm:gap-8 sm:px-6">
              <div className="col-span-2 ml-auto">
                <img className="py-2 max-h-80"   src={image} />
              </div>
              <h1 className="ml-16 text-4xl text-green-400 text-center col-span-4 font-semibold ">
                {title}
                {original && (
                  <h3 className="text-2xl mt-3 text-green-200 font-semibold">
                    {original}
                  </h3>
                )}
                <p className="text-base mt-3 font-semibold text-gray-500">
                  Released on {released}
                </p>
                <p className="text-base mt-3 font-semibold text-gray-500">
                  {parseLength(length)}
                </p>
              </h1>

              <div className="mr-auto shadow-lg rounded-2xl col-span-2 w-48  bg-white dark:bg-gray-800">
                <div className="flex items-center"></div>
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
                        className="circle stroke-current text-green-300"
                        stroke-dasharray={[vote * 10, 100]}
                        d="M18 2.0845
          a 15.9155 15.9155 0 0 1 0 31.831
          a 15.9155 15.9155 0 0 1 0 -31.831"
                      />
                      <text
                        x="18"
                        y="20.35"
                        fontFamily="sans-serif"
                        fill="green"
                        fontSize="0.5em"
                        textAnchor="middle"
                      >
                        {vote}
                      </text>
                    </svg>
                  </div>
                </div>
                <span
                  className={`px-4 ml-16 text-xs leading-5 font-semibold rounded-full 
                              bg-${parseStatusColor(status)}-300 
                              text-${parseStatusColor(status)}-800`}
                >
                  {parseStatus(status)}
                </span>
              </div>
            </div>

            <div className="bg-white shadow overflow-hidden sm:rounded-lg">
              <div className="grid grid-flow-col gap-4 px-20 max-w-screen-xl">
                <div className="col-span-1">
                  <div className="">
                    <dl>
                      <div className="bg-gray-400 px-4 py-3 sm:grid sm:grid-cols-4 sm:gap-4 sm:px-6">
                        <dt className=" font-medium text-black text-lg text-right mr-20 content-center">
                          Synopsis
                        </dt>
                        <dd className="mt-1  text-gray-900 sm:mt-0 sm:col-span-3">
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
                        <dt className="textg text-lg  text-right mr-20 font-medium text-indigo-800 content-center">
                          Some Thoughts
                          <p className="font-semibold mt-8">
                            Voted on {voted}
                          </p>
                        </dt>
                        <dd className="mt-1 text-indigo-600 sm:mt-0 sm:col-span-3 items-center">
                          {notes}
                        </dd>
                      </div>

                      {/* <div className="bg-gray-400 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className=" font-medium text-gray-500">Status</dt>
                        <dd className="mt-1  text-gray-900 sm:mt-0 sm:col-span-2">
                          <span
                            className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                              bg-${parseStatusColor(status)}-100 
                              text-${parseStatusColor(status)}-800`}
                          >
                            {parseStatus(status)}
                          </span>
                        </dd>
                      </div> */}
                    </dl>
                  </div>
                </div>
              </div>
            </div>
            <br />

            <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
              <button
                onClick={toggleModal}
                type="button"
                className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 
                py-2 bg-pink-600 text-base font-medium text-white hover:bg-pink-700 
                focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
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
  switch (status) {
    case 1:
      return "gray";
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

function useKeyPress(targetKey: string) {
  // State for keeping track of whether key is pressed
  const [keyPressed, setKeyPressed] = useState(false);

  // If pressed key is our target key then set to true
  interface HandlerProps {
    key: string
  }
  function downHandler({key}: HandlerProps) {
    if (key === targetKey) {
      setKeyPressed(true);
    }
  }

  // If released key is our target key then set to false
  const upHandler = ({ key }: HandlerProps) => {
    if (key === targetKey) {
      setKeyPressed(false);
    }
  };

  // Add event listeners
  useEffect(() => {
    window.addEventListener('keydown', downHandler);
    window.addEventListener('keyup', upHandler);
    // Remove event listeners on cleanup
    return () => {
      window.removeEventListener('keydown', downHandler);
      window.removeEventListener('keyup', upHandler);
    };
  }, []); // Empty array ensures that effect is only run on mount and unmount

  return keyPressed;
}