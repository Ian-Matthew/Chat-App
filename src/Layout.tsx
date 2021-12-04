import React from "react";
import Link from "next/link";
export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <header className="text-2xl py-4 flex flex-row  max-w-screen-lg mx-auto justify-between">
        <Link href="/">
          <a className="text-2xl font-semibold">App</a>
        </Link>
      </header>
      <div className="mx-auto h-full min-h-screen items-center my-20 font-display max-w-screen-lg flex flex-col">
        {children}
      </div>
    </>
  );
}
