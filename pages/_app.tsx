import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Layout } from "../src/Layout";
import React from "react";
UserProvider;
import { SessionProvider } from "next-auth/react";
import UserProvider from "../src/auth/useUser";

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={session}>
      <UserProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </UserProvider>
    </SessionProvider>
  );
}

export default MyApp;
