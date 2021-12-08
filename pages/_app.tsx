import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Layout } from "../src/Layout";
import React from "react";
import UserProvider from "../src/auth/useUser";
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <UserProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </UserProvider>
  );
}

export default MyApp;
