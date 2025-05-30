import Link from 'next/link';

import MedusaIcon from 'components/icons/medusa';
import FooterMenu from 'components/layout/footer-menu';
import LogoSquare from 'components/logo-square';
import { getMenu } from 'lib/medusa';
import { Suspense } from 'react';

const { COMPANY_NAME, SITE_NAME } = process.env;

export default async function Footer() {
  const currentYear = new Date().getFullYear();
  const copyrightDate = 2023 + (currentYear > 2023 ? `-${currentYear}` : '');
  const skeleton = 'w-full h-6 animate-pulse rounded bg-neutral-200  bg-neutral-700';
  const menu = await getMenu('next-js-frontend-footer-menu');
  const copyrightName = COMPANY_NAME || SITE_NAME || '';

  return (
    <footer className="text-sm border-t  border-neutral-700  text-foreground">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-6    px-6 py-12 text-sm    md:flex-row md:gap-12 md:px-4 xl:px-0">
        <div>
          <Link className="flex items-center gap-2    md:pt-1" href="/">
            <LogoSquare size="sm" />
            <span className=" italic font-lobster text-2xl ">  Consoli Barber </span>
          </Link>
        </div>
        <Suspense
          fallback={
            <div className="flex h-[188px] w-[200px] flex-col gap-2">
              <div className={skeleton} />
              <div className={skeleton} />
              <div className={skeleton} />
              <div className={skeleton} />
              <div className={skeleton} />
              <div className={skeleton} />
            </div>
          }
        >
          <FooterMenu menu={menu} />
        </Suspense>
        <div className="md:ml-auto">
          <a
            className="flex h-8 flex-none items-center justify-center rounded-md border border-neutral-200 bg-background text-xs text-foreground  border-neutral-700  bg-black  text-white"
            aria-label="Deploy on Vercel"
            href="https://vercel.com/templates/next.js/nextjs-commerce"
          >
            <span className="px-3">▲</span>
            <hr className="h-full border-r border-neutral-200  border-neutral-700" />
            <span className="px-3">Deploy</span>
          </a>
        </div>
      </div>
      <div className="border-t border-neutral-200 py-6 text-sm  border-neutral-700">
        <div className="mx-auto flex w-full max-w-7xl flex-col items-center gap-1 px-4 md:flex-row md:gap-0 md:px-4 xl:px-0">
          <p>
            &copy; {copyrightDate} {copyrightName}
            {copyrightName.length && !copyrightName.endsWith('.') ? '.' : ''} All rights reserved.
          </p>
          <hr className="mx-4 hidden h-4 w-[1px] border-l border-neutral-400 md:inline-block" />
          <p>Designed in California</p>
          <p className="md:ml-auto">
            Crafted by{' '}
            <a
              rel="noopener noreferrer"
              href="https://medusajs.com"
              aria-label="Vmedusajs.com Link"
              target="_blank"
              className="text-foreground  text-white"
            >
              <MedusaIcon className="ml-3 inline-block h-6" />
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
