"use client";

export default function ExamplesPage() {
  return (
    <div>
      <div className="space-y-2">
        <h1 className="text-4xl font-bold tracking-tight">Introduction</h1>
        <p className="text-zinc-300">
          To establish a front-end development boilerplate, the goal is to acquire additional essential knowledge and enhance proficiency
          through practical examples.
        </p>
      </div>
      <div className="pt-8">
        <h2 className="pb-2 mt-12 text-2xl font-semibold tracking-tight border-b">Base Features</h2>
        <ul className="my-6 ml-6 list-disc text-zinc-300">
          <li className="mt-2">React</li>
          <li className="mt-2">Next.js</li>
          <li className="mt-2">Typescript</li>
          <li className="mt-2">Tailwindcss</li>
          <li className="mt-2">shadcn/ui</li>
        </ul>
      </div>
    </div>
  );
}
