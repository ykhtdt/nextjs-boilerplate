import ky from "ky";

export default async function Page() {
  const res = await ky.get(`${process.env.API_URL}/sub`);

  if (!res.ok) {
    throw new Error("Something went wrong. Please try again.");
  }

  const { title, description }: { title: string; description: string[] } = await res.json();

  return (
    <div>
      <h3 className="mt-4 mb-2 text-lg font-bold capitalize">{title}</h3>
      <ul className="pl-6 text-sm list-disc">
        {description.map((description, i) => (
          <li className="pl-1 my-2" key={`description-${i}`}>
            {description}
          </li>
        ))}
      </ul>
    </div>
  );
}
