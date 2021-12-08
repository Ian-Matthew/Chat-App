import React from "react";
export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-white bg-blend-lighten w-full h-full">
      <div className="mx-auto h-full min-h-screen items-center flex flex-col">
        {children}
      </div>
    </div>
  );
}
