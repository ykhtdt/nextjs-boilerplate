"use client"

import { useParams } from 'next/navigation';

export default function Page() {
  const params = useParams();

  return (
    <div className="p-4 border border-dashed border-inherit">
      {params.category}
    </div>
  )
}