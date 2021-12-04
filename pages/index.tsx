import type { NextPage } from "next";
import Link from "next/link";
const Home: NextPage = () => {
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
        <Link href="/login">
          <a className="px-5 button-glow  font-medium py-3 bg-blue-700 text-white text-lg rounded-lg">
            Start Chatting— it's free
          </a>
        </Link>

        <a className="underline text-lg text-blue-500 cursor-pointer">
          I'm not a horse...
        </a>
      </div>
    </section>
  );
};

export default Home;
