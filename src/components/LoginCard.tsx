import { useEffect, useRef, useState } from "react";

/* ----------------------------- icons ----------------------------- */
const I = {
  mail: (c = "") => (
    <svg className={c} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="5" width="18" height="14" rx="2.5" /><path d="m3.5 7 8.5 6 8.5-6" /></svg>
  ),
  lock: (c = "") => (
    <svg className={c} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="10" width="16" height="11" rx="2.5" /><path d="M8 10V7a4 4 0 0 1 8 0v3" /><circle cx="12" cy="15.5" r="1.3" fill="currentColor" stroke="none" /></svg>
  ),
  eye: (c = "") => (
    <svg className={c} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7-10-7-10-7Z" /><circle cx="12" cy="12" r="3" /></svg>
  ),
  eyeOff: (c = "") => (
    <svg className={c} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M10.6 6.2A9.7 9.7 0 0 1 12 6c6.4 0 10 6 10 6a17 17 0 0 1-3.2 3.8M6.1 6.2A17 17 0 0 0 2 12s3.6 6 10 6a9.6 9.6 0 0 0 4-.8" /><path d="m9.9 9.9a3 3 0 0 0 4.2 4.2" /><path d="m3 3 18 18" /></svg>
  ),
  arrow: (c = "") => (
    <svg className={c} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14" /><path d="m13 6 6 6-6 6" /></svg>
  ),
  shield: (c = "") => (
    <svg className={c} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3 5 6v6c0 4.4 3 7.6 7 9 4-1.4 7-4.6 7-9V6l-7-3Z" /><path d="m9 12 2 2 4-4" /></svg>
  ),
  globe: (c = "") => (
    <svg className={c} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3c2.5 2.6 2.5 15.4 0 18M12 3c-2.5 2.6-2.5 15.4 0 18" /></svg>
  ),
  ms: (c = "") => (
    <svg className={c} viewBox="0 0 24 24" fill="currentColor"><rect x="2" y="2" width="9.5" height="9.5" fill="#f25022" /><rect x="12.5" y="2" width="9.5" height="9.5" fill="#7fba00" /><rect x="2" y="12.5" width="9.5" height="9.5" fill="#00a4ef" /><rect x="12.5" y="12.5" width="9.5" height="9.5" fill="#ffb900" /></svg>
  ),
  alert: (c = "") => (
    <svg className={c} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9" /><path d="M12 7.5v5" /><circle cx="12" cy="16" r="0.6" fill="currentColor" /></svg>
  ),
};

const DEMO = { email: "admin@netsol.io", password: "Nexus-2026" };

type Status = "idle" | "loading" | "success" | "error";

export type LoginCardProps = {
  /**
   * Plug your real auth call in here. Return/resolve with no error to
   * indicate success, or throw / reject with an Error(message) to show
   * the error banner. If omitted, a mock 1.35s delay + demo credential
   * check is used instead.
   */
  onSubmit?: (email: string, password: string, remember: boolean) => Promise<void>;
  /**
   * Called once the success animation has played. This is your hook to
   * navigate away from the login screen / mount the chatbot UI.
   */
  onAuthenticated?: () => void;
  /** Delay (ms) between showing the success state and calling onAuthenticated. */
  successDelay?: number;
};

/* ----------------------------- field ----------------------------- */
function Field({
  id,
  label,
  type = "text",
  value,
  onChange,
  icon,
  autoComplete,
  trailing,
  error,
  hint,
}: {
  id: string;
  label: string;
  type?: string;
  value: string;
  onChange: (v: string) => void;
  icon: React.ReactNode;
  autoComplete?: string;
  trailing?: React.ReactNode;
  error?: boolean;
  hint?: React.ReactNode;
}) {
  const [focused, setFocused] = useState(false);
  const active = focused || value.length > 0;
  return (
    <div>
      <div
        className={`group relative flex items-center rounded-xl border bg-white transition-all duration-200 ${
          error
            ? "border-rose-400 ring-4 ring-rose-100"
            : focused
            ? "border-brand ring-4 ring-brand/10"
            : "border-slate-200 hover:border-slate-300"
        }`}
      >
        {/* left accent bar */}
        <span
          className={`absolute left-0 top-1/2 h-0 w-[3px] -translate-y-1/2 rounded-r bg-brand transition-all duration-300 ${
            focused ? "h-7" : "h-0"
          }`}
        />
        <span
          className={`pl-3.5 transition-colors ${
            error ? "text-rose-400" : focused ? "text-brand" : "text-slate-400"
          }`}
        >
          {icon}
        </span>
        <div className="relative flex-1 px-3">
          <label
            htmlFor={id}
            className={`pointer-events-none absolute left-3 font-mono uppercase tracking-[0.14em] transition-all duration-200 ${
              active
                ? "top-1.5 text-[9px] text-slate-400"
                : "top-1/2 -translate-y-1/2 text-[12px] text-slate-400"
            }`}
          >
            {label}
          </label>
          <input
            id={id}
            type={type}
            value={value}
            autoComplete={autoComplete}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            onChange={(e) => onChange(e.target.value)}
            className={`w-full bg-transparent pb-2 pt-5 text-[15px] font-medium text-ink outline-none placeholder:text-transparent ${
              active ? "" : "text-transparent"
            }`}
            placeholder={label}
          />
        </div>
        {trailing && <div className="pr-2">{trailing}</div>}
      </div>
      {hint && (
        <div className="mt-1.5 pl-1 text-[12px] text-slate-500">{hint}</div>
      )}
    </div>
  );
}

/* ----------------------------- card ----------------------------- */
export default function LoginCard({
  onSubmit,
  onAuthenticated,
  successDelay = 900,
}: LoginCardProps = {}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(true);
  const [showPw, setShowPw] = useState(false);
  const [caps, setCaps] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  const [errTick, setErrTick] = useState(0);
  const pwRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const h = (e: KeyboardEvent) => setCaps(e.getModifierState("CapsLock"));
    window.addEventListener("keydown", h);
    window.addEventListener("keyup", h);
    return () => {
      window.removeEventListener("keydown", h);
      window.removeEventListener("keyup", h);
    };
  }, []);

  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (status === "loading" || status === "success") return;
    if (!emailValid) {
      setError("Enter a valid work email address.");
      setErrTick((t) => t + 1);
      setStatus("error");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      setErrTick((t) => t + 1);
      setStatus("error");
      return;
    }
    setError("");
    setStatus("loading");

    const finishOk = () => setStatus("success");
    const finishErr = (message: string) => {
      setError(message);
      setErrTick((t) => t + 1);
      setStatus("error");
    };

    if (onSubmit) {
      // Real integration: wire this up to your auth API.
      onSubmit(email, password, remember)
        .then(finishOk)
        .catch((err: unknown) =>
          finishErr(err instanceof Error ? err.message : "Sign-in failed. Please try again.")
        );
      return;
    }

    // Mock flow (used when no onSubmit is provided) — demo credentials only.
    window.setTimeout(() => {
      if (email === DEMO.email && password === DEMO.password) {
        finishOk();
      } else {
        finishErr(
          "We couldn't match those credentials. Check your email and password, or use the demo login below."
        );
      }
    }, 1350);
  }

  useEffect(() => {
    if (status !== "success") return;
    const id = window.setTimeout(() => onAuthenticated?.(), successDelay);
    return () => window.clearTimeout(id);
  }, [status, onAuthenticated, successDelay]);

  function fillDemo() {
    setEmail(DEMO.email);
    setPassword(DEMO.password);
    setError("");
    setStatus("idle");
    pwRef.current?.focus();
  }

  return (
    <div className="relative flex w-full max-w-[460px] flex-col px-6 py-10 sm:px-10 sm:py-14">
      {/* top utility row */}
      <div className="mb-10 flex items-center justify-between">
        <button
          type="button"
          className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.14em] text-slate-500 transition-colors hover:border-brand/40 hover:text-brand"
        >
          {I.globe("h-3.5 w-3.5")}
          US‑East‑1
        </button>
        <div className="flex items-center gap-4 text-[13px]">
          <a className="text-slate-500 transition-colors hover:text-ink" href="#">
            Help
          </a>
          <span className="h-3 w-px bg-slate-200" />
          <a className="font-medium text-brand transition-colors hover:text-brand-deep" href="#">
            Request access
          </a>
        </div>
      </div>

      {/* heading */}
      <div className="rise">
        <div className="inline-flex items-center gap-2 rounded-full bg-brand/8 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.22em] text-brand-deep">
          {I.shield("h-3.5 w-3.5")}
          secure sign‑in
        </div>
        <h1 className="mt-5 font-display text-[34px] font-bold leading-[1.05] tracking-tight text-ink sm:text-[40px]">
          Welcome back.
        </h1>
        <p className="mt-2.5 text-[15px] leading-relaxed text-slate-500">
          Sign in to your workspace to manage portfolios,
          <br className="hidden sm:block" /> approvals and audit trails.
        </p>
      </div>

      {/* form */}
      <form onSubmit={submit} className="rise mt-8 space-y-4" style={{ animationDelay: "0.08s" }}>
        <Field
          id="email"
          label="Work email"
          type="email"
          value={email}
          onChange={setEmail}
          autoComplete="username"
          icon={I.mail("h-[18px] w-[18px]")}
        />

        <Field
          id="password"
          label="Password"
          type={showPw ? "text" : "password"}
          value={password}
          onChange={setPassword}
          autoComplete="current-password"
          icon={I.lock("h-[18px] w-[18px]")}
          trailing={
            <button
              type="button"
              onClick={() => setShowPw((s) => !s)}
              tabIndex={-1}
              aria-label={showPw ? "Hide password" : "Show password"}
              className="rounded-lg p-2 text-slate-400 transition-colors hover:bg-slate-100 hover:text-ink"
            >
              {showPw ? I.eyeOff("h-[18px] w-[18px]") : I.eye("h-[18px] w-[18px]")}
            </button>
          }
          hint={
            caps ? (
              <span className="inline-flex items-center gap-1 font-medium text-amber-600">
                {I.alert("h-3.5 w-3.5")} Caps Lock is on
              </span>
            ) : undefined
          }
        />

        {/* remember + forgot */}
        <div className="flex items-center justify-between pt-0.5">
          <label className="group inline-flex cursor-pointer select-none items-center gap-2.5 text-[13px] text-slate-600">
            <span className="relative inline-flex">
              <input
                type="checkbox"
                checked={remember}
                onChange={(e) => setRemember(e.target.checked)}
                className="peer sr-only"
              />
              <span className="h-[18px] w-[18px] rounded-[5px] border border-slate-300 bg-white transition-all duration-200 peer-checked:border-brand peer-checked:bg-brand peer-focus-visible:ring-4 peer-focus-visible:ring-brand/20" />
              <svg
                className="pointer-events-none absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 text-white opacity-0 transition-opacity peer-checked:opacity-100"
                viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.4" strokeLinecap="round" strokeLinejoin="round"
              >
                <path d="m5 12 4.5 4.5L19 7" />
              </svg>
            </span>
            Keep me signed in on this device
          </label>
          <a href="#" className="text-[13px] font-medium text-brand transition-colors hover:text-brand-deep">
            Forgot password?
          </a>
        </div>

        {/* error banner */}
        {status === "error" && error && (
          <div
            key={errTick}
            className="anim-shake flex items-start gap-2.5 rounded-xl border border-rose-200 bg-rose-50 px-3.5 py-3 text-[13px] text-rose-700"
          >
            {I.alert("mt-0.5 h-4 w-4 shrink-0")}
            <span>{error}</span>
          </div>
        )}

        {/* submit */}
        <button
          type="submit"
          disabled={status === "loading" || status === "success"}
          className="group relative mt-1 flex w-full items-center justify-center gap-2 overflow-hidden rounded-xl bg-brand px-5 py-3.5 text-[15px] font-semibold text-white shadow-[0_10px_30px_-12px_rgba(27,117,188,0.8)] transition-all duration-200 hover:bg-brand-deep hover:shadow-[0_16px_36px_-12px_rgba(27,117,188,0.9)] active:scale-[0.985] disabled:cursor-not-allowed disabled:opacity-90"
        >
          <span className="btn-shimmer pointer-events-none absolute inset-0" />
          {status === "loading" ? (
            <>
              <span className="anim-spinslow h-[18px] w-[18px] rounded-full border-2 border-white/40 border-t-white" />
              Establishing session…
            </>
          ) : (
            <>
              Sign in
              {I.arrow("h-[18px] w-[18px] transition-transform duration-200 group-hover:translate-x-1")}
            </>
          )}
        </button>

        {/* demo helper */}
        <div className="flex items-center justify-center gap-2 pt-0.5 text-[12px] text-slate-400">
          <span>Need a quick look?</span>
          <button
            type="button"
            onClick={fillDemo}
            className="font-mono text-[11px] uppercase tracking-wider text-brand underline-offset-4 transition-colors hover:text-brand-deep hover:underline"
          >
            Use demo credentials
          </button>
        </div>

        {/* divider */}
        <div className="relative my-1 flex items-center gap-3">
          <span className="h-px flex-1 bg-slate-200" />
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-slate-400">
            or continue with
          </span>
          <span className="h-px flex-1 bg-slate-200" />
        </div>

        {/* SSO */}
        <button
          type="button"
          className="group flex w-full items-center justify-center gap-2.5 rounded-xl border border-slate-200 bg-white px-5 py-3 text-[14px] font-medium text-slate-700 transition-all duration-200 hover:border-slate-300 hover:bg-slate-50 active:scale-[0.99]"
        >
          {I.ms("h-4 w-4")}
          Single sign‑on
          <span className="ml-1 rounded bg-slate-100 px-1.5 py-0.5 font-mono text-[10px] uppercase tracking-wider text-slate-500 transition-colors group-hover:bg-white">
            SAML
          </span>
        </button>
      </form>

      {/* footer */}
      <div className="mt-10 flex flex-wrap items-center justify-between gap-3 border-t border-slate-200/70 pt-5 text-[12px] text-slate-400">
        <span>© 2026 NETSOL Technologies</span>
        <div className="flex items-center gap-4">
          <a href="#" className="transition-colors hover:text-ink">Privacy</a>
          <a href="#" className="transition-colors hover:text-ink">Terms</a>
          <a href="#" className="transition-colors hover:text-ink">Security</a>
        </div>
      </div>

      {/* success overlay */}
      {status === "success" && (
        <div className="fade absolute inset-0 z-20 flex flex-col items-center justify-center rounded-[inherit] bg-white/95 px-8 text-center backdrop-blur-sm">
          <div className="relative h-20 w-20">
            <svg viewBox="0 0 60 60" className="h-20 w-20">
              <circle className="ring-path" cx="30" cy="30" r="26.5" fill="none" stroke="#1b75bc" strokeWidth="2.5" />
              <path className="check-path" d="M19 31 l8 8 l15 -17" fill="none" stroke="#1b75bc" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <h3 className="mt-5 font-display text-2xl font-bold tracking-tight text-ink">
            Identity verified
          </h3>
          <p className="mt-2 max-w-xs text-[14px] text-slate-500">
            Establishing an encrypted session to your workspace…
          </p>
          <div className="mt-6 h-1 w-48 overflow-hidden rounded-full bg-slate-100">
            <div className="h-full w-1/3 rounded-full bg-brand" style={{ animation: "shimmer 1.1s linear infinite, slide 1.6s ease-in-out infinite" }} />
          </div>
          <div className="mt-5 font-mono text-[11px] uppercase tracking-[0.2em] text-slate-400">
            redirecting to dashboard
          </div>
        </div>
      )}

      <style>{`@keyframes slide{0%{transform:translateX(-100%)}100%{transform:translateX(320%)}}`}</style>
    </div>
  );
}
