"use client";
import { useEffect } from "react";

export default function ChatbotPage() {
  useEffect(() => {
    const script = document.createElement("script");
    script.type = "module";
    script.innerHTML = `
      import { createChat } from 'https://cdn.jsdelivr.net/npm/@n8n/chat/dist/chat.bundle.es.js';

      createChat({
        webhookUrl: 'https://automate.xlab.app.br/webhook/514758d6-6e56-439e-ac00-edac0c530cb0/chat',
        target: '#n8n-chat',
        defaultLanguage: 'pt-BR',
        loadPreviousSession: false,

        initialMessages: [
          'Oi, eu sou o TYzito! 😊\\n\\nEnvie uma mensagem para começar!'
        ],

        i18n: {
          "pt-BR": {
            title: "",
            subtitle: "",
            footer: "",
            getStarted: "",
            inputPlaceholder: "Digite sua mensagem..."
          }
        }
      });
    `;
    document.body.appendChild(script);

    const style = document.createElement("style");
    style.innerHTML = `
      /* remove ícone flutuante */
      #n8n-chat .chat-window-toggle { display: none !important; }

      /* força o widget a aparecer */
      #n8n-chat .chat-window-wrapper {
        display: block !important;
        opacity: 1 !important;
        visibility: visible !important;
        width: 100% !important;
        height: 100% !important;
        position: relative !important;
      }

      /* ESTA É A LINHA QUE FAZ APARECER */
      #n8n-chat .chat-window {
        display: block !important;
        opacity: 1 !important;
        visibility: visible !important;
        height: 100% !important;
        width: 100% !important;
        border-radius: 0 !important;
        box-shadow: none !important;
      }

      #n8n-chat {
        width: 100% !important;
        height: 100vh !important;
      }

      #n8n-chat .chat-messages {
        height: calc(100% - 80px) !important;
        background: #f8fafc !important;
        padding: 20px !important;
        overflow-y: auto !important;
      }

      #n8n-chat .chat-inputs {
        border-top: 1px solid #ddd !important;
        padding: 12px !important;
        background: #fff !important;
      }

      #n8n-chat textarea {
        background: #f3f4f6 !important;
        border-radius: 8px !important;
        padding: 12px !important;
      }
/* Mensagens da AI (lado esquerdo) */
#n8n-chat .chat-message-from-bot {
  background: #f1f0f5 !important;
  color: #111 !important;
  border-radius: 18px 18px 18px 4px !important; /* bolha esquerda */
  padding: 14px 18px !important;
  max-width: 75% !important;
  margin-bottom: 14px !important;
  box-shadow: 0 1px 3px rgba(0,0,0,0.12) !important;
}

/* Mensagem do usuário (lado direito) */
#n8n-chat .chat-message-from-user:not(.chat-message-transparent) {
  background: #0a84ff !important; /* azul iMessage */
  color: white !important;
  border-radius: 18px 18px 4px 18px !important; /* bolha direita */
  padding: 14px 18px !important;
  max-width: 75% !important;
  margin-left: auto !important;
  margin-bottom: 14px !important;
  box-shadow: 0 1px 3px rgba(0,0,0,0.18) !important;
}

    `;
    document.head.appendChild(style);

    return () => {
      if (document.body.contains(script)) document.body.removeChild(script);
      if (document.head.contains(style)) document.head.removeChild(style);
    };
  }, []);

  return (
    <div className="w-full h-screen">
      <div id="n8n-chat" className="w-full h-full" />
    </div>
  );
}
