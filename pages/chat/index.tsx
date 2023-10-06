import ChatPage from "@/components/ChatPage";
import ChatBox from "@/components/ChatPage/ChatBox";
import ChatList from "@/components/ChatPage/ChatList";
import SignInProtector from "@/components/RouteProtectors/SignInProtector";
import React, { useEffect, useState } from "react";

const Chat = () => {
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    setShouldRender(true);
  }, []);

  return shouldRender ? (
    <ChatPage />
  ): null
};

// export const ChatPageLayout = (page: any) => <ChatList>{page}</ChatList>

// Chat.getLayout = ChatPageLayout;

export default SignInProtector(Chat);
