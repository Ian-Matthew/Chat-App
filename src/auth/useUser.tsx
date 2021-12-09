import React from "react";
import { useLocalStorage } from "../lib/useLocalStorage";

type UserContext = {
  user: string;
  updateUser: (newUser: string) => void;
};

const UserContext = React.createContext<UserContext | undefined>(undefined);

export default function UserProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  // Since we're not using DB for user profiles/names -- cache the name in localStorage
  const [username, setUserName] = useLocalStorage("username", "");

  function updateUser(newUser: string) {
    setUserName(newUser);
  }

  return (
    <UserContext.Provider value={{ user: username, updateUser }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const value = React.useContext(UserContext);
  return value as UserContext;
}
