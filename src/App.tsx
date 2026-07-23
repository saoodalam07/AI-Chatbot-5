import { useState } from "react";
import BrandPanel from "./components/BrandPanel";
import LoginCard from "./components/LoginCard";
import ChatShell from "./components/ChatShell";

export default function App() {
  // Replace with your real auth/session state (context, redux, a hook,
  // whatever your chatbot app already uses).
  const [authenticated, setAuthenticated] = useState(false);

  if (authenticated) {
    // Swap ChatShell for your actual chatbot component.
    return <ChatShell onSignOut={() => setAuthenticated(false)} />;
  }

  return (
    <div className="relative min-h-screen lg:grid lg:h-screen lg:grid-cols-[1.02fr_1fr] lg:overflow-hidden">
      {/* left — brand */}
      <BrandPanel />

      {/* right — sign in */}
      <main className="bg-dotgrid relative flex min-h-[60vh] items-center justify-center overflow-y-auto bg-mist py-10 lg:min-h-0">
        {/* soft ambient accents */}
        <div className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-brand/10 blur-[110px]" />
        <div className="pointer-events-none absolute -bottom-24 -left-16 h-72 w-72 rounded-full bg-brand/5 blur-[110px]" />
        {/* faint corner registration marks */}
        <span className="pointer-events-none absolute left-6 top-6 hidden font-mono text-[10px] uppercase tracking-[0.25em] text-slate-300 lg:block">
          01 / identity
        </span>
        <span className="pointer-events-none absolute bottom-6 right-6 hidden font-mono text-[10px] uppercase tracking-[0.25em] text-slate-300 lg:block">
          netsol.id/secure
        </span>

        <LoginCard
          // No `onSubmit` passed → falls back to the built-in mock flow
          // (demo@ credentials below). In your app, pass a real onSubmit,
          // e.g.:
          //
          // onSubmit={async (email, password) => {
          //   const res = await fetch("/api/auth/login", {
          //     method: "POST",
          //     headers: { "Content-Type": "application/json" },
          //     body: JSON.stringify({ email, password }),
          //   });
          //   if (!res.ok) {
          //     const body = await res.json().catch(() => null);
          //     throw new Error(body?.message ?? "Invalid email or password.");
          //   }
          // }}
          onAuthenticated={() => setAuthenticated(true)}
        />
      </main>

      {/* fixed secure-channel pill */}
      <div className="fixed bottom-4 right-4 z-50 hidden items-center gap-2 rounded-full border border-slate-200 bg-white/80 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.16em] text-slate-500 shadow-sm backdrop-blur sm:inline-flex">
        <span className="anim-blink h-1.5 w-1.5 rounded-full bg-emerald-500" />
        256‑bit TLS · encrypted
      </div>
    </div>
  );
}
