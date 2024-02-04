import { readFile } from "fs/promises";
import path from "path";
import { cache } from "react";

export type NestedPagePost = {
  title: string;
  description: string;
  href: string;
};

export type PagePost = {
  title: string;
  key: string;
  description: string[];
};

export const getNestedPageContent = cache(async (page: string) => {
  const filePath = path.join(process.cwd(), "data", "nextjs", `${page}.json`);

  return readFile(filePath, "utf-8").then<NestedPagePost[]>(JSON.parse);
});

export const getPageContent = cache(async (page: string) => {
  const filePath = path.join(process.cwd(), "data", "nextjs", `${page}.json`);

  return readFile(filePath, "utf-8").then<PagePost>(JSON.parse);
});
