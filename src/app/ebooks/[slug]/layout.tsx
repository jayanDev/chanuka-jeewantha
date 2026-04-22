import { ReactNode } from "react";

export default function EbookSlugLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <style>{`#site-nav { display: none !important; }`}</style>
      {children}
    </>
  );
}
