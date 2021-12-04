import type { NextPage } from "next";
import { ChevronDownIcon } from "@heroicons/react/outline";
const Chat: NextPage = () => {
  return (
    <div className="w-full h-screen flex flex-col">
      <div className="flex flex-col w-full items-center justify-center mt-4">
        <div className="text-4xl mb-0">🗨️🐴</div>
        <div className="text-4xl  font-bold mb-3 ">
          <span className="font-horse">
            Horse Chat<span className="!text-blue-700">.</span>
          </span>
        </div>
        <div className="flex w-full max-w-screen-sm flex-row items-baseline justify-between border-b pb-3">
          <div className="flex flex-row items-baseline">
            <button className="text-3xl px-4 py-2 bg-white hover:bg-gray-50 font-bold flex items-baseline">
              {" "}
              <span># horses</span>
              <ChevronDownIcon className="h-4 w-4 ml-1" />
            </button>
            <p className="ml-3">A Place for horses to be horses</p>
          </div>
          <div className="flex flex-row items-center">
            <span>
              <strong>5</strong> horses online
            </span>
          </div>
        </div>
      </div>
      <main className="mb-auto  flex-1 font-sans overflow-y-auto">
        <div className="max-w-screen-sm mx-auto w-full my-10 space-y-5">
          <div className="flex items-end justify-end">
            <div className="flex flex-col space-y-1 text-sm font-medium max-w-xs mx-2 order-1 items-end">
              <div>Greg</div>
              <div>
                <span className="px-4 py-2 rounded-lg inline-block border border-black rounded-br-none">
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit. Modi
                  esse expedita, iste quam quasi delectus perferendis? Expedita
                  eligendi, harum dignissimos optio ea nostrum, esse tenetur
                  beatae quibusdam corrupti laboriosam a!
                </span>
              </div>
            </div>
            <img
              src="/horse-head.svg"
              alt="My profile"
              className="w-6 h-6 rounded-full order-2"
            />
          </div>
          <div className="flex items-end">
            <div className="flex flex-col space-y-1 text-sm font-medium max-w-xs mx-2 order-2 items-start">
              <div>Greg</div>
              <div>
                <span className="px-4 py-2 rounded-lg inline-block border border-black rounded-bl-none">
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit. Modi
                  esse expedita, iste quam quasi delectus perferendis? Expedita
                  eligendi, harum dignissimos optio ea nostrum, esse tenetur
                  beatae quibusdam corrupti laboriosam a!
                </span>
              </div>
            </div>
            <img
              src="/horse-head.svg"
              alt="My profile"
              className="w-6 h-6 rounded-full order-1"
            />
          </div>
          <div className="flex items-end justify-end">
            <div className="flex flex-col space-y-1 text-sm font-medium max-w-xs mx-2 order-1 items-end">
              <div>Greg</div>
              <div>
                <span className="px-4 py-2 rounded-lg inline-block border border-black rounded-br-none">
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit. Modi
                  esse expedita, iste quam quasi delectus perferendis? Expedita
                  eligendi, harum dignissimos optio ea nostrum, esse tenetur
                  beatae quibusdam corrupti laboriosam a!
                </span>
              </div>
            </div>
            <img
              src="/horse-head.svg"
              alt="My profile"
              className="w-6 h-6 rounded-full order-2"
            />
          </div>
          <div className="flex items-end">
            <div className="flex flex-col space-y-1 text-sm font-medium max-w-xs mx-2 order-2 items-start">
              <div>Greg</div>
              <div>
                <span className="px-4 py-2 rounded-lg inline-block border border-black rounded-bl-none">
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit. Modi
                  esse expedita, iste quam quasi delectus perferendis? Expedita
                  eligendi, harum dignissimos optio ea nostrum, esse tenetur
                  beatae quibusdam corrupti laboriosam a!
                </span>
              </div>
            </div>
            <img
              src="/horse-head.svg"
              alt="My profile"
              className="w-6 h-6 rounded-full order-1"
            />
          </div>
          <div className="flex items-end justify-end">
            <div className="flex flex-col space-y-1 text-sm font-medium max-w-xs mx-2 order-1 items-end">
              <div>Greg</div>
              <div>
                <span className="px-4 py-2 rounded-lg inline-block border border-black rounded-br-none">
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit. Modi
                  esse expedita, iste quam quasi delectus perferendis? Expedita
                  eligendi, harum dignissimos optio ea nostrum, esse tenetur
                  beatae quibusdam corrupti laboriosam a!
                </span>
              </div>
            </div>
            <img
              src="/horse-head.svg"
              alt="My profile"
              className="w-6 h-6 rounded-full order-2"
            />
          </div>
          <div className="flex items-end">
            <div className="flex flex-col space-y-1 text-sm font-medium max-w-xs mx-2 order-2 items-start">
              <div>Greg</div>
              <div>
                <span className="px-4 py-2 rounded-lg inline-block border border-black rounded-bl-none">
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit. Modi
                  esse expedita, iste quam quasi delectus perferendis? Expedita
                  eligendi, harum dignissimos optio ea nostrum, esse tenetur
                  beatae quibusdam corrupti laboriosam a!
                </span>
              </div>
            </div>
            <img
              src="/horse-head.svg"
              alt="My profile"
              className="w-6 h-6 rounded-full order-1"
            />
          </div>
        </div>
      </main>
      <div className="h-16 ">
        <div className="max-w-screen-sm mx-auto flex flex-col border-[1px] border-black">
          <input className="w-full border-0" type="text" />
        </div>
      </div>
      {/* <div
        style={{ gridTemplateColumns: "16rem 2fr" }}
        className="flex-grow grid"
      >

      </div> */}
    </div>
  );
};

export default Chat;
