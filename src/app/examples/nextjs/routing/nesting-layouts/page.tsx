"use client";

import { routingData } from "@/data/routing";

export default function Page() {
  const data = routingData.find((data) => data.key === "nesting layouts");

  return (
    <div>
      <h3 className="mt-4 mb-2 text-lg font-bold capitalize">Nesting Layouts</h3>
      {data && (
        <ul className="pl-6 text-sm list-disc">
          {data.description.map((description, i) => (
            <li className="pl-1 my-2" key={`description-${i}`}>
              {description}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
