import { Header } from "./Header.tsx";
import { Footer } from "./Footer.tsx";
import { ReactNode } from "react";

export function MainPageTemplate({
  children = <div>Give me content!</div>,
}: {
  children?: ReactNode;
}) {
  return (
    <div className="h-screen flex flex-col font-sans">
      <Header />
      <main
        className={
          "flex-grow overflow-auto scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-800"
        }
      >
        {children}
      </main>
    </div>
  );
}
