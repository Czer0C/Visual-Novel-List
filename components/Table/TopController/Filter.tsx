import React, { ChangeEvent } from 'react';
import { Search } from '../../icons/Search';

interface FilterProps {
  handleFilter: (event: ChangeEvent<HTMLInputElement>) => void
}

export const Filter = ({ handleFilter }: FilterProps) => {
  return (
    <div className="relative ">
      <input
        type="text"
        id="form-subscribe-Filter"
        className=" h-10 pl-8 text-base placeholder-gray-600 border rounded-lg focus:shadow-outline focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
        placeholder="Start searching here"
        onChange={handleFilter}
      />
      <div className="absolute inset-y-0 left-0 flex items-center px-2 pointer-events-none">
        <Search />
      </div>
    </div>
  )
}