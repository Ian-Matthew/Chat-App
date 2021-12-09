import React from "react";
import { useSession } from "next-auth/react";
import { useLocalStorage } from "../../src/lib/useLocalStorage";
import { useRouter } from "next/router";
import { AppShell } from "../../src/layout/AppShell";
function Profile() {
  const [username, setUserName] = useLocalStorage("username", "");
  const userNameInputRef = React.useRef<HTMLInputElement | null>(null);
  const router = useRouter();

  // Prevent the page from showing while we are trying to figure out auth status

  return (
    <AppShell>
      <div className="flex flex-col items-center justify-center space-y-5">
        <h1 className="text-5xl font-sans font-bold tracking-tighter ">
          {"First, enter your username"}
        </h1>

        <p className="font-sans text-lg text-gray-700 font-normal">
          We suggest using your{" "}
          <strong className="font-medium text-gray-800">horse name.</strong>
        </p>
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            setUserName(userNameInputRef?.current?.value as string);
            router.push("/chat/horses");
          }}
          className="max-w-sm w-full space-y-5"
        >
          <input
            name="username"
            ref={userNameInputRef}
            required
            defaultValue={username}
            placeholder="Starlight Glimmer"
            className="w-full rounded-md text-lg border-gray-300"
            type="text"
          />
          <button className="px-5 button-glow  font-medium py-3 bg-blue-800 text-white text-lg rounded-md w-full">
            Continue
          </button>
        </form>
      </div>
    </AppShell>
  );
}

export default Profile;
