import React from "react";
import IconAIChatbot from "../../../../assets/images/iconAIChatbot.gif";

export const Assistant = ({ onClick }) => {
  return (
    <div
      className="fixed bottom-10 right-10 z-50 cursor-pointer"
      onClick={onClick}
    >
      <div className="relative w-20 h-20 flex items-center justify-center">
        <span className="absolute inset-0 rounded-full bg-blue-400 opacity-20 animate-ping" />
        <span className="absolute inset-0 rounded-full bg-blue-400 opacity-10 animate-[ping_2s_linear_infinite]" />
        <div className="border border-blue-400 rounded-full overflow-hidden shadow-lg shake-animation">
          <img
            className="w-20 h-20 object-cover rounded-full"
            src={IconAIChatbot}
            alt="chatbox"
          />
        </div>
      </div>
    </div>
  );
};
