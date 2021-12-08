import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Layout } from "../src/Layout";
import { AuthProvider } from "../src/auth/useAuth";
import React from "react";
function MyApp({ Component, pageProps }: AppProps) {
  const AuthGuard = Component.AuthGuard || React.Fragment;
  return (
    <AuthProvider>
      <AuthGuard>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </AuthGuard>
    </AuthProvider>
  );
}

export default MyApp;
