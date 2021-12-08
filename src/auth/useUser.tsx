import React from "react";
import { useLocalStorage } from "../lib/useLocalStorage";
const UserContext = React.createContext<{
  user: null | string;
  updateUser: (user: string | null) => void;
  key: string | null;
} | null>(null);

export default function UserProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useLocalStorage("user", null);
  const [key, setKey] = useLocalStorage("key", null);

  function updateUser(newUser) {
    setUser(newUser);
  }

  async function getKey() {
    const keydata = await fetch("/api/getEncryption");
    const eKey = await keydata.json();
    setKey(eKey.key);
  }

  React.useEffect(() => {
    if (user) getKey();
  }, [user]);

  return (
    <UserContext.Provider value={{ user, updateUser, key }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const value = React.useContext(UserContext);
  return value;
}
