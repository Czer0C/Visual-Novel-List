import React, { useState } from "react";
import Link from "next/link";

import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExternalLinkAlt } from "@fortawesome/free-solid-svg-icons";

const statusMapping = [
  "Playing",
  "Finished",
  "Stalled",
  "Dropped",
  "Wishlist",
  "Blacklist",
];

const colorMapping = [
  "purple", 
  "green", 
  "yellow", 
  "red", 
  "indigo", 
  "purple"
];

interface RowProps {
  data: Entry,
  index: number,
  selectedRow: number,
  toggleModal: () => void
}

type Entry = {
  notes: string,
  voted: string,
  vote: number,
  status: number,
  vn: VisualNovel
}

type VisualNovel = {
  [name: string]: any
}

export const Row = ({ data, index, selectedRow, toggleModal }: RowProps) => {
  const { vote, voted, status } = data;
  const {
    description,
    image,
    length,
    title,
    image_nsfw,
    original,
    released,
    id,
  } = data.vn;

  return (
    <tr
      className={`main-row select-none cursor-pointer rounded-md ${
        selectedRow === index && "selected-row"
      }`}
      onClick={toggleModal}
    >
      <td className="w-24 py-4 border-b border-gray-200 bg-white text-sm text-center">
        <p className="text-gray-900 whitespace-no-wrap">
          {index + 1}
        </p>
      </td>

      <td className="w-screen px-4 py-4 border-b border-gray-200 bg-white text-sm">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <a href="#" className="block relative">
              <img
                className="mx-auto object-cover w-12"
                src={image}
                alt={`cover-image-${title}`}
              />
            </a>
          </div>
          <div className="ml-4">
            <div className="text-sm  font-medium text-gray-900 max-w-xs overflow-hidden whitespace-nowrap overflow-ellipsis" >
              {title}

              <Tippy content="View on VNDB">
                <a
                  href={`https://vndb.org/v${id}`}
                  target="_blank"
                  className="text-indigo-500 hover:text-indigo-700 sm:ml-4"
                >
                  <FontAwesomeIcon icon={faExternalLinkAlt} />
                </a>
              </Tippy>
            </div>
            <div className="text-sm text-gray-500 max-w-xs overflow-hidden whitespace-nowrap overflow-ellipsis">{original}</div>
          </div>
        </div>
      </td>
      <td className="w-24 py-4 border-b border-gray-200 bg-white text-sm text-center">
        <p className="text-gray-900 whitespace-no-wrap">
          {released}
        </p>
      </td>
      
      <td className="w-24 px-4 py-4 border-b border-gray-200 bg-white text-sm text-center">
        {vote}
      </td>
      
      <td className="w-24 px-4 py-4 border-b border-gray-200 bg-white text-sm text-center">
        <span
          className={`px-3 inline-flex text-xs leading-6 font-semibold rounded-md
          bg-${colorMapping[status - 1]}-100 text-${
            colorMapping[status - 1]
          }-800`}
        >
          {statusMapping[status - 1]}
        </span>
      </td>
      <td className="w-24 px-4 py-4 border-b border-gray-200 bg-white text-sm text-center">
        {status !== 1 ? (
          <Link href="javascript:void(0)" >
            <a className="text-indigo-600 hover:text-indigo-900 text-center pointer-events-none">
              Detail
            </a>
          </Link>
        ) : null}
      </td>
    </tr>
  );
};