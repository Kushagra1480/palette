import { ReactElement } from "react";
import Navbar from "./Navbar.tsx";

export function Header(): ReactElement {
  return (
    // Sticky header with gradient
    <div>
      <Navbar />
    </div>
  );
}
