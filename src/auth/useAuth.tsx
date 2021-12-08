import { Session } from "@supabase/supabase-js";
import { useRouter } from "next/router";
import React from "react";
import { supabase } from "../lib/supabase";
import { useAsync } from "../lib/useAsync";
const AuthContext = React.createContext(null);
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const value = useAuth();
  console.log(value);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

async function getUser(session: Session) {
  if (session?.user?.id) {
    const { data: userProfile } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", session.user.id);

    if (userProfile?.length) {
      return userProfile[0];
    }
  } else {
    return null;
  }
}

function useAuth() {
  const [session, setSession] = React.useState(supabase.auth.session());
  const [user, setUser] = React.useState<any>(null);
  const [loginEmailSent, setLoginEmailSent] = React.useState(false);
  const [key, setKey] = React.useState("");
  const [triedToAuth, setTriedToAuth] = React.useState(false);

  async function login(email: string) {
    await supabase.auth.signIn({ email: email });
    setLoginEmailSent(true);
  }

  React.useEffect(() => {
    supabase.auth.onAuthStateChange(async (_event, session) => {
      handleAuthChange(_event, session);
    });
  }, []);

  React.useEffect(() => {
    getUserFromSession(session);
  }, [session]);

  async function getUserFromSession(session) {
    if (session?.user?.id) {
      const { data: userProfile } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", session.user.id);

      if (!key) {
        try {
          const keydata = await fetch("/api/getEncryption");
          const eKey = await keydata.json();
          setKey(eKey.key);
        } catch (error) {}
      }
      // set user
      if (userProfile?.length) {
        setUser(userProfile[0]);
      }
    }
    setTriedToAuth(true);
  }

  async function handleAuthChange(event, session) {
    // Always set the auth cookie first
    debugger;
    await fetch("/api/auth", {
      method: "POST",
      headers: new Headers({ "Content-Type": "application/json" }),
      credentials: "same-origin",
      body: JSON.stringify({ event, session }),
    });

    // Then we can grab the user on sign in
    if (event === "SIGNED_IN") {
      // now that we set our cookie, we can securely request the encryption key as well
    } else {
      setUser(false);
      setSession(null);
    }

    setSession(session);
  }

  return {
    user,
    session,
    loginEmailSent,
    login,
    key,
    triedToAuth,
  };
}

export function useAuthContext() {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
