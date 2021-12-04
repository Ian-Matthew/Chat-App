import React from "react";
import { useExampleHook } from "./useExample";
export function Example() {
  const example = useExampleHook();
  return <div>{example}</div>;
}
