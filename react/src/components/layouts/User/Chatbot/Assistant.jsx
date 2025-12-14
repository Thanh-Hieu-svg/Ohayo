import React from "react";
import IconAIChatbot from "../../../../assets/bee.gif";

export const Assistant = ({ onClick }) => {
  return (
    <div
      className="fixed bottom-10 right-10 z-50 cursor-pointer"
      onClick={onClick}
    >
      <div className="relative w-30 h-30 flex items-center justify-center  ">
        <span className="absolute inset-0 rounded-full bg-blue-400 opacity-20 animate-ping" />
        <span className="absolute inset-0 rounded-full bg-blue-400 opacity-10 animate-[ping_2s_linear_infinite]" />
        <div className=" rounded-full overflow-hidden  shake-animation">
          <img
            className="w-30 h-30 object-cover rounded-full"
            src={IconAIChatbot}
            alt="chatbox"
          />
        </div>
      </div>
    </div>
  );
};
