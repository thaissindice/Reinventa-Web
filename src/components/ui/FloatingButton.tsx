// src/components/FloatingButton.tsx
"use client";
import { useState } from "react";
import dynamic from "next/dynamic";

const ChatDrawer = dynamic(() => import("./ChatDrawer"), { ssr: false });

export default function FloatingButton() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        aria-label="Abrir chat"
        onClick={() => setOpen(true)}
        className="fixed right-6 bottom-6 z-50 w-14 h-14 rounded-full bg-gradient-to-br from-indigo-600 to-violet-500 text-white shadow-lg flex items-center justify-center hover:scale-105 transform transition"
      >
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden>
          <circle cx="12" cy="8" r="2.2" fill="white" />
          <rect x="4" y="6" width="16" height="10" rx="2" fill="white" opacity="0.08"></rect>
          <path d="M9 18c0 .6.9 1 1.5 1h3c.6 0 1.5-.4 1.5-1" stroke="white" strokeWidth="1" strokeLinecap="round"></path>
        </svg>
      </button>

      <ChatDrawer open={open} onClose={() => setOpen(false)} />
    </>
  );
}
