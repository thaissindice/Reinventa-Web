// src/components/ChatDrawer.tsx
"use client";
import React, { useEffect, useRef } from "react";

type Props = {
  open: boolean;
  onClose: () => void;
};

export default function ChatDrawer({ open, onClose }: Props) {
  const scrollerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    if (open) document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  useEffect(() => {
    // scroll to bottom when open or messages change
    if (open && scrollerRef.current) {
      scrollerRef.current.scrollTop = scrollerRef.current.scrollHeight;
    }
  }, [open]);

  if (!open) return null;

  return (
    <>
      {/* backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 z-40 bg-black/40"
        aria-hidden
      />

      {/* drawer centralizado na parte inferior */}
      <aside
        role="dialog"
        aria-modal="true"
        className="fixed left-1/2 transform -translate-x-1/2 bottom-6 z-50 w-full max-w-3xl"
      >
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          {/* header */}
          <div className="flex items-center justify-between px-4 py-3 border-b">
            <h3 className="text-lg font-medium">Chat</h3>
            <button
              type="button"
              onClick={onClose}
              className="px-3 py-1 rounded-md hover:bg-slate-100"
            >
              Fechar
            </button>
          </div>

          {/* área scrollável de mensagens */}
          <div
            ref={scrollerRef}
            className="max-h-[60vh] overflow-auto p-6 flex flex-col items-center gap-4"
          >
            {/* cada mensagem */}
            <div className="w-full max-w-2xl">
              <div className="mx-auto bg-slate-100 rounded-2xl p-4 text-slate-800">
                Olá! Que bom ter você aqui no Reinventa+! 😊 Como posso ajudar você hoje?
              </div>
            </div>

            <div className="w-full max-w-2xl">
              <div className="mx-auto self-end bg-indigo-600 text-white rounded-2xl p-4">
                Resposta do usuário (exemplo)
              </div>
            </div>

            {/* ...mensagens dinâmicas aqui */}
          </div>

          {/* input */}
          <div className="px-4 py-4 border-t">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                // lógica de envio aqui
              }}
              className="max-w-2xl w-full mx-auto flex gap-3 items-end"
            >
              <textarea
                className="flex-1 p-3 rounded-xl border resize-none h-20"
                placeholder="Digite sua mensagem..."
              />
              <button
                type="submit"
                className="bg-indigo-600 text-white px-4 py-2 rounded-xl"
              >
                Enviar
              </button>
            </form>
          </div>
        </div>
      </aside>
    </>
  );
}
