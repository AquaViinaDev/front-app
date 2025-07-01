"use client";

import dynamic from "next/dynamic";

const LocalSelect = dynamic(() => import("./Local"), { ssr: false });

export default function Local() {
  return <LocalSelect />;
}
