"use client";

import { useEffect, useState } from "react";
import { getSocket } from "../lib/socket";

import { ThemeToggler } from "@/components/ThemeToggler";

export default function Home() {
  const [messages, setMessages] = useState<string[]>([]);

  useEffect(() => {
    const socket = getSocket();

    socket.on("receiveMessage", (msg: string) => {
      setMessages((prev) => [...prev, msg]);
    });

    return () => {
      socket.off("receiveMessage");
    };
  }, []);

  const send = (msg: string) => {
    const socket = getSocket();
    socket.emit("sendMessage", msg);
  };

  return (
    <div className="m-8">
      {messages.map((m, i) => <div key={i}>{m}</div>)}
      <button onClick={() => send(`Hi I'm here`)}>Hello WebSocket</button>
      <hr/>
      <ThemeToggler />
    </div>
  );
}
