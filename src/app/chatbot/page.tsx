"use client";

import { useEffect, useState } from "react";

export default function ChatbotPage() {
  const [msg, setMsg] = useState("");
  const [messages, setMessages] = useState<{ sender: string; text: string }[]>([]);

  useEffect(() => {
    // Carrega o script do n8n
    const script = document.createElement("script");
    script.src = "https://cdn.jsdelivr.net/npm/@n8n/chat/dist/chat.bundle.js";
    script.async = true;

    script.onload = () => {
      const chat = window.n8nChat.init({
        webhookUrl: "https://seu-workflow-url",
        theme: "light",
        showHeader: false,
      });

      // Expõe globalmente
      window.n8nChat = chat;

      // Listener para receber msgs do n8n
      window.n8nChat.onMessage?.((data: any) => {
        setMessages((prev) => [...prev, { sender: "bot", text: data.text }]);
      });
    };

    document.body.appendChild(script);
  }, []);

  function enviarMsg() {
    if (!msg.trim()) return;

    // Adiciona a mensagem do usuário na tela
    setMessages((prev) => [...prev, { sender: "user", text: msg }]);

    // Envia para o n8n
    window.n8nChat?.sendMessage(msg);

    setMsg("");
  }

  return (
    <div className="w-full h-screen bg-gray-100 flex flex-col items-center p-4">
      <h1 className="text-2xl font-bold text-purple-600 mb-4">Chat com o n8n</h1>

      {/* Área de mensagens */}
      <div className="w-full max-w-xl flex-1 bg-white shadow rounded-xl p-4 overflow-y-auto">
        {messages.map((m, index) => (
          <div
            key={index}
            className={`my-2 p-3 rounded-xl max-w-[80%] ${
              m.sender === "user"
                ? "bg-purple-500 text-white ml-auto"
                : "bg-gray-200 text-gray-800 mr-auto"
            }`}
          >
            {m.text}
          </div>
        ))}
      </div>

      {/* Caixa de envio */}
      <div className="w-full max-w-xl flex gap-2 mt-4">
        <input
          value={msg}
          onChange={(e) => setMsg(e.target.value)}
          className="flex-1 p-3 border border-gray-300 rounded-xl focus:outline-purple-500"
          placeholder="Digite sua mensagem..."
        />

        <button
          onClick={enviarMsg}
          className="bg-purple-600 text-white px-4 rounded-xl hover:bg-purple-700 transition"
        >
          Enviar
        </button>
      </div>
    </div>
  );
}
