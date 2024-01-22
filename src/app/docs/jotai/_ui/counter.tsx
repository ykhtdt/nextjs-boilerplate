"use client"

import { useAtom } from 'jotai';

import { countAtom } from '@/state/example-store/atom/countAtom'

import { Button } from '@/components/ui/button';

export default function Counter() {
  const [count, setCount] = useAtom(countAtom);

  const handleClick = () => {
    setCount((value) => value + 1);
  }

  return (
    <div className="inline-flex flex-col gap-2">
      <div className="font-medium">
        Counter
      </div>
      <div className="flex flex-row items-center gap-4">
        <div className="p-2 text-sm font-medium text-center border rounded-md min-w-[7.55rem] border-zinc-800">
          {count}
        </div>
        <Button variant="secondary" onClick={handleClick}>
          Click
        </Button>
      </div>
    </div>
  )
}