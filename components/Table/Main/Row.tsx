import React, { useState } from "react";
import Link from "next/link";

import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExternalLinkAlt } from "@fortawesome/free-solid-svg-icons";
import { Detail } from "@components/icons/Detail";

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
  onSelect: (index: number) => void
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

export const Row = ({ data, index, onSelect }: RowProps) => {
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
      className={`main-row select-none cursor-pointer rounded-md 
      `
    }
      onClick={() => onSelect(index)}
    >
      <td className="w-24 py-4 border-b border-gray-200 bg-white text-sm text-center">
        <p className="text-gray-600 whitespace-no-wrap">
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
            <div className="text-lg leading-normal font-extralight text-gray-700 max-w-xs overflow-hidden whitespace-nowrap overflow-ellipsis" >
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
      <td className="w-24 py-4 border-b border-gray-200 bg-white font-mono text-center">
        <p className="text-gray-600 whitespace-no-wrap">
          {released}
        </p>
      </td>

      <td className="w-24 px-4 py-4 border-b  text-gray-700 border-gray-200 bg-white  font-mono text-center">
        {vote === -1 ? '-' : vote}
      </td>

      <td className="w-24 px-4 py-4 border-b border-gray-200 bg-white text-sm text-center">
        <span
          className={`px-3 inline-flex text-xs leading-6 font-mono font-extralight rounded-md
          bg-${colorMapping[status - 1]}-100 text-${colorMapping[status - 1]
            }-700`}
        >
          {statusMapping[status - 1]}
        </span>
      </td>
      <td className="w-24 px-4 py-4 border-b border-gray-200 bg-white text-sm text-center">
      <Link href="javascript:void(0)" >
            <Tippy moveTransition="transform 2s ease-out" content="View Detail">
              <span className="">
                <a className="text-indigo-600 
                 text-center">
                  <Detail />
                </a>
              </span>
            </Tippy>
          </Link>
      </td>
    </tr>
  );
};