"use client";

import { useState, useRef, useEffect, useCallback } from "react";

// ------------------------------------------------------------------
// The form submits to /api/contact (see route.js in the next message).
// We keep the narrative "fill in the blanks" pattern but with real
// name attributes + real submission.
// ------------------------------------------------------------------
const INITIAL_FORM = { name: "", project: "", email: "", message: "" };

export default function Contact() {
  const [formData, setFormData] = useState(INITIAL_FORM);
  const [activeField, setActiveField] = useState(null);
  const [status, setStatus] = useState("idle"); // idle | sending | success | error
  const [errorMessage, setErrorMessage] = useState("");
  const [terminalLog, setTerminalLog] = useState("SYSTEM: STANDBY_");

  const submitRef = useRef(null);
  const rafRef = useRef(0);
  const pointerRef = useRef({ x: 0, y: 0 });
  const reduceMotionRef = useRef(false);

  // Detect reduced motion + touch (for magnetic button)
  useEffect(() => {
    if (typeof window === "undefined") return;
    reduceMotionRef.current = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
  }, []);

  // Telemetry log reflects real state
  useEffect(() => {
    if (status === "sending") return setTerminalLog("DISPATCH: TRANSMITTING_");
    if (status === "success") return setTerminalLog("DISPATCH: TRANSMISSION_SUCCESSFUL");
    if (status === "error") return setTerminalLog("DISPATCH: TRANSMISSION_FAILED");
    if (activeField) return setTerminalLog(`STREAM: INITIATING_${activeField.toUpperCase()}_LOG`);
    if (Object.values(formData).some((v) => v.trim().length > 0))
      return setTerminalLog("BUFFER: READY_FOR_DISPATCH");
    setTerminalLog("SYSTEM: STANDBY_");
  }, [activeField, formData, status]);

  // ---- Magnetic button (rAF-throttled, no React re-renders) ----
  const applyPointer = useCallback(() => {
    const node = submitRef.current;
    if (!node) return;
    if (reduceMotionRef.current) {
      node.style.transform = "translate(0, 0)";
      return;
    }
    node.style.transform = `translate(${pointerRef.current.x}px, ${pointerRef.current.y}px)`;
  }, []);

  const handleMouseMove = (e) => {
    if (!submitRef.current || status === "sending") return;
    // Skip on touch — magnetic hover is pointless there.
    if (e.pointerType === "touch") return;
    const rect = submitRef.current.getBoundingClientRect();
    const dx = e.clientX - (rect.left + rect.width / 2);
    const dy = e.clientY - (rect.top + rect.height / 2);
    const dist = Math.sqrt(dx * dx + dy * dy);
    pointerRef.current = dist < 100 ? { x: dx * 0.35, y: dy * 0.35 } : { x: 0, y: 0 };
    if (rafRef.current) return;
    rafRef.current = requestAnimationFrame(() => {
      rafRef.current = 0;
      applyPointer();
    });
  };

  const handleMouseLeave = () => {
    pointerRef.current = { x: 0, y: 0 };
    applyPointer();
  };

  // ---- Submit ----
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (status === "sending") return;

    // Basic client-side validation
    if (!formData.name.trim() || !formData.email.trim() || !formData.project.trim()) {
      setStatus("error");
      setErrorMessage("Please fill in your name, email, and project.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setStatus("error");
      setErrorMessage("Please enter a valid email address.");
      return;
    }

    setStatus("sending");
    setErrorMessage("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        throw new Error(data?.error || "Something went wrong. Please try again.");
      }

      setStatus("success");
      setFormData(INITIAL_FORM);
    } catch (err) {
      setStatus("error");
      setErrorMessage(err.message || "Something went wrong. Please try again.");
    }
  };

  const onChange = (field) => (e) =>
    setFormData((prev) => ({ ...prev, [field]: e.target.value }));

  const isSending = status === "sending";

  return (
    <section
      id="contact"
      className="relative w-full flex flex-col justify-center overflow-hidden bg-transparent section-pad px-6 sm:px-10 lg:px-16"
    >
      {/* Header */}
      <div className="mx-auto w-full max-w-7xl mb-10 sm:mb-14">
        <h2 className="text-[11px] sm:text-xs uppercase tracking-[0.3em] text-purple-600 font-semibold mb-2">
          Connection
        </h2>
        <p className="text-xl sm:text-2xl font-bold text-black tracking-tight uppercase">
          Start a Conversation
        </p>
        <div className="w-12 h-[1px] bg-black/20 mt-3" />
      </div>

      <div className="mx-auto w-full max-w-5xl grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
        {/* ---------------------------------------------------------- */}
        {/* Form (inline narrative)                                     */}
        {/* ---------------------------------------------------------- */}
        <form onSubmit={handleSubmit} className="lg:col-span-8 space-y-8" noValidate>
          <div className="text-xl sm:text-2xl lg:text-3xl font-light tracking-tight text-neutral-800 leading-[1.75] sm:leading-[1.85]">
            Hello, my name is{" "}
            <BlankInput
              field="name"
              label="Your name"
              value={formData.name}
              onChange={onChange("name")}
              onFocus={() => setActiveField("name")}
              onBlur={() => setActiveField(null)}
              isActive={activeField === "name"}
              placeholder="[ your name ]"
              autoComplete="name"
              className="uppercase font-black"
            />
            {" "}and I am looking to develop a{" "}
            <BlankInput
              field="project"
              label="Project you want to build"
              value={formData.project}
              onChange={onChange("project")}
              onFocus={() => setActiveField("project")}
              onBlur={() => setActiveField(null)}
              isActive={activeField === "project"}
              placeholder="[ project architecture ]"
              className="uppercase font-black"
            />
            . You can reach me via email at{" "}
            <BlankInput
              field="email"
              label="Your email"
              type="email"
              value={formData.email}
              onChange={onChange("email")}
              onFocus={() => setActiveField("email")}
              onBlur={() => setActiveField(null)}
              isActive={activeField === "email"}
              placeholder="[ your email ]"
              autoComplete="email"
              inputMode="email"
              className="lowercase font-black"
            />
            . Additional context:{" "}
            <span className="block mt-3">
              <input
                type="text"
                name="message"
                aria-label="Additional context or requirements"
                placeholder="[ write a brief overview or requirements here… ]"
                value={formData.message}
                onChange={onChange("message")}
                onFocus={() => setActiveField("message")}
                onBlur={() => setActiveField(null)}
                className="w-full bg-transparent border-none text-base sm:text-lg font-normal text-black placeholder-neutral-300 focus:outline-none focus:ring-0 p-0"
              />
              <span
                className={`block h-[1px] w-full transition-colors duration-300 ${
                  activeField === "message" ? "bg-purple-600" : "bg-neutral-200"
                }`}
              />
            </span>
          </div>

          {/* Submit + status */}
          <div className="pt-4 flex flex-col sm:flex-row sm:items-center gap-5">
            <div className="flex items-center gap-5">
              <button
                ref={submitRef}
                type="submit"
                disabled={isSending}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                aria-label={isSending ? "Sending message" : "Send message"}
                className={`w-14 h-14 rounded-full border flex items-center justify-center transition-colors duration-300 relative z-10 shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2 ${
                  isSending
                    ? "border-neutral-200 bg-neutral-100 text-neutral-400 cursor-wait"
                    : status === "success"
                    ? "border-green-600 bg-green-50 text-green-700"
                    : "border-neutral-200 hover:border-black bg-white text-black"
                }`}
              >
                {isSending ? (
                  <span className="w-4 h-4 rounded-full border-2 border-neutral-400 border-t-transparent animate-spin" />
                ) : status === "success" ? (
                  <span aria-hidden="true">✓</span>
                ) : (
                  <span aria-hidden="true" className="text-lg font-light">→</span>
                )}
              </button>
              <span className="text-[10px] uppercase tracking-[0.25em] text-neutral-500 font-bold">
                {isSending ? "Transmitting…" : "Execute Handshake Request"}
              </span>
            </div>

            {/* Live status region (screen-reader friendly) */}
            <p
              aria-live="polite"
              className={`text-xs sm:text-sm font-medium ${
                status === "error"
                  ? "text-red-600"
                  : status === "success"
                  ? "text-green-700"
                  : "text-neutral-500"
              }`}
            >
              {status === "success" && "Message sent. I'll get back to you soon."}
              {status === "error" && (errorMessage || "Something went wrong.")}
            </p>
          </div>
        </form>

        {/* ---------------------------------------------------------- */}
        {/* Right column: contact info + telemetry                      */}
        {/* ---------------------------------------------------------- */}
        <div className="lg:col-span-4 lg:border-l lg:border-neutral-100 lg:pl-10 flex flex-col gap-8">
          <div className="space-y-6">
            <div className="space-y-1.5">
              <h4 className="text-[9px] uppercase tracking-[0.2em] text-neutral-400 font-black">
                Direct Communication
              </h4>
              <a
                href="mailto:fahadjadoon50@gmail.com"
                className="text-sm font-medium text-neutral-700 hover:text-purple-600 transition-colors break-all"
              >
                fahadjadoon50@gmail.com
              </a>
            </div>

            <div className="space-y-1.5">
              <h4 className="text-[9px] uppercase tracking-[0.2em] text-neutral-400 font-black">
                Secure Relays
              </h4>
              <div className="flex gap-5 text-[11px] font-bold text-neutral-500">
                <a
                  href="https://github.com/Fahadjadoon"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-purple-600 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2 rounded"
                >
                  GITHUB
                </a>
                <a
                  href="https://www.linkedin.com/in/fahad-jadoon-604612252/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-purple-600 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2 rounded"
                >
                  LINKEDIN
                </a>
              </div>
            </div>
          </div>

          {/* Telemetry monitor */}
          <div className="w-full bg-neutral-50/70 border border-neutral-100 p-4 font-mono text-[10px] tracking-wide text-neutral-500 select-none space-y-2">
            <div className="flex justify-between items-center opacity-80 border-b border-neutral-200/60 pb-2">
              <span className="font-bold text-neutral-600">LIVE_TELEMETRY</span>
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-purple-600 animate-ping" />
                <span className="text-[9px] text-purple-600 font-bold">PORT_8080</span>
              </div>
            </div>
            <div
              aria-live="polite"
              className="font-bold text-neutral-800 truncate uppercase"
            >
              {terminalLog}
            </div>
            <div className="flex justify-between opacity-60">
              <span>LOC: OUTBOUND_EDGE</span>
              <span>STATUS: {status === "success" ? "200_OK" : status === "error" ? "500_ERR" : "200_OK"}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* A single inline blank — used for the narrative form                 */
/* ------------------------------------------------------------------ */
function BlankInput({
  field,
  label,
  type = "text",
  value,
  onChange,
  onFocus,
  onBlur,
  isActive,
  placeholder,
  autoComplete,
  inputMode,
  className = "",
}) {
  return (
    <span className="relative inline-block align-baseline min-w-[140px] sm:min-w-[180px] mx-1">
      <input
        type={type}
        name={field}
        aria-label={label}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
        autoComplete={autoComplete}
        inputMode={inputMode}
        // 16px minimum on mobile prevents iOS auto-zoom on focus
        className={`w-full bg-transparent border-none text-black placeholder-neutral-300 focus:outline-none focus:ring-0 p-0 text-base sm:text-2xl lg:text-3xl tracking-tight ${className}`}
      />
      <span
        className={`absolute -bottom-0.5 left-0 h-[2px] w-full transition-colors duration-300 ${
          isActive ? "bg-purple-600" : "bg-neutral-200"
        }`}
      />
    </span>
  );
}