import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExternalLinkAlt } from "@fortawesome/free-solid-svg-icons";

// <motion.li layout onClick={toggleOpen} initial={{ borderRadius: 10 }}>
// <motion.div className="avatar" layout />
// <AnimatePresence>{isOpen && <Content />}</AnimatePresence>
// </motion.li>

export const Modal = ({ details, toggleModal, isVisible }) => {
  const { vote, added, voted, status, notes } = details;
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

  const colorRating = (vote) => {
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
        class={`main-modal fixed  inset-0 opacity-100 mt-5`}
        aria-labelledby="dialog-1-title"
        role="dialog"
        aria-modal="true"
        onClick={toggleModal}
      >
        <div class="flex items-end justify-center pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <div
            class="
            inline-block align-bottom bg-white text-left rounded-lg overflow-hidden 
            shadow-xl transform transition-all max-w-7xl"
          >
            <div className="px-4 py-5 sm:grid sm:grid-cols-4 items-center sm:gap-8 sm:px-6">
              <h1 className="text-5xl text-green-400 text-center col-span-3 font-semibold ">
                {title}
                {original && (
                  <h3 className="text-2xl mt-3 text-green-200 font-semibold">
                    {original}
                  </h3>
                )}
                <p className="text-lg mt-3 font-semibold text-gray-500">
                            (Released on {released})
                </p>
              </h1>

              <div class="shadow-lg rounded-2xl col-span-1 w-36 p-4 bg-white dark:bg-gray-800 mr-auto">
                <div class="flex items-center">
                  
                </div>
                <div class="flex flex-row">
                  <div class="single-chart">
                    <svg viewBox="0 0 36 36" class="circular-chart">
                      <path
                        class="circle-bg"
                        d="M18 2.0845
          a 15.9155 15.9155 0 0 1 0 31.831
          a 15.9155 15.9155 0 0 1 0 -31.831"
                      />
                      <path
                        class="circle stroke-current text-green-300"
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
                            className={`px-4 ml-5 text-xs leading-5 font-semibold rounded-full 
                              bg-${parseStatusColor(status)}-300 
                              text-${parseStatusColor(status)}-800`}
                          >
                            {parseStatus(status)}
                          </span>
              </div>
            </div>

            <div className="bg-white shadow overflow-hidden sm:rounded-lg">
              <div className="grid grid-flow-col gap-4 px-8 max-w-screen-xl">
                <div className="row-span-6">
                  <img className="py-2" src={image} />
                </div>
                <div className="col-span-1">
                  <div className="">
                    <dl>
                      <div className="bg-gray-400 px-4 py-3 sm:grid sm:grid-cols-4 sm:gap-4 sm:px-6">
                        <dt className=" font-medium text-black text-lg content-center">
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
                        <dt className="text-lg font-medium text-indigo-800 content-center">
                          Some Thoughts
                          
                          <p className="text-lg font-semibold mt-8">
                            Voted on {voted}
                          </p>
                        </dt>
                        <dd className="mt-1 text-base text-indigo-600 sm:mt-0 sm:col-span-3 items-center">
                          {notes}
                          
                        </dd>
                      </div>

                      {/* <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className=" font-medium text-gray-500">Vote</dt>
                        <dd className="mt-1  text-gray-900 sm:mt-0 sm:col-span-2">
                          {vote}
                        </dd>
                      </div> */}

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

            <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
              <button
                onClick={toggleModal}
                type="button"
                class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 
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

function parseLength(length) {
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

function parseStatus(status) {
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

function parseStatusColor(status) {
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
