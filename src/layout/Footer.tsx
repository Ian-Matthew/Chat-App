import classNames from "classnames";
import React from "react";
export default function Footer() {
  return (
    <footer className="mt-auto">
      <div className="w-screen bg-gray-50 border-t py-10">
        <div className="max-w-screen-md mx-auto px-4">
          <h2 className="text-lg font-horse font-semibold border-blue-700 border-b-1 pb-1 mb-2 inline-block">
            a serverless chat app{" "}
            <a className="inline" href="">
              <img className="inline w-5 h-5 ml-2" src="/github.png" alt="" />
            </a>
          </h2>
          <ul className="grid gap-2 sm:grid-cols-4 grid-cols-2 font-normal">
            <li className="flex space-x-2">
              <span>⚡</span>{" "}
              <span>
                Built in{" "}
                <a
                  className="text-black font-medium"
                  href="https://nextjs.org/"
                >
                  Next.JS
                </a>
              </span>
            </li>
            <li className="flex space-x-2">
              <span>🌐</span>{" "}
              <span>
                Hosted on{" "}
                <a
                  className="text-blue-500 font-medium"
                  href="https://vercel.com/home"
                >
                  Vercel
                </a>
              </span>
            </li>
            <li className="flex space-x-2 ">
              <span>⏱️</span>{" "}
              <span>
                Realtime by{" "}
                <a
                  className="text-indigo-500 font-medium"
                  href="https://pusher.com/"
                >
                  Pusher
                </a>
              </span>
            </li>
            <li className="flex space-x-2">
              <span>💾</span>{" "}
              <span>
                Data Persistance by{" "}
                <a
                  className="text-green-500 font-medium"
                  href="https://upstash.com/"
                >
                  Upstash
                </a>
              </span>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
