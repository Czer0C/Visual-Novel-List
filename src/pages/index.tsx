import { useState } from 'react';

import {
  ArrowDownIcon,
  ArrowUpIcon,
  CaretSortIcon,
} from '@radix-ui/react-icons';

import PopoverDemo from '@/components/Popover';
import Select from '@/components/Select';
import Tag from '@/components/Tag';
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
      <div className="">
        <div className="flex min-h-screen min-w-min items-start justify-center  font-sans">
          <div className="w-full">
            <div className="my-6 rounded bg-white shadow-md">
              <table className="w-full min-w-max table-auto">
                <thead>
                  <tr className="bg-gray-200 text-sm uppercase leading-normal text-gray-600">
                    <th className="p-3 text-left">#</th>
                    <th className="p-3 text-left">Title</th>
                    <th className="p-3 text-center">Released</th>
                    <th
                      onClick={sortByVote}
                      className="flex h-16 cursor-pointer items-center justify-center gap-2 p-3 text-center"
                    >
                      Vote {ICONS[sortMode]}
                    </th>

                    <th className="p-3 text-center">
                      <Select onChange={handleFilter} />
                    </th>
                  </tr>
                </thead>

                <tbody className="text-sm font-light text-gray-600">
                  {data.map((row, index) => (
                    <tr
                      key={row.id}
                      className="border-b border-gray-200 hover:bg-gray-100"
                    >
                      <td className="w-4 p-3 text-left">
                        <span className="font-medium">{index + 1}</span>
                      </td>
                      <td className="w-40 p-3 text-left">
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
                              'Deleted Entry'
                            )}
                          </div>
                          <span className="w-40 overflow-hidden text-ellipsis whitespace-nowrap font-normal leading-normal text-gray-700">
                            {row.title} <br />
                            {row.original} <br />
                          </span>
                        </div>
                      </td>
                      <td className="w-32 p-3 text-center">
                        <div className="flex items-center justify-center font-normal">
                          {row.released}
                        </div>
                      </td>
                      <td className="w-24 p-3 text-center">
                        <Tag vote={row.vote} />
                      </td>

                      <td className="w-24 p-3 text-center">
                        <PopoverDemo content={row.notes} status={row.status} />
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
