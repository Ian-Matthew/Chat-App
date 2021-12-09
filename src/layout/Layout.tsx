import React from "react";
import { useRouter } from "next/router";
import Footer from "./Footer";
export function Layout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  console.log(router);
  return (
    <div className="bg-white bg-blend-lighten w-full h-full">
      <div className="mx-auto h-full min-h-screen items-center flex flex-col">
        {children}
        {router.pathname !== "/chat/[channelName]" && <Footer />}
      </div>
    </div>
  );
}
