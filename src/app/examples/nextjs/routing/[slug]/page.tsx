"use client";

import { useParams } from "next/navigation";

export default function Page() {
  const params = useParams();

  const slug = params.slug as string;

  return (
    <div className="text-sm">
      <h3 className="mt-4 mb-2 text-lg font-bold capitalize">
        {slug.replace("-", " ")}
      </h3>
      <ul className="pl-6 list-disc">
        <li className="pl-1 my-2">
          Applied to a specific path segment, it renders when that segment is activated.
        </li>
        <li className="pl-1 my-2">
          On navigation, layouts preserve state, and do not re-render. Two or more layouts can also be nested.
        </li>
      </ul>
    </div>
  )
}
