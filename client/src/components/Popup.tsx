import { useState } from "react";
// import { X } from "lucide-react"; // أيقونة الإغلاق (اختياري)

interface PopupProps {
  message: string;
  isDark: boolean;
}

export default function Popup({ message, isDark }: PopupProps) {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div
        className={` w-auto rounded-2xl p-6 shadow-xl relative transition-all duration-300
          ${isDark ? "bg-[rgba(98,65,65,0.9)] text-[#e5e7eb]" : "bg-[#ffffffe6] text-[#1f2937]"}
        `}
      >
        <button
          onClick={() => setIsVisible(false)}
          className="absolute top-3 right-3 text-sm font-semibold hover:scale-105 transition-transform"
        >
          <p>close</p>
        </button>
        <p className="text-lg font-medium">{message}</p>
      </div>
    </div>
  );
}
