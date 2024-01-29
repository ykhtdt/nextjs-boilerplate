import { getNestedPageContent } from "@/service/posts";

import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

export default async function Page() {
  const posts = await getNestedPageContent("routing");

  return (
    <div>
      <div className="space-y-2">
        <h1 className="text-4xl font-bold tracking-tight">Routing</h1>
        <p className="text-zinc-300">This page covers Next.js routing, based on the App Router introduced starting from Next.js 13.</p>
      </div>
      <div className="pt-8 space-y-6">
        <h2 className="pb-2 mt-12 text-2xl font-semibold tracking-tight border-b">Next Steps</h2>
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          {posts.map((post) => (
            <Card key={post.title}>
              <CardHeader>
                <CardTitle>{post.title}</CardTitle>
                <CardDescription>{post.description}</CardDescription>
              </CardHeader>
              <CardFooter className="flex flex-col items-end">
                <Button className="p-0">
                  <Link href={post.href} className="px-4 py-2">
                    Go
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
