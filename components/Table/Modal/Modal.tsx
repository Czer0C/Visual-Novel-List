import React, { useEffect, useLayoutEffect } from "react";

import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExternalLinkAlt } from "@fortawesome/free-solid-svg-icons";
import { Close } from "@components/icons/Close";

import useOnClickOutside from "use-onclickoutside";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import { CoverImage } from "./CoverImage";
import "react-circular-progressbar/dist/styles.css";
import { useLockBodyScroll } from "lib/hooks/useLockBodyScroll";

interface ModalProps {
  details: any;
  toggleModal: () => void;
  isVisible: boolean;
}

export const Modal = ({ details, toggleModal }: ModalProps) => {
  const { vote, added, voted, status, notes } = details;
  const ref = React.useRef(null);

  useEscape(toggleModal);

  useOnClickOutside(ref, toggleModal);

  useLockBodyScroll();

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
      ? "#34D399"
      : vote > 8
      ? "#3B82F6"
      : vote > 7
      ? "#6366F1"
      : vote > 5
      ? "#f6e017"
      : vote > 0
      ? "#EF4444"
      : "#6B7280";
  };

  const ratingColor = colorRating(vote);

  return (
    <div
      className={`main-modal fixed inset-0 z-40 overflow-auto`}
      aria-labelledby="dialog-1-title"
      role="dialog"
      aria-modal="true"
      id="main-modal"
    >
      <div className="justify-center pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div
          className="
            inline-block align-bottom bg-white text-left rounded-lg overflow-hidden 
            shadow-xl transform transition-all max-w-7xl modal-body"
          ref={ref}
        >
          <div className="px-4 py-5 sm:grid sm:grid-cols-8  sm:gap-8 sm:px-6">
            <div
              className="col-span-2 ml-auto"
              style={{ animation: "fadeInUp 1.5s" }}
            >
              <CoverImage nsfw={image_nsfw} url={image} title={title} />
            </div>
            <h1
              className="text-5xl -m-5 mt-10 leading-normal text-green-400 text-center col-span-4 font-semibold "
              style={{ animation: "fadeInUp 1.5s" }}
            >
              {title}
              {original && (
                <p className="text-2xl mt-5 mb-5 text-green-200 font-semibold">
                  {original}
                </p>
              )}
              <p className="text-base  mt-3 font-medium text-gray-600">
                Released on {released}
              </p>
              <p className="text-base  mt-3 font-medium text-gray-600">
                {parseLength(length)}
              </p>
            </h1>

            <div
              className="h-64 shadow-lg rounded-2xl col-span-2 w-52  bg-white dark:bg-gray-800"
              style={{ animation: "fadeInUp 1.5s" }}
            >
              <div className="mt-4 ml-2" style={{ width: 185, height: 185 }}>
                <CircularProgressbar
                  className={` font-semibold p-4 m-1`}
                  value={vote * 10}
                  text={`${vote === -1 ? "-" : vote}`}
                  styles={buildStyles({
                    textSize: "2.5rem",
                    textColor: ratingColor,
                    pathColor: ratingColor,
                  })}
                />
              </div>
              <span
                className={`px-3 py-1 ml-16 leading-10  font-medium rounded-lg 
                              bg-${parseStatusColor(status)}-200 
                              text-${parseStatusColor(status)}-700`}
              >
                {parseStatus(status)}
              </span>
            </div>

            <button
              type="button"
              className="right-10 absolute p-2 rounded-md 
              focus:outline-none focus:ring-2 focus:ring-red-500  sm:-mr-2"
              onClick={toggleModal}
            >
              <span className="sr-only">Dismiss</span>
              <Close />
            </button>
          </div>

          <div className="bg-white  overflow-hidden sm:rounded-lg">
            <div className="grid grid-flow-col gap-4 px-20 max-w-screen-xl">
              <div className="col-span-1">
                <div>
                  <dl className="mb-10" style={{ animation: "fadeInUp 1.5s" }}>
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
                              rel="noreferrer"
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
                      style={{ animation: "fadeInUp 1.75s" }}
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
      key: string;
    }

    function downHandler({ key }: HandlerProps) {
      if (key === "Escape") {
        toggleModal();
      }
    }

    window.addEventListener("keydown", downHandler);

    return () => window.removeEventListener("keydown", downHandler);
  });
};
