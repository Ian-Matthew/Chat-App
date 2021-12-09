import React from "react";

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <main className="text-black mt-20  max-w-screen-sm text-center">
      <div className="text-4xl mb-0">🗨️🐴</div>
      <div className="text-4xl  font-bold mb-3 ">
        <span className="font-horse">
          Horse Chat<span className="!text-blue-700">.</span>
        </span>
      </div>
      {children}
    </main>
  );
}
