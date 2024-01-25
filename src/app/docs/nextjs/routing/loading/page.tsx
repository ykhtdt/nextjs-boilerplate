import { homeData } from "@/data/loading";

export default function Page() {
  // const res = await fetch(
  //   `${process.env.API_URL}/items`,
  //   {
  //     cache: 'no-cache',
  //   },
  // );

  // if (!res.ok) {
  //   throw new Error('....!!')
  // }

  // const test = await res.json();
  // console.log(test);

  const data = homeData.find((data) => data.key === "loading");

  return (
    <div>
      <h3 className="mt-4 mb-2 text-lg font-bold capitalize">Loading</h3>
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
