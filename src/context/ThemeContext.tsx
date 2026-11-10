import type { ReactNode } from "react";

// The redesign ships a single theme ("monsoon", defined in index.css).
// The provider stays so App.tsx's tree is unchanged.
export function ThemeProvider({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
