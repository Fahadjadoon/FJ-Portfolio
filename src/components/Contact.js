"use client";
import { useState, useRef, useEffect } from "react";

export default function Contact() {
  const [formData, setFormData] = useState({ name: "", project: "", email: "", message: "" });
  const [activeField, setActiveField] = useState(null);
  const [terminalLog, setTerminalLog] = useState("SYSTEM: STANDBY_");
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const submitRef = useRef(null);

  // Magnetic button tracking logic
  const handleMouseMove = (e) => {
    if (!submitRef.current) return;
    const rect = submitRef.current.getBoundingClientRect();
    const x = e.clientX - (rect.left + rect.width / 2);
    const y = e.clientY - (rect.top + rect.height / 2);
    
    const distance = Math.sqrt(x * x + y * y);
    if (distance < 100) {
      setMousePos({ x: x * 0.4, y: y * 0.4 });
    } else {
      setMousePos({ x: 0, y: 0 });
    }
  };

  const handleMouseLeave = () => setMousePos({ x: 0, y: 0 });

  // Dynamic status terminal telemetry log
  useEffect(() => {
    if (activeField) {
      setTerminalLog(`STREAM: INITIATING_${activeField.toUpperCase()}_LOG`);
    } else if (Object.values(formData).some(val => val.length > 0)) {
      setTerminalLog("BUFFER: READY_FOR_DISPATCH");
    }
  }, [activeField, formData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setTerminalLog("DISPATCH: TRANSMISSION_SUCCESSFUL");
    setTimeout(() => {
      setFormData({ name: "", project: "", email: "", message: "" });
      setTerminalLog("SYSTEM: CONNECTION_REFRESHED");
    }, 2000);
  };

  return (
    /* Swapped background variable from bg-white to bg-transparent for unified layout matrix flows */
    <section id="contact" className="min-h-screen bg-transparent w-full flex flex-col justify-center relative overflow-hidden py-24 px-6 sm:px-12 lg:px-24 z-0">
      
      {/* EDITORIAL HEADER */}
      <div className="max-w-7xl w-full mx-auto relative z-10 mb-16">
        <h2 className="text-xs uppercase tracking-[0.3em] text-purple-600 font-semibold mb-2">Connection</h2>
        <p className="text-2xl font-bold text-black tracking-tight uppercase">Start a Conversation</p>
        <div className="w-12 h-[1px] bg-black/20 mt-3" />
      </div>

      {/* MAIN CANVAS CONTAINER MATRIX */}
      <div className="max-w-5xl w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 relative z-10 items-end">
        
        {/* Left Side Frame: Interactive Inline Narrative */}
        <form onSubmit={handleSubmit} className="lg:col-span-8 space-y-10">
          <div className="text-2xl sm:text-3xl lg:text-4xl font-light tracking-tight text-neutral-800 leading-[1.7] sm:leading-[1.8]">
            Hello, my name is{" "}
            <span className="relative inline-block min-w-[150px] vertical-baseline mx-1">
              <input
                type="text"
                required
                placeholder="[ your name ]"
                value={formData.name}
                onFocus={() => setActiveField("name")}
                onBlur={() => setActiveField(null)}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full bg-transparent border-none text-black font-black placeholder-neutral-200 focus:outline-none focus:ring-0 p-0 text-2xl sm:text-3xl lg:text-4xl uppercase tracking-tight"
              />
              <div className={`absolute bottom-0 left-0 h-[2px] bg-black w-full transition-transform duration-500 origin-left ${activeField === "name" ? "scale-x-100 bg-purple-600" : "scale-x-100 bg-neutral-100"}`} />
            </span>
            {" "}and I am looking to develop a{" "}
            <span className="relative inline-block min-w-[180px] vertical-baseline mx-1">
              <input
                type="text"
                required
                placeholder="[ project architecture ]"
                value={formData.project}
                onFocus={() => setActiveField("project")}
                onBlur={() => setActiveField(null)}
                onChange={(e) => setFormData({ ...formData, project: e.target.value })}
                className="w-full bg-transparent border-none text-black font-black placeholder-neutral-200 focus:outline-none focus:ring-0 p-0 text-2xl sm:text-3xl lg:text-4xl uppercase tracking-tight"
              />
              <div className={`absolute bottom-0 left-0 h-[2px] w-full transition-transform duration-500 origin-left ${activeField === "project" ? "scale-x-100 bg-purple-600" : "scale-x-100 bg-neutral-100"}`} />
            </span>
            . You can reach me via email at{" "}
            <span className="relative inline-block min-w-[200px] vertical-baseline mx-1">
              <input
                type="email"
                required
                placeholder="[ your email ]"
                value={formData.email}
                onFocus={() => setActiveField("email")}
                onBlur={() => setActiveField(null)}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full bg-transparent border-none text-black font-black placeholder-neutral-200 focus:outline-none focus:ring-0 p-0 text-2xl sm:text-3xl lg:text-4xl lowercase tracking-tight"
              />
              <div className={`absolute bottom-0 left-0 h-[2px] w-full transition-transform duration-500 origin-left ${activeField === "email" ? "scale-x-100 bg-purple-600" : "scale-x-100 bg-neutral-100"}`} />
            </span>
            . Additional context for this deployment:{" "}
            <span className="relative inline-block w-full vertical-baseline mt-4">
              <input
                type="text"
                placeholder="[ write a brief overview or requirements here... ]"
                value={formData.message}
                onFocus={() => setActiveField("message")}
                onBlur={() => setActiveField(null)}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full bg-transparent border-none text-black font-normal placeholder-neutral-200 focus:outline-none focus:ring-0 p-0 text-lg sm:text-xl leading-relaxed"
              />
              <div className={`absolute bottom-[-4px] left-0 h-[1px] w-full transition-transform duration-500 origin-left ${activeField === "message" ? "scale-x-100 bg-purple-600" : "scale-x-100 bg-neutral-100"}`} />
            </span>
          </div>

          {/* Magnetic Submission Gateway Toggle */}
          <div className="pt-8 flex items-center gap-6">
            <button
              ref={submitRef}
              type="submit"
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              style={{ transform: `translate(${mousePos.x}px, ${mousePos.y}px)` }}
              className="w-14 h-14 rounded-full border border-neutral-200 hover:border-black bg-white text-black flex items-center justify-center transition-colors duration-300 relative z-10 shadow-sm"
            >
              <span className="text-lg font-light transform transition-transform duration-300 hover:translate-x-1">→</span>
            </button>
            <span className="text-[10px] uppercase tracking-[0.25em] text-neutral-400 font-bold">
              Execute Handshake Request
            </span>
          </div>
        </form>

        {/* RIGHT SIDE DATA COLUMNS */}
        <div className="lg:col-span-4 lg:border-l lg:border-neutral-100 lg:pl-10 h-full flex flex-col justify-end gap-10 mt-16 lg:mt-0">
          
          {/* Digital Routing Targets */}
          <div className="grid grid-cols-2 lg:grid-cols-1 gap-6">
            <div className="space-y-1.5">
              <h4 className="text-[9px] uppercase tracking-[0.2em] text-neutral-400 font-black">Direct Communication</h4>
              <a href="mailto:" className="text-xs font-medium text-neutral-600 hover:text-purple-600 transition-colors block">
                hello@yourdomain.com
              </a>
            </div>
            
            <div className="space-y-1.5">
              <h4 className="text-[9px] uppercase tracking-[0.2em] text-neutral-400 font-black">Secure Relays</h4>
              <div className="flex gap-4 text-[11px] font-bold text-neutral-400">
                <a href="#" className="hover:text-purple-600 transition-colors">GITHUB</a>
                <a href="#" className="hover:text-purple-600 transition-colors">LINKEDIN</a>
              </div>
            </div>
          </div>

          {/* Telemetry Stream Monitor */}
          <div className="w-full bg-neutral-50/70 border border-neutral-100 p-4 font-mono text-[9px] tracking-wide text-neutral-400 select-none space-y-2">
            <div className="flex justify-between items-center opacity-70 border-b border-neutral-200/50 pb-2">
              <span className="font-bold text-neutral-500">LIVE_TELEMETRY</span>
              <div className="flex items-center gap-1.5">
                <span className="w-1 h-1 rounded-full bg-purple-600 animate-ping" />
                <span className="text-[8px] text-purple-600 font-bold">PORT_8080</span>
              </div>
            </div>
            <div className="font-bold text-neutral-700 truncate uppercase">{terminalLog}</div>
            <div className="flex justify-between opacity-60">
              <span>LOC: OUTBOUND_EDGE</span>
              <span>STATUS: 200_OK</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}