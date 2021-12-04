import React from "react";
import { useRouter } from "next/router";
export function useExampleHook() {
  const router = useRouter();
  const page = router.pathname;
  return `Example used on ${page === "/" ? "home page" : `page ${page}`}`;
}
