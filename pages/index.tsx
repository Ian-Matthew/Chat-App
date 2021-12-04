import type { NextPage } from "next";
import { Example } from "../src/example-feature/Example";
const Home: NextPage = () => {
  return (
    <section className="text-white">
      <div className="text-7xl leading-[0]">🐴</div>
      <h1 className="text-8xl mb-5 font-bold leading-[6rem]">
        <span className="text-3xl font-light">Welcome to</span>
        <br />
        Horse Chat
      </h1>
      <p className="text-gray-200 font-normal max-w-screen-sm text-2xl">
        Horse Chat is the only messaging app built exclusively{" "}
        <strong>for</strong> and <strong>by</strong> horses. We enable horses to
        do what they do best: talk amongst themselves, respectfully, on the
        internet.
      </p>
      <div className="space-x-10 mt-10">
        <button className="px-10 h-11 button-glow bg-black  text-lg rounded-md">
          {" "}
          Start Chatting
        </button>
        <a className=" px-10 h-11 text-lg rounded-md shadow-md">
          I'm not a horse...
        </a>
      </div>
    </section>
  );
};

export default Home;
