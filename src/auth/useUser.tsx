import React from "react";
import { useLocalStorage } from "../lib/useLocalStorage";
import { useSession, SessionContextValue } from "next-auth/react";
const UserContext = React.createContext<{
  user: any;
  updateUser: (user: string | null) => void;
  key: string | null;
} | null>(null);

export default function UserProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = useSession();
  const [username, setUserName] = useLocalStorage("username", "");
  const [key, setKey] = React.useState("");

  function updateUser(newUser) {
    setUserName(newUser);
  }

  async function getKey() {
    const keydata = await fetch("/api/getEncryption");
    const eKey = await keydata.json();
    setKey(eKey.key);
  }

  React.useEffect(() => {
    if (session.status === "authenticated") getKey();
  }, [session.status]);

  return (
    <UserContext.Provider value={{ user: username, updateUser, key }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const value = React.useContext(UserContext);
  return value;
}
