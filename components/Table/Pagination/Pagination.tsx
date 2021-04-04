import React from 'react'
import { PaginationButton } from './PaginationButton';

import { ArrowBack } from "../../icons/ArrowBack";
import { ArrowForw } from "../../icons/ArrowForw";

interface PaginationProps {
  current: number
  pages: number
  switchPage: (index: number, isOneStep: boolean) => void
  unavailable: boolean
}

export const Pagination = ({ current, pages, switchPage, unavailable }: PaginationProps) => {
  return (
    <div className="flex items-center">
      <PaginationButton
        current={current}
        switchPage={() => switchPage(-1, true)}
        type='back'
        pages={pages}
        index={-1}
        unavailable={unavailable}
      >
        <ArrowBack />
      </PaginationButton>
      {
        [...Array(pages).keys()].map(index =>
          <PaginationButton
            current={current}
            type='num'
            pages={pages}
            index={index}
            switchPage={() => switchPage(index, false)}
            key={`pagination-${index}`}
            unavailable={unavailable}
          >
            {index}
          </PaginationButton>)
      }
      <PaginationButton
        current={current}
        switchPage={() => switchPage(1, true)}
        type='forward'
        pages={pages}
        index={-1}
        unavailable={unavailable}
      >
        <ArrowForw />
      </PaginationButton>
    </div>
  )
}
