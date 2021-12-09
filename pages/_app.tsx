import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Layout } from "../src/layout/Layout";
import React from "react";
import { SessionProvider } from "next-auth/react";
import UserProvider from "../src/auth/useUser";

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    // Session Provider gives us the next/auth session
    <SessionProvider session={session}>
      {/* User Provider gives us the username stored in local storage AND the encryption key */}
      {/* Ideally I should find a way to merge those values into one context, but for now this works */}
      <UserProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </UserProvider>
    </SessionProvider>
  );
}

export default MyApp;
