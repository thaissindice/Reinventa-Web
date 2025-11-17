"use client";
import { useRouter } from "next/navigation";

export default function FloatingButton() {
  const router = useRouter();

  return (
    <button
      onClick={() => router.push("/chatbot")}
      className="
        fixed bottom-6 right-6
        w-16 h-16
        bg-[#8696e8]
        rounded-full
        shadow-lg
        hover:scale-105
        transition
        flex items-center justify-center
      "
    >
      <img
        src="https://cdn3.iconfinder.com/data/icons/social-1/100/robo.to-256.png"
        alt="icon"
        className="w-10 h-10"
      />
    </button>
  );
}
