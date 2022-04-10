import * as TooltipPrimitive from '@radix-ui/react-tooltip';
import cx from 'classnames';

interface Props {
  children: any;
  content: string;
}

const Tooltip = ({ children, content }: Props) => {
  return (
    <TooltipPrimitive.Provider delayDuration={400}>
      <TooltipPrimitive.Root>
        <TooltipPrimitive.Trigger asChild>{children}</TooltipPrimitive.Trigger>
        <TooltipPrimitive.Content
          sideOffset={4}
          className={cx(
            'radix-side-top:animate-slide-down-fade',
            'radix-side-right:animate-slide-left-fade',
            'radix-side-bottom:animate-slide-up-fade',
            'radix-side-left:animate-slide-right-fade',
            'inline-flex items-center rounded-md px-4 py-2.5',
            'bg-white text-gray-500 dark:bg-gray-600 dark:text-white'
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
