import type { NextPage } from "next";
import { useUser } from "../src/auth/useUser";
import { signIn, signOut } from "next-auth/react";

const Home: NextPage = () => {
  const { updateUser } = useUser();
  return (
    <section className="text-black font-sans  mt-20 max-w-screen-lg">
      <div className="text-7xl -mb-9 ">🗨️🐴</div>
      <h1 className="text-8xl mb-3 font-bold ">
        <span className="text-3xl font-light">Welcome to</span>
        <br />
        <span className="font-horse">
          Horse Chat<span className="!text-blue-700">.</span>
        </span>
      </h1>
      <p className="text-gray-700 font-normal max-w-screen-sm text-2xl">
        Horse Chat is the only messaging app built exclusively{" "}
        <strong>for</strong> and <strong>by</strong> horses. We enable horses to
        do what they do best: talk amongst themselves, respectfully, on the
        internet.
      </p>
      <div className="space-x-10 mt-10">
        <button
          className="!cursor-pointer px-5 button-glow  font-medium py-3 bg-blue-700 text-white text-lg rounded-lg"
          onClick={() => signIn("github", { callbackUrl: "/chat/profile" })}
        >
          Start Chatting— it&#39;s free!
        </button>

        <button
          className=" underline text-lg text-blue-500 cursor-pointer"
          onClick={async () => {
            updateUser("");
            await signOut({ callbackUrl: "/chat/horses" });
          }}
        >
          I&#39;m not a horse...
        </button>
      </div>
    </section>
  );
};

export default Home;
