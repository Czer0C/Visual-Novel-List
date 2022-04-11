/* eslint-disable unused-imports/no-unused-vars */
import React from 'react';

import * as AccordionPrimitive from '@radix-ui/react-accordion';
import { ChevronDownIcon } from '@radix-ui/react-icons';
import cx from 'classnames';

const Accordion = () => {
  return (
    <AccordionPrimitive.Root
      type="single"
      collapsible
      defaultValue="item-1"
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
          >
            <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
              What is Radix UI?
            </span>
            <ChevronDownIcon
              className={cx(
                'ml-2 h-5 w-5 shrink-0 text-gray-700 ease-in-out dark:text-gray-400',
                'group-radix-state-open:rotate-180 group-radix-state-open:duration-300'
              )}
            />
          </AccordionPrimitive.Trigger>
        </AccordionPrimitive.Header>
        <AccordionPrimitive.Content className="pt-r1 w-full rounded-b-lg bg-white px-4 pb-3 dark:bg-gray-800">
          <div className="text-sm text-gray-700 dark:text-gray-400">
            Radix Primitives is a low-level UI component library with a focus on
            accessibility, customization and developer experience
          </div>
        </AccordionPrimitive.Content>
      </AccordionPrimitive.Item>
    </AccordionPrimitive.Root>
  );
};

export default Accordion;
