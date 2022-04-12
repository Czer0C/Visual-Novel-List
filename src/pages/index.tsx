import { Fragment, useState } from 'react';

import { Transition } from '@headlessui/react';
import * as AccordionPrimitive from '@radix-ui/react-accordion';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import {
  ArrowDownIcon,
  ArrowUpIcon,
  CaretSortIcon,
  HamburgerMenuIcon,
} from '@radix-ui/react-icons';
import cx from 'classnames';
import Image from 'next/image';

import Button from '@/components/Button';
import Select from '@/components/Select';
import Tabs from '@/components/Tab';
import Tag from '@/components/Tag';
import ThemeSwitcher from '@/components/ThemeSwitcher';
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
  const [isOpen, setIsOpen] = useState(false);

  const [content, setContent] = useState<MergedVNItem>({
    vote: 0,
    status: '-',
    id: 0,
    notes: '',
    title: '',
    statusCode: 0,
    voted: '',
    image_nsfw: false,
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

  const handleModal = (row: MergedVNItem) => {
    setContent(() => ({
      ...row,
    }));
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
      <ThemeSwitcher />

      <div className="flex min-h-screen min-w-min items-start justify-center font-sans">
        <div className="my-6 rounded bg-white shadow-lg">
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-gray-300 text-sm uppercase leading-normal text-gray-600">
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
                <>
                  <tr key={row.id} className="border-b-2 border-gray-200 pb-2">
                    <td className="w-10 p-3 text-left">
                      <span className="font-medium">{index + 1}</span>
                    </td>
                    <td className="w-32 p-3 text-left sm:w-80">
                      <div className="flex items-center">
                        <div className="mr-2">
                          {row.image ? (
                            <>
                              <Image
                                src={row.image}
                                alt={row.title}
                                layout="intrinsic"
                                width={70}
                                height={90}
                                objectFit="contain"
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
                    <td className="w-32 p-3 text-left font-medium">
                      {row.released}
                    </td>
                    <td className="w-24 p-3 text-center">
                      {row.vote > 0 ? <Tag vote={row.vote} /> : '—'}
                    </td>

                    <td className="w-24 p-3 text-center">
                      {/* <Dialog content={row} /> */}
                      <DialogPrimitive.Root
                        modal
                        open={isOpen}
                        onOpenChange={setIsOpen}
                      >
                        <DialogPrimitive.Trigger asChild>
                          <Button
                            aria-label="View Note"
                            onClick={() => handleModal(row)}
                          >
                            <HamburgerMenuIcon />
                          </Button>
                        </DialogPrimitive.Trigger>
                      </DialogPrimitive.Root>
                    </td>
                  </tr>

                  <tr>
                    <td colSpan={5}>
                      <AccordionPrimitive.Root
                        type="single"
                        collapsible
                        // defaultValue="item-1"
                        className={cx('space-y-4')}
                      >
                        <AccordionPrimitive.Item
                          value={`item-1`}
                          className="rounded-lg focus-within:ring focus-within:ring-purple-500 focus-within:ring-opacity-75 focus:outline-none"
                        >
                          <AccordionPrimitive.Header className="w-full">
                            <AccordionPrimitive.Trigger
                              className={cx(
                                'group',
                                'radix-state-open:rounded-t-lg radix-state-closed:rounded-lg',
                                'focus:outline-none',
                                'inline-flex w-full items-center justify-between bg-white px-4 py-2 text-left dark:bg-gray-800'
                              )}
                            ></AccordionPrimitive.Trigger>
                          </AccordionPrimitive.Header>
                          <AccordionPrimitive.Content className="pt-r1 w-full rounded-b-lg bg-white px-4 pb-3 dark:bg-gray-800">
                            <div className="text-sm text-gray-700 dark:text-gray-400">
                              {row.notes}
                            </div>
                          </AccordionPrimitive.Content>
                        </AccordionPrimitive.Item>
                      </AccordionPrimitive.Root>
                    </td>
                  </tr>
                </>
              ))}
            </tbody>
          </table>
          {data.length === 0 && (
            <span className="block w-full p-2 text-center">No Result</span>
          )}
        </div>
      </div>

      <DialogPrimitive.Root modal open={isOpen} onOpenChange={setIsOpen}>
        <Transition.Root show={isOpen}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <DialogPrimitive.Overlay
              forceMount
              className="fixed inset-0 z-20 bg-black/50"
            />
          </Transition.Child>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <DialogPrimitive.Content
              forceMount
              className={cx(
                'fixed z-50',
                'w-[95vw] max-w-md rounded-lg p-4 md:w-full max-h-[600px] sm:max-h-full overflow-auto',
                'top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%]',
                'bg-white dark:bg-gray-800',
                'focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75'
              )}
            >
              <div className="flex items-center justify-between">
                <DialogPrimitive.Title className="text-lg font-medium text-gray-900 dark:text-gray-100">
                  {content?.title || "VNDB's Nuked Entry"} -{' '}
                  {content?.vote > 0 ? content?.vote : 'Not Rated'}
                </DialogPrimitive.Title>
                <Tag status={content?.status} />
              </div>

              <Tabs />

              <DialogPrimitive.Description className="text-sm font-normal text-gray-700 dark:text-gray-400">
                {content?.notes}
              </DialogPrimitive.Description>

              <div className="mt-4 flex justify-end">
                <DialogPrimitive.Close
                  className={cx(
                    'inline-flex select-none justify-center rounded-md px-4 py-2 text-sm font-medium',
                    'bg-violet-600 text-white hover:bg-violet-700 dark:bg-violet-700 dark:text-violet-100 dark:hover:bg-violet-600',
                    'border border-transparent',
                    'focus:outline-none focus-visible:ring focus-visible:ring-violet-500 focus-visible:ring-opacity-75'
                  )}
                >
                  Close
                </DialogPrimitive.Close>
              </div>
            </DialogPrimitive.Content>
          </Transition.Child>
        </Transition.Root>
      </DialogPrimitive.Root>
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
