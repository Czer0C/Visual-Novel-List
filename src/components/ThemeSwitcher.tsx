import { useEffect, useState } from 'react';

import { MoonIcon, SunIcon } from '@radix-ui/react-icons';
import * as TogglePrimitive from '@radix-ui/react-toggle';

import Button from '@/components/Button';

const Toggle = () => {
  const [isDark, toggleDark] = useState<boolean>(false);

  useEffect(() => {
    toggleDark(localStorage.theme === 'dark');

    if (
      localStorage.theme === 'dark' ||
      (!('theme' in localStorage) &&
        window.matchMedia('(prefers-color-scheme: dark)').matches)
    ) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const handleToggle = (toggledDark: boolean) => {
    toggleDark(toggledDark);

    if (toggledDark) {
      localStorage.theme = 'dark';
      document.documentElement.classList.add('dark');
    } else {
      localStorage.theme = 'light';
      document.documentElement.classList.remove('dark');
    }
  };

  return (
    <TogglePrimitive.Root
      pressed={isDark}
      onPressedChange={handleToggle}
      asChild
    >
      <Button>
        {isDark ? (
          <MoonIcon className="h-5 w-5 text-gray-300 dark:text-gray-200" />
        ) : (
          <SunIcon className="h-5 w-5 text-gray-700 dark:text-gray-300" />
        )}
        <span className="ml-2 leading-5 dark:text-gray-200 ">
          {isDark ? 'Dark' : 'Light'}
        </span>
      </Button>
    </TogglePrimitive.Root>
  );
};

export default Toggle;
