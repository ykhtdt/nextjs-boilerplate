'use client'

import { Fragment } from 'react';
import { usePathname } from 'next/navigation';

import clsx from 'clsx';

import { ChevronRight } from 'lucide-react'

export default function Breadcrumb() {
  const pathname = usePathname();

  return (
    <div className="-mt-4 mb-7 md:mt-2 md:mb-10">
      <div className="flex flex-wrap items-center gap-2 text-sm">
        {pathname.split('/').slice(1, 5).map((segment, i) => {
          const isLast = pathname.split('/').slice(1, 5).length - 1 === i;

          return (
            <Fragment key={segment}>
              <span>
                <span
                  key={segment}
                  className={clsx('overflow-hidden text-ellipsis whitespace-nowrap capitalize', {
                    ['text-muted-foreground']: !isLast,
                    ['font-medium']: isLast,
                  })}
                >
                  {segment.replace("-", " ")}
                </span>
              </span>

              {!isLast &&
                <span>
                  <ChevronRight className="w-4 h-4" />
                </span>
              }
            </Fragment>
          );
        })}
      </div>
    </div>
  )
}