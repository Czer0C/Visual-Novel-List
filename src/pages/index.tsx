import { useState } from 'react';

import {
  ArrowDownIcon,
  ArrowUpIcon,
  CaretSortIcon,
} from '@radix-ui/react-icons';

import Dialog from '@/components/Dialog';
import Select from '@/components/Select';
import Tag from '@/components/Tag';
import Tooltip from '@/components/Tooltip';
import { Meta } from '@/layout/Meta';
import { Main } from '@/templates/Main';
import { getFullList } from '@/utils/connect';
import { MergedVNItem, SORT_STATE } from '@/utils/types';

interface Props {
  list: MergedVNItem[];
}

const ICONS = {
  asc: <ArrowUpIcon />,

  desc: <ArrowDownIcon />,

  init: <CaretSortIcon />,
};

const Index = ({ list }: Props) => {
  const [data, setData] = useState(list);

  const [sortMode, setSortMode] = useState(SORT_STATE.init);

  const sortByVote = () => {
    switch (sortMode) {
      case SORT_STATE.init:
        setData([...data].sort((a, b) => a.vote - b.vote));
        setSortMode(SORT_STATE.asc);

        break;
      case SORT_STATE.asc:
        setData([...data].sort((a, b) => b.vote - a.vote));
        setSortMode(SORT_STATE.desc);

        break;
      case SORT_STATE.desc:
        setData([...data].sort((a, b) => a.id - b.id));
        setSortMode(SORT_STATE.init);
        break;

      default:
        break;
    }
  };

  const handleFilter = (newValue: string) => {
    const filteredList =
      newValue === 'all'
        ? [...list]
        : [...list].filter((row) => row.status.toLowerCase() === newValue);

    switch (sortMode) {
      case SORT_STATE.init:
        break;

      case SORT_STATE.asc:
        filteredList.sort((a, b) => a.vote - b.vote);

        break;
      case SORT_STATE.desc:
        filteredList.sort((a, b) => b.vote - a.vote);
        break;

      default:
        break;
    }

    setData(filteredList);
  };

  return (
    <Main
      meta={
        <Meta
          title="Czer0C Visual Novel List"
          description="A list to keep track of my vn journey."
        />
      }
    >
      <div className="flex min-h-screen min-w-min items-start justify-center font-sans">
        <div className="my-6 rounded bg-white shadow-lg">
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-gray-200 text-sm uppercase leading-normal text-gray-600">
                <th className="rounded-tl-lg p-3 text-left">#</th>
                <th className="p-3 text-left">
                  Title
                  {/* <input
                    type="text"
                    autoComplete="title"
                    placeholder="Quick Search"
                    onChange={handleSearch}
                    className={classNames(
                      'block w-1/2 rounded-md',
                      'text-xs text-gray-700 placeholder:text-gray-500 dark:text-gray-600 dark:placeholder:text-gray-500',
                      'border border-gray-400 focus-visible:border-transparent dark:border-gray-700 dark:bg-gray-200',
                      'focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75'
                    )}
                  /> */}
                </th>
                <th className="p-3 text-left">Released</th>
                <th className="p-3 text-center">
                  <Tooltip content="Sort By Score">
                    <button
                      className="flex items-center justify-center gap-2 rounded-md px-3 py-2 text-sm font-bold uppercase leading-normal focus:outline-none focus-visible:ring focus-visible:ring-gray-500 focus-visible:ring-opacity-75"
                      onClick={sortByVote}
                    >
                      Vote {ICONS[sortMode]}
                    </button>
                  </Tooltip>
                </th>

                <th className="rounded-tr-lg p-3 text-center">
                  <Select onChange={handleFilter} />
                </th>
              </tr>
            </thead>

            <tbody className="text-sm font-light text-gray-600">
              {data.map((row, index) => (
                <tr key={row.id} className="border-b-2 border-gray-200 pb-2">
                  <td className="w-10 p-3 text-left">
                    <span className="font-medium">{index + 1}</span>
                  </td>
                  <td className="w-32 p-3 text-left sm:w-80">
                    <div className="flex items-center">
                      <div className="mr-2">
                        {row.image ? (
                          <>
                            <img
                              className="aspect-auto w-24"
                              src={row.image}
                              alt={row.title}
                            />
                          </>
                        ) : (
                          ''
                        )}
                      </div>
                      <Tooltip
                        content={`${row.title}${
                          row.original ? ` - ${row.original}` : ''
                        }`}
                      >
                        <span className="w-40 overflow-hidden text-ellipsis whitespace-nowrap font-normal">
                          <a
                            href={`https://vndb.org/v${row.id}`}
                            target="_blank"
                            rel="noreferrer"
                            className="outline-gray-500 focus-visible:outline-dashed focus-visible:outline-2 focus-visible:outline-offset-0"
                          >
                            {row.title || "VNDB's Nuked Entry"}
                          </a>
                          <br />
                          {row.original} <br />
                        </span>
                      </Tooltip>
                    </div>
                  </td>
                  <td className="w-32 p-3 text-left font-normal">
                    {row.released}
                  </td>
                  <td className="w-24 p-3 text-center">
                    {row.vote > 0 ? <Tag vote={row.vote} /> : '—'}
                  </td>

                  <td className="w-24 p-3 text-center">
                    <Dialog content={row} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {data.length === 0 && (
            <span className="block w-full p-2 text-center">No Result</span>
          )}
        </div>
      </div>
    </Main>
  );
};

export default Index;

export const getStaticProps = async () => {
  const list = await getFullList();
  return {
    props: {
      list,
    },
  };
};
