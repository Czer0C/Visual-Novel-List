import { SyntheticEvent, useState } from 'react';

import * as DialogPrimitive from '@radix-ui/react-dialog';
import {
  ArrowDownIcon,
  ArrowUpIcon,
  CaretSortIcon,
  HamburgerMenuIcon,
} from '@radix-ui/react-icons';

import Button from '@/components/Button';
import CoverImage from '@/components/CoverImage';
import Dialog from '@/components/Dialog';
import Select from '@/components/Select';
import Tag from '@/components/Tag';
import Title from '@/components/Title';
import Tooltip from '@/components/Tooltip';
import { MergedVNItem, SORT_STATE } from '@/utils/types';

interface Props {
  list: MergedVNItem[];
}

const ICONS = {
  asc: <ArrowUpIcon />,

  desc: <ArrowDownIcon />,

  init: <CaretSortIcon />,
};

const Table = ({ list }: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  const [content, setContent] = useState<MergedVNItem>({
    vote: 0,
    status: {
      id: 1,
      label: 'Default',
    },
    id: 0,
    notes: '',
    title: '',
    voted: '',
    image_nsfw: false,
    tier: 'B',
  });

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
        : [...list].filter(
            (row) => row.status.label.toLowerCase() === newValue
          );

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

  const handleModal = (event: SyntheticEvent) => {
    const { id } = event.currentTarget;

    const item = data.filter((row) => row.id === +id)[0];

    if (!item) return;

    setContent(() => ({
      ...item,
      state: item.status.label,
    }));
  };

  // const handleSearch = () => {};

  return (
    <>
      <table className="w-full table-auto">
        <thead>
          <tr className="bg-gray-200 text-sm uppercase leading-normal text-gray-600 dark:bg-gray-800 dark:text-gray-100">
            <th className="rounded-tl-lg p-3 text-left">#</th>
            <th className="flex h-[61px] items-center justify-between p-3 text-left">
              <span>
                Title
                {/* <Tooltip content="Sort By Score">
                  <button
                    className="flex items-center justify-center gap-2 rounded-md px-3 py-2 text-sm font-bold uppercase leading-normal focus:outline-none focus-visible:ring focus-visible:ring-gray-500"
                    onClick={sortByVote}
                  >
                    Title {ICONS[sortMode]}
                  </button>
                </Tooltip> */}
              </span>
              {/* <input
                type="text"
                autoComplete="title"
                placeholder="Quick Search"
                onChange={handleSearch}
                className={cx(
                  'block h-6 rounded-md',
                  'text-xs text-gray-700 placeholder:text-gray-500 dark:text-gray-600 dark:placeholder:text-gray-500',
                  'border border-gray-400 focus-visible:border-transparent dark:border-gray-700 dark:bg-gray-200',
                  'focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75'
                )}
              /> */}
            </th>
            <th className="p-3 text-left">
              Released
              {/* <Tooltip content="Sort By Score">
                <button
                  className="flex items-center justify-center gap-2 rounded-md px-3 py-2 text-sm font-bold uppercase leading-normal focus:outline-none focus-visible:ring focus-visible:ring-gray-500 focus-visible:ring-opacity-75"
                  onClick={sortByVote}
                >
                  Title {ICONS[sortMode]}
                </button>
              </Tooltip> */}
            </th>
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

        <tbody className="text-sm font-light text-gray-600 dark:text-gray-300">
          {data.map(
            (
              { image, title, id, original, image_nsfw, released, tier, vote },
              index
            ) => (
              <>
                <tr
                  key={id}
                  id={`${id}`}
                  className="border-b-2 border-gray-200 pb-2  dark:border-gray-400 dark:bg-gray-700"
                >
                  <td className="w-10 p-3 text-left">
                    <span className="font-medium">{index + 1}</span>
                  </td>
                  <td className="flex w-32 items-center p-3 text-left sm:w-80">
                    <CoverImage
                      src={image}
                      alt={`Cover for ${title}`}
                      nsfw={image_nsfw}
                    />
                    <Title title={title} original={original} id={id} />
                  </td>
                  <td className="w-32 p-3 text-left font-medium">{released}</td>
                  <td className="w-24 p-3 text-center">
                    <Tag vote={vote} tier={tier} />
                  </td>

                  <td className="w-24 p-3 text-center">
                    <DialogPrimitive.Root
                      modal
                      open={isOpen}
                      onOpenChange={setIsOpen}
                    >
                      <DialogPrimitive.Trigger asChild>
                        <Tooltip content="View Details">
                          <Button
                            aria-label="View Note"
                            id={`${id}`}
                            onClick={handleModal}
                          >
                            <HamburgerMenuIcon />
                          </Button>
                        </Tooltip>
                      </DialogPrimitive.Trigger>
                    </DialogPrimitive.Root>
                  </td>
                </tr>
              </>
            )
          )}
        </tbody>
      </table>

      {data.length === 0 && (
        <span className="block w-full p-2 text-center">No Result</span>
      )}

      <Dialog isOpen={isOpen} setIsOpen={setIsOpen} content={content} />
    </>
  );
};

export default Table;
