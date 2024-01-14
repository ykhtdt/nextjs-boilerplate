"use client";

import { routingData } from "@/data/routing";

import { useParams } from "next/navigation";

export default function Page() {
  const params = useParams();

  const slug = params.slug as string;

  const data = routingData.find((data) => data.key === slug.replace("-", " "));

  return (
    <div className="text-sm">
      <h3 className="mt-4 mb-2 text-lg font-bold capitalize">
        {slug.replace("-", " ")}
      </h3>
      {data &&
        <ul className="pl-6 list-disc">
          {data.description.map((description, i) => (
            <li className="pl-1 my-2" key={`description-${i}`}>
              {description}
            </li>
          ))}
        </ul>
      }
    </div>
  )
}
