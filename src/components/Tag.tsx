/* eslint-disable no-nested-ternary */
import cx from 'classnames';

interface TagProp {
  vote?: number;
  status?: string;
}

const Tag = ({ vote = 0, status }: TagProp) => (
  <span
    className={cx(
      'rounded-full  py-1 px-3 text-xs font-semibold',
      !status
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
        : status === 'Stalled'
        ? 'text-yellow-800 bg-yellow-300'
        : status === 'Dropped'
        ? 'text-orange-800 bg-orange-300'
        : 'text-indigo-800 bg-indigo-300'

      // vote > 5 ? 'bg-purple-200 text-purple-600' : 'bg-red-200 text-red-600'
    )}
  >
    {vote || status}
  </span>
);

Tag.displayName = 'Tag';
export default Tag;
