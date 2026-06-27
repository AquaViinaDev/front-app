import { ReactNode } from "react";
import "../globals.scss";

type RedirectLayoutProps = {
  children: ReactNode;
};

export default function RedirectLayout({ children }: RedirectLayoutProps) {
  return (
    <html lang="ro" suppressHydrationWarning>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
