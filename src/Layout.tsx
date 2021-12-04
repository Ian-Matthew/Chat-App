import React from "react";
import Link from "next/link";
export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-white bg-blend-lighten w-full h-full">
      <div className="mx-auto h-full min-h-screen items-center my-20 max-w-screen-lg flex flex-col">
        {children}
      </div>
    </div>
  );
}
