import type { NextPage } from "next";
import React from "react";
import { Example } from "../src/example-feature/Example";
import { useRouter } from "next/router";
const Login: NextPage = () => {
  const [username, setUsername] = React.useState();
  const router = useRouter();
  return (
    <section className="text-black mt-20  max-w-screen-sm text-center">
      <div className="text-4xl mb-0">🗨️🐴</div>
      <div className="text-4xl  font-bold mb-3 ">
        <span className="font-horse">
          Horse Chat<span className="!text-blue-700">.</span>
        </span>
      </div>
      <div className="flex flex-col items-center justify-center space-y-5">
        <h1 className="text-5xl font-sans font-bold tracking-tighter ">
          First, enter your name.
        </h1>
        <p className="font-sans text-lg text-gray-700 font-normal">
          We suggest using your{" "}
          <strong className="font-medium text-gray-800">horse name.</strong>
        </p>
        <form
          onSubmit={(e) => {
            console.log(e);
            e.preventDefault();
            router.push(`/chat?username=${username}`);
          }}
          className="max-w-sm w-full space-y-5"
        >
          <input
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
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

export default Login;
