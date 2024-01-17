"use client"

import { Provider } from 'jotai';

import { Separator } from "@/components/ui/separator";
import { Badge } from '@/components/ui/badge';
import { BadgeLayout } from '@/components/layout/badge-layout';

import Counter from '@/app/examples/jotai/_ui/counter';

export default function Page() {
  return (
    <BadgeLayout display="Children">
      <div>
        <h3 className="mb-2 text-lg font-bold">Provider</h3>
        <p className="text-sm">
          The Provider component is to provide state for a component sub tree.
        </p>
      </div>
      <div className="relative items-center gap-8 p-6 border border-blue-600 border-dashed rouned-md">
        <Badge variant="secondary" className="absolute font-normal uppercase tracking-widest -top-2.5 bg-blue-600 text-[10px]">
          Provider A
        </Badge>
        <div className="space-y-4">
          <p className="text-sm">
            The 'count' atom is shared within Provider A.
          </p>
          <div className="flex flex-wrap gap-8">
            <Provider>
              <Counter />
              <Counter />
            </Provider>
          </div>
        </div>
      </div>
      <div className="relative items-center gap-8 p-6 border border-yellow-600 border-dashed rouned-md">
        <Badge variant="secondary" className="absolute font-normal uppercase tracking-widest -top-2.5 bg-yellow-600 text-[10px]">
          Provider B
        </Badge>
        <div className="space-y-4">
          <p className="text-sm">
            The 'count' atom is shared within Provider B.
          </p>
          <div className="flex flex-wrap gap-8">
            <Provider>
              <Counter />
              <Counter />
            </Provider>
          </div>
        </div>
      </div>
      <Separator />
      <div className="space-y-4">
        <h3 className="mb-2 text-lg font-bold">Provider less</h3>
        <p className="text-sm leading-6">
          If you don't use a Provider, it works as provider-less mode with a default store.
          <br />
          It maintain and shares state even after unmount.
        </p>
        <div className="flex flex-wrap gap-8">
          <Counter />
          <Counter />
        </div>
      </div>
    </BadgeLayout>
  )
}