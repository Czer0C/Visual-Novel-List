/* eslint-disable no-nested-ternary */

import Tooltip from '@/components/Tooltip';
import { Nullable } from '@/utils/types';

interface TitleProps {
  title?: Nullable<string>;
  original?: Nullable<string>;
  id?: Nullable<number>;
}

const Title = ({ title, original, id }: TitleProps) => (
  <Tooltip content={`${title}${original ? ` - ${original}` : ''}`}>
    <span className="ml-2 w-40 overflow-hidden text-ellipsis whitespace-nowrap font-normal">
      <a
        href={`https://vndb.org/v${id}`}
        target="_blank"
        rel="noreferrer"
        className="outline-gray-500 hover:text-blue-500 focus-visible:outline-dashed focus-visible:outline-2 focus-visible:outline-offset-0"
      >
        {title || "VNDB's Nuked Entry"}
      </a>
      <br />
      {original} <br />
    </span>
  </Tooltip>
);

Title.displayName = 'Title';

export default Title;
