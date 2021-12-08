import type { NextPage } from "next";
import React from "react";
import { useAuthContext } from "../src/auth/useAuth";
import { useRouter } from "next/router";
const Login: NextPage = () => {
  const { loginEmailSent, login } = useAuthContext();
  const [email, setEmail] = React.useState();
  return (
    // TODO: Move to App Shell
    <section className="text-black mt-20  max-w-screen-sm text-center">
      <div className="text-4xl mb-0">🗨️🐴</div>
      <div className="text-4xl  font-bold mb-3 ">
        <span className="font-horse">
          Horse Chat<span className="!text-blue-700">.</span>
        </span>
      </div>
      <div className="flex flex-col items-center justify-center space-y-5">
        <h1 className="text-5xl font-sans font-bold tracking-tighter ">
          {loginEmailSent
            ? "Check your email for a login link!"
            : "First, enter your email address."}
        </h1>
        <p className="font-sans text-lg text-gray-700 font-normal">
          We suggest using your{" "}
          <strong className="font-medium text-gray-800">
            horse email address.
          </strong>
        </p>
        <form
          onSubmit={async (e) => {
            console.log(e);
            e.preventDefault();
            login(email);
          }}
          className="max-w-sm w-full space-y-5"
        >
          <input
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Starlight Glimmer"
            className="w-full rounded-md text-lg border-gray-300"
            type="text"
          />
          <button className="px-5 button-glow  font-medium py-3 bg-blue-800 text-white text-lg rounded-md w-full">
            {loginEmailSent ? "Send Login Email Again" : "Continue"}
          </button>
        </form>
      </div>
    </section>
  );
};

Login.AuthGuard = WithoutSession;

function WithoutSession({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { session } = useAuthContext();

  if (session) router.push("/chat/profile");

  return <>{children}</>;
}
export default Login;
