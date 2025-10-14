"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

import styles from "./Local.module.scss";

const Local = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  const currentLocale = pathname.split("/")[1];
  const nextLocale = currentLocale === "ru" ? "ro" : "ru";

  const handleToggle = () => {
    const basePath = pathname.replace(/^\/[a-z]{2}/, `/${nextLocale}`);
    const query = searchParams.toString();
    router.push(query ? `${basePath}?${query}` : basePath);
  };

  return (
    <button className={styles.root} onClick={handleToggle}>
      {currentLocale.toUpperCase()}
    </button>
  );
};

export default Local;
