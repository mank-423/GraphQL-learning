import { cn } from "../lib/aceternity";
import React from "react";

export function GridSmallBackground({ children }) {
  return (
    <div className="relative flex min-h-screen w-full items-start justify-center bg-black">
      
      {/* Grid */}
      <div
        className={cn(
          "absolute inset-0",
          "[background-size:20px_20px]",
          "[background-image:linear-gradient(to_right,#262626_1px,transparent_1px),linear-gradient(to_bottom,#262626_1px,transparent_1px)]"
        )}
      />

      {/* Dark mask (no light fade) */}
      <div className="pointer-events-none absolute inset-0 bg-black [mask-image:radial-gradient(ellipse_at_center,transparent_5%,black)]" />

      {/* App content */}
      <div className="relative z-20 w-full">
        {children}
      </div>
    </div>
  );
}
