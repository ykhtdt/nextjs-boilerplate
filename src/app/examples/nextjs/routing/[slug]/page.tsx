"use client";

import { useParams } from "next/navigation";

export default function Page() {
  const params = useParams();

  return <div>{params.slug}</div>;
}
