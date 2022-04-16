/* eslint-disable no-nested-ternary */
import cx from 'classnames';

import Tooltip from '@/components/Tooltip';

interface TagProp {
  vote?: number;
  status?: string;
  tier?: string;
}

const Tag = ({ vote = 0, status, tier = '' }: TagProp) => {
  return (
    <Tooltip content={`${tier} Tier`}>
      <span
        className={cx(
          'rounded-full py-1 px-3 text-xs font-bold',
          vote < 0
            ? ''
            : !status
            ? vote > 9
              ? 'text-teal-800 bg-teal-300'
              : vote > 8
              ? 'text-sky-800 bg-sky-300'
              : vote > 7
              ? 'text-indigo-800 bg-indigo-300'
              : vote > 6
              ? 'text-yellow-800 bg-yellow-300'
              : 'text-orange-800 bg-orange-300'
            : status === 'Finished'
            ? 'text-teal-800 bg-teal-300'
            : status === 'Stalled '
            ? 'text-yellow-800 bg-yellow-300'
            : status === 'Dropped'
            ? 'text-orange-800 bg-orange-300'
            : 'text-indigo-800 bg-indigo-300'
        )}
      >
        {vote < 0 ? '—' : vote || status}
      </span>
    </Tooltip>
  );
};

Tag.displayName = 'Tag';
export default Tag;
