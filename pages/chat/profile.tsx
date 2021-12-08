import type { NextPage } from "next";
import React from "react";
import router, { useRouter } from "next/router";
import { useAuthContext } from "../../src/auth/useAuth";
import { supabase } from "../../src/lib/supabase";
const Profile: NextPage = () => {
  const router = useRouter();
  const { user } = useAuthContext();

  console.log("in p", user);

  // Store new user name inputValue
  const [newUserName, setNewUserName] = React.useState(user?.username);

  // Method to update user name
  async function updateUserName(username: string) {
    await supabase
      .from("profiles")
      .update({ username })
      .match({ id: user?.id });

    // After updating user name, redirect to main chat
    router.push("/chat/horses");
  }
  return (
    // TODO: Abstract AppShell Layout
    <section className="text-black mt-20  max-w-screen-sm text-center">
      <div className="text-4xl mb-0">🗨️🐴</div>
      <div className="text-4xl  font-bold mb-3 ">
        <span className="font-horse">
          Horse Chat<span className="!text-blue-700">.</span>
        </span>
      </div>
      <div className="flex flex-col items-center justify-center space-y-5">
        <h1 className="text-5xl font-sans font-bold tracking-tighter ">
          {/* When we dont have a username, we force the user to give us one */}
          {user && !user.username
            ? "Nice, you're logged in! Now you just need a username to start chatting with all those horses!"
            : `Welcome back ${user?.username}. If you want to change your username, just type it below.`}
        </h1>
        <p className="font-sans text-lg text-gray-700 font-normal">
          We suggest using your{" "}
          <strong className="font-medium text-gray-800">horse name</strong>
        </p>
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            updateUserName(newUserName);
          }}
          className="max-w-sm w-full space-y-5"
        >
          <input
            required
            value={newUserName}
            onChange={(e) => setNewUserName(e.target.value)}
            placeholder="Starlight Glimmer"
            className="w-full rounded-md text-lg border-gray-300"
            type="text"
          />
          <button className="px-5 button-glow  font-medium py-3 bg-blue-800 text-white text-lg rounded-md w-full">
            Continue
          </button>
        </form>
      </div>
    </section>
  );
};

Profile.AuthGuard = WithUser;

export function WithUser({ children }: { children: React.ReactNode }) {
  const { user } = useAuthContext();
  if (!user) {
    return null;
  }
  return <>{children}</>;
}

export default Profile;
