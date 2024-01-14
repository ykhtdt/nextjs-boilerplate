"use client"

import { useCallback, useState } from "react";
import { Button } from "@/components/ui/button";

export function ClickCounter() {
  const [clicks, setClicks] = useState(0);

  const handleClick = useCallback(() => {
    setClicks((prev) => prev + 1);
  }, []);

  return (
    <Button
      variant="secondary"
      size="sm"
      onClick={handleClick}
      className="hover:bg-zinc-500 transition-colors px-3 py-0.5 text-sm capitalize rounded-lg font-light"
    >
      {clicks} Clicks
    </Button>
  )
}