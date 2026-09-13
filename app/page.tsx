"use client";

import { useRef, useState } from "react";

type Model = "Gemini 2.0" | "Claude 4";
type Device = "desktop" | "tablet" | "mobile";

type Msg = { id: number; role: "user" | "ai"; text: string };

const MODELS: Model[] = ["Gemini 2.0", "Claude 4"];

const DEVICE_WIDTHS: Record<Device, string> = {
  desktop: "w-full max-w-6xl",
  tablet: "w-full max-w-2xl",
  mobile: "w-full max-w-[380px]",
};

export default function Page() {
  const [messages, setMessages] = useState<Msg[]>([
    {
      id: 0,
      role: "ai",
      text: "👋 أهلاً! أنا ابنيلي. اوصفلي الموقع اللي نفسك فيه وانا هبنيهولك حالاً.",
    },
  ]);
  const [prompt, setPrompt] = useState("");
  const [model, setModel] = useState<Model>("Gemini 2.0");
  const [device, setDevice] = useState<Device>("desktop");
  const [building, setBuilding] = useState(false);
  const [published, setPublished] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  function scrollToBottom() {
    requestAnimationFrame(() => {
      scrollRef.current?.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: "smooth",
      });
    });
  }

  function handleBuild() {
    const text = prompt.trim();
    if (!text || building) return;
    setPrompt("");
    setBuilding(true);
    setMessages((m) => [...m, { id: Date.now(), role: "user", text }]);
    scrollToBottom();
    // TODO: replace with real API call to /api/generate
    setTimeout(() => {
      setMessages((m) => [
        ...m,
        {
          id: Date.now(),
          role: "ai",
          text: `جامد! 🚀 بدأت أبني "${text}" باستخدام ${model}. بص على المعاينة على الشمال، ولو عايز تعديل قولّي.`,
        },
      ]);
      setBuilding(false);
      scrollToBottom();
    }, 1200);
  }

  function handleRefresh() {
    setBuilding(true);
    setTimeout(() => setBuilding(false), 600);
  }

  function handlePublish() {
    setPublished(true);
    setTimeout(() => setPublished(false), 2500);
  }

  return (
    <div className="h-screen w-screen bg-[#0a0a0a] text-white flex overflow-hidden" dir="rtl">
      {/* RIGHT - COMMAND / CHAT PANEL (RTL) */}
      <div className="w-[420px] min-w-[340px] bg-[#111111] border-l border-[#1f1f1f] flex flex-col">
        {/* Header */}
        <div className="h-16 px-5 flex items-center justify-between border-b border-[#1f1f1f] shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-white text-black font-black flex items-center justify-center text-lg">
              ا
            </div>
            <div>
              <div className="font-bold text-sm leading-none">ebnyly</div>
              <div className="text-xs text-zinc-500 leading-none mt-1">ابنيلي</div>
            </div>
            <span className="text-[10px] bg-white text-black px-2 py-0.5 rounded-full font-bold">
              BETA
            </span>
          </div>
          <div className="w-9 h-9 rounded-full bg-[#1e1e1e] border border-[#2a2a2a] flex items-center justify-center text-zinc-400 text-xs">
            F
          </div>
        </div>

        {/* Chat history */}
        <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((m) =>
            m.role === "user" ? (
              <div key={m.id} className="flex justify-start">
                <div className="bg-white text-black rounded-2xl rounded-br-sm px-4 py-3 text-sm max-w-[85%] font-medium leading-6">
                  {m.text}
                </div>
              </div>
            ) : (
              <div key={m.id} className="flex justify-end">
                <div className="bg-[#1a1a1a] border border-[#242424] rounded-2xl rounded-bl-sm p-4 text-sm text-zinc-300 leading-6 max-w-[90%]">
                  {m.text}
                </div>
              </div>
            )
          )}
          {building && (
            <div className="flex justify-end">
              <div className="bg-[#1a1a1a] border border-[#242424] rounded-2xl rounded-bl-sm px-4 py-3 text-sm text-zinc-500 animate-pulse">
                جاري البناء... ✨
              </div>
            </div>
          )}
        </div>

        {/* Input area */}
        <div className="p-3 border-t border-[#1f1f1f] shrink-0">
          <div className="bg-[#181818] border border-[#2a2a2a] rounded-2xl p-3 focus-within:border-zinc-600 transition">
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleBuild();
                }
              }}
              placeholder="اوصف الموقع اللي نفسك فيه..."
              rows={2}
              className="w-full bg-transparent outline-none text-sm placeholder:text-zinc-600 resize-none leading-6"
            />
            <div className="flex items-center justify-between mt-2">
              <div className="flex items-center gap-2">
                <button
                  title="إرفاق ملف"
                  className="w-8 h-8 rounded-full bg-[#222] flex items-center justify-center text-sm hover:bg-[#2a2a2a] transition"
                >
                  📎
                </button>
                <select
                  value={model}
                  onChange={(e) => setModel(e.target.value as Model)}
                  className="bg-[#222] text-xs px-3 h-8 rounded-full outline-none text-zinc-400 border border-[#2a2a2a] cursor-pointer"
                >
                  {MODELS.map((m) => (
                    <option key={m} value={m}>
                      {m}
                    </option>
                  ))}
                </select>
              </div>
              <button
                onClick={handleBuild}
                disabled={building || !prompt.trim()}
                className="bg-white text-black rounded-full px-6 h-9 text-sm font-bold hover:bg-zinc-200 transition disabled:opacity-40 disabled:cursor-not-allowed"
              >
                ابني →
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* LEFT - PREVIEW PANEL (LTR) */}
      <div className="flex-1 bg-[#0f0f0f] flex flex-col" dir="ltr">
        {/* Preview toolbar */}
        <div className="h-14 bg-[#121212] border-b border-[#1f1f1f] flex items-center px-4 gap-3 shrink-0">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
            <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
            <div className="w-3 h-3 rounded-full bg-[#28ca42]" />
          </div>

          <div className="flex-1 max-w-md h-8 bg-[#1a1a1a] rounded-full flex items-center px-4 gap-2 text-xs text-zinc-500 border border-[#242424]">
            <span className="text-zinc-600">↻</span>
            ebnyly.app/preview/demo
            <span className="ml-auto w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
          </div>

          <div className="flex bg-[#1a1a1a] rounded-full p-1 border border-[#242424] gap-1">
            {(
              [
                { id: "desktop", icon: "◫" },
                { id: "tablet", icon: "▭" },
                { id: "mobile", icon: "📱" },
              ] as { id: Device; icon: string }[]
            ).map((d) => (
              <button
                key={d.id}
                onClick={() => setDevice(d.id)}
                title={d.id}
                className={`w-7 h-7 rounded-full text-xs transition ${
                  device === d.id
                    ? "bg-white text-black"
                    : "text-zinc-500 hover:text-zinc-300"
                }`}
              >
                {d.icon}
              </button>
            ))}
          </div>

          <button
            onClick={handleRefresh}
            title="تحديث المعاينة"
            className="w-8 h-8 rounded-full bg-[#1e1e1e] border border-[#2a2a2a] flex items-center justify-center text-zinc-400 text-sm hover:text-white transition"
          >
            ↻
          </button>

          <button
            onClick={handlePublish}
            className="bg-white text-black px-5 h-9 rounded-full text-sm font-bold hover:bg-zinc-200 transition"
          >
            {published ? "تم النشر ✓" : "نشر"}
          </button>
        </div>

        {/* Preview content */}
        <div className="flex-1 p-8 overflow-auto flex justify-center bg-[#0a0a0a]">
          <div
            className={`${DEVICE_WIDTHS[device]} transition-all duration-300 bg-white text-black rounded-2xl overflow-hidden shadow-[0_30px_80px_rgba(0,0,0,0.5)] ${
              building ? "opacity-60" : "opacity-100"
            }`}
          >
            <div className="h-16 border-b border-zinc-100 flex items-center justify-between px-8">
              <div className="font-black text-xl tracking-tighter">NOIR.</div>
              <div className="flex gap-6 text-xs tracking-widest font-semibold text-zinc-600">
                <span>SHOP</span>
                <span>COLLECTION</span>
                <span>STORY</span>
              </div>
              <div className="w-8 h-8 bg-black text-white rounded-full flex items-center justify-center text-xs font-bold">
                3
              </div>
            </div>

            <div className="grid grid-cols-2 min-h-[520px]">
              <div className="p-12 flex flex-col justify-center bg-white">
                <div className="text-xs tracking-[0.35em] text-zinc-400 mb-6">
                  NEW DROP — SS26
                </div>
                <h1 className="text-6xl font-black leading-[0.85] tracking-[-0.04em]">
                  WEAR
                  <br />
                  THE
                  <br />
                  NIGHT
                </h1>
                <p className="text-sm text-zinc-500 mt-8 max-w-sm leading-7">
                  Minimal streetwear designed in Cairo. Black, white, and nothing
                  in between.
                </p>
                <div className="flex gap-3 mt-10">
                  <button className="bg-black text-white px-8 h-12 rounded-full text-sm font-bold">
                    SHOP NOW — 2,500 EGP
                  </button>
                  <button className="border border-zinc-200 px-6 h-12 rounded-full text-sm">
                    Lookbook
                  </button>
                </div>
              </div>
              <div className="bg-[#f6f6f6] flex items-center justify-center p-10">
                <div className="w-full h-full min-h-[380px] bg-gradient-to-b from-zinc-200 to-zinc-300 rounded-xl border border-zinc-200 flex items-center justify-center text-zinc-400 text-sm">
                  Product Image
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

