"use client";

import dynamic from "next/dynamic";

const LocalSelect = dynamic(() => import("./Local"), { ssr: false });

const Local = () => {
  return <LocalSelect />;
};
export { Local };
