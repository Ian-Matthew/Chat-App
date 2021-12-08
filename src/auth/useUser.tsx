import React from "react";
import { useLocalStorage } from "../lib/useLocalStorage";
import { useSession } from "next-auth/react";

type UserContext = {
  user: string;
  updateUser: (newUser: string) => void;
  key: string;
};

const UserContext = React.createContext<UserContext | undefined>(undefined);

export default function UserProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  // The next auth session will help us determine if we can grab the encryption key or not
  const session = useSession();
  // Since we're not using DB for user profiles/names -- cache the name in localStorage
  const [username, setUserName] = useLocalStorage("username", "");
  const [key, setKey] = React.useState("");

  function updateUser(newUser: string) {
    setUserName(newUser);
  }

  // Get's the encryption key for an authed user
  async function getKey() {
    const keydata = await fetch("/api/getEncryption");
    const eKey = await keydata.json();
    setKey(eKey.key);
  }

  // If we are authenticated -- get dat key
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
  return value as UserContext;
}
