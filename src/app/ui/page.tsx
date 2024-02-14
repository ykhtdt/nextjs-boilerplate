"use client"

import ResizableBox from "@/components/resizable-box";

export default function Page() {
  return (
    <div className="relative w-full h-screen">
      <ResizableBox maxConstraints={[500, 500]} top={200} left={500} className="inline-block border border-red-500">
        TEST
      </ResizableBox>
    </div>
  );
}
