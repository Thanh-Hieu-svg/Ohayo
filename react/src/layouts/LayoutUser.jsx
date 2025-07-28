import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import { Header } from "../components/layouts/User/Header";
import { Footer } from "../components/layouts/User/Footer";
import { Assistant } from "../components/layouts/User/Chatbot/Assistant";
import { ChatBot } from "../components/layouts/User/Chatbot/Chatbot";

export const LayoutUser = () => {
  const [openChat, setOpenChat] = useState(false);

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
      {!openChat && <Assistant onClick={() => setOpenChat(true)} />}
      {openChat && (
        <div className="fixed bottom-24 right-10 z-50">
          <ChatBot onClose={() => setOpenChat(false)} />
        </div>
      )}
    </div>
  );
};
