import type { NextPage } from "next";
import { Example } from "../src/example-feature/Example";
const Login: NextPage = () => {
  return (
    <section className="text-black max-w-screen-sm text-center">
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
        <div className="max-w-sm w-full space-y-5">
          <input
            placeholder="Starlight Glimmer"
            className="w-full rounded-md text-lg border-gray-300"
            type="text"
          />
          <button className="px-5 button-glow  font-medium py-3 bg-blue-800 text-white text-lg rounded-md w-full">
            Continue
          </button>
        </div>
      </div>
    </section>
  );
};

export default Login;
