import * as TooltipPrimitive from '@radix-ui/react-tooltip';
import cx from 'classnames';

type Side = 'top' | 'bottom' | 'right' | 'left';
interface Props {
  children: any;
  content: string;
  side?: Side;
}

const Tooltip = ({ children, content, side }: Props) => {
  return (
    <TooltipPrimitive.Provider delayDuration={400}>
      <TooltipPrimitive.Root>
        <TooltipPrimitive.Trigger asChild>{children}</TooltipPrimitive.Trigger>
        <TooltipPrimitive.Content
          side={side}
          sideOffset={4}
          className={cx(
            'radix-side-top:animate-slide-down-fade',
            'radix-side-right:animate-slide-left-fade',
            'radix-side-bottom:animate-slide-up-fade',
            'radix-side-left:animate-slide-right-fade',
            'inline-flex items-center rounded-md px-2 py-1',
            'bg-slate-200 text-gray-700 dark:bg-gray-500 dark:text-gray-900 shadow-md'
          )}
        >
          <TooltipPrimitive.Arrow className="fill-current text-white dark:text-gray-800" />
          {content}
        </TooltipPrimitive.Content>
      </TooltipPrimitive.Root>
    </TooltipPrimitive.Provider>
  );
};

export default Tooltip;
