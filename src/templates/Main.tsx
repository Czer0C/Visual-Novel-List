import { ReactNode } from 'react';

import ThemeSwitcher from '@/components/ThemeSwitcher';
import { AppConfig } from '@/utils/AppConfig';

type IMainProps = {
  meta: ReactNode;
  children: ReactNode;
};

const Main = (props: IMainProps) => (
  <div className="w-full px-1 text-gray-700 antialiased dark:bg-gray-900">
    {props.meta}

    <div className="mx-auto max-w-screen-md">
      <div className="border-b border-gray-300">
        <div className="py-4">
          <div className="text-3xl font-bold text-gray-900 dark:text-gray-200">
            {AppConfig.title}
          </div>
          <div className="flex items-end justify-between text-xl dark:text-gray-400">
            <span>{AppConfig.description}</span>

            <ThemeSwitcher />
          </div>
        </div>
      </div>

      <div className="contents py-5 text-xl">{props.children}</div>

      <div className="border-t border-gray-300 py-8 text-center text-sm dark:text-gray-400">
        © Copyright {new Date().getFullYear()} {AppConfig.title}. Powered with{' '}
        <span role="img" aria-label="Love">
          ♥
        </span>{' '}
        by <a href="https://creativedesignsguru.com">CreativeDesignsGuru</a>
        {/*
         * PLEASE READ THIS SECTION
         * We'll really appreciate if you could have a link to our website
         * The link doesn't need to appear on every pages, one link on one page is enough.
         * Thank you for your support it'll mean a lot for us.
         */}
      </div>
    </div>
  </div>
);

export { Main };
