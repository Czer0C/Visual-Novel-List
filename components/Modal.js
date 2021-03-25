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
  const { vote, added, voted, status } = details;
  const { 
    description,
    image,
    length,
    title,
    image_nsfw,
    original,
    released,
    notes,
    id } = details.vn;
  


  const transition = {
    duration: 0.1,
    ease: "easeInOut"
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

  //console.log(details);
  return (
    <AnimatePresence>
      <motion.div
        initial="hidden"
        animate={isVisible ? "show" : "hidden"}
        exit="hidden"
        variants={variants}
        class={`main-modal fixed z-10 inset-0 overflow-y-auto`}
        aria-labelledby="dialog-1-title"
        role="dialog"
        aria-modal="true"
      >
        <div class="flex items-end justify-center pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <span
            class="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true"
          >
            &#8203;
          </span>

          <div class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div className="px-4 py-5 sm:grid sm:grid-cols-1 sm:gap-8 sm:px-6 text-center">
          <h1 className="text-6xl text-green-400 font-semibold py-3 ">
            {title}
          </h1>
          <h3 className="text-3xl  text-green-200 font-semibold">
            {original}
          </h3>
        </div>

        <div className="px-4 py-5 sm:grid sm:grid-cols-1 sm:gap-8 sm:px-6"></div>

        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="grid grid-flow-col gap-4 px-8 max-w-screen-xl">
            <div className="row-span-4">
              <img
                className="py-32"
                src={image}
              />
            </div>
            <div className="col-span-1">
              <div className="border-t border-gray-200">
                <dl>
                  <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className=" font-medium text-gray-500">Released</dt>
                    <dd className="mt-1  text-gray-900 sm:mt-0 sm:col-span-2">
                      {released}
                    </dd>
                  </div>
                  <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className=" font-medium text-gray-500">Synopsis</dt>
                    <dd className="mt-1  text-gray-900 sm:mt-0 sm:col-span-2">
                      {description.slice(0, 1500)}
                      {description.length > 1500 ? (
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
                  <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className=" font-medium text-gray-500">Length</dt>
                    <dd className="mt-1  text-gray-900 sm:mt-0 sm:col-span-2">
                      {parseLength(length)}
                    </dd>
                  </div>
                  <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className=" font-medium text-gray-500">Vote</dt>
                    <dd className="mt-1  text-gray-900 sm:mt-0 sm:col-span-2">
                      {vote === null ? "Not Rated" : vote / 10}
                    </dd>
                  </div>

                  <div className={`bg-${parseStatusColor(status)}-200 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6`}>
                    <dt className="text font-medium text-indigo-800">
                      Some Thoughts
                    </dt>
                    <dd className="mt-1 text text-indigo-600 sm:mt-0 sm:col-span-2">
                      {notes}
                    </dd>
                  </div>

                  <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className=" font-medium text-gray-500">Added</dt>
                    <dd className="mt-1  text-gray-900 sm:mt-0 sm:col-span-2">
                      {added}
                    </dd>
                  </div>

                  <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
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
                  </div>
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
                class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-pink-600 text-base font-medium text-white hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm"
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

function parseISOString(s) {
  var b = s.split(/\D+/);
  return new Date(Date.UTC(b[0], --b[1], b[2], b[3], b[4], b[5], b[6]));
}

function isoFormatDMY(d) {
  function pad(n) {
    return (n < 10 ? "0" : "") + n;
  }
  return (
    d.getUTCFullYear() +
    "-" +
    pad(d.getUTCMonth() + 1) +
    "-" +
    pad(d.getUTCDate())
  );
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
