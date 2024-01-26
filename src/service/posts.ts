import { readFile } from "fs/promises";
import path from "path";
import { cache } from "react";

export type Post = {
  title: string;
  description: string;
  href: string;
};

export const getNestedPageContent = cache(async (page: string) => {
  const filePath = path.join(process.cwd(), "data", "nextjs", `${page}.json`);

  return readFile(filePath, "utf-8").then<Post[]>(JSON.parse);
});
