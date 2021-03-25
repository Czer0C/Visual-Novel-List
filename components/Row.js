import React, {useState} from "react";
import Link from "next/link";

import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExternalLinkAlt } from "@fortawesome/free-solid-svg-icons";

import moment from 'moment';

export const Row = ({ data, index, selectedRow, toggleModal }) => {
  const { vote, added, voted, status } = data;
  const { 
    description,
    image,
    length,
    title,
    image_nsfw,
    original,
    released,
    id } = data.vn;
      console.log(selectedRow)
  return (
    <tr className={`main-row select-none cursor-pointer rounded-md ${selectedRow === index && 'selected-row'}`} onClick={toggleModal}>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900 whitespace-no-wrap">{index + 1}</p>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
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
            <div className="text-sm font-medium text-gray-900">
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
            <div className="text-sm text-gray-500">{original}</div>
          </div>
        </div>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p
          className="text-gray-900 whitespace-no-wrap"
          style={{ minWidth: "75px" }}
        >
          {voted
            ? moment(voted * 1000).format("MM/DD/YYYY")
            : "Not rated"}
        </p>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <span className={parseStatusColor(status)}>{parseStatus(status)}</span>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-center">
        {vote <= 0 ? "Not Rated" : vote / 10}
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-center">
        {
          status !== 1 ?
          <Link href={`/vn/${id}`}>
            <a className="text-indigo-600 hover:text-indigo-900">Detail</a>
          </Link> : 
          null
        }
      </td>
    </tr>
  );
};

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

function parseISOString(s) {
  var b = s.split(/\D+/);
  return new Date(Date.UTC(b[0], --b[1], b[2], b[3], b[4], b[5], b[6]));
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
  let cl = "px-2 inline-flex text-xs leading-5 font-semibold rounded-full ";
  let color = "";

  switch (status) {
    case 1:
      color = "purple";
      break;
    case 2:
      color = "green";
      break;
    case 3:
      color = "yellow";
      break;
    case 4:
      color = "red";
      break;
    case 5:
      color = "indigo";
      break;
    case 6:
      color = "purple";
      break;
  }

  return cl + "bg-" + color + "-100 " + "text-" + color + "-800";
}
