import { useEffect, useRef, useState } from "react";
import NetSolLogo, { NetSolMark } from "./NetSolLogo";

function useCountUp(target: number, duration = 1500, decimals = 0) {
  const [v, setV] = useState(0);
  useEffect(() => {
    let raf = 0;
    const start = performance.now();
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setV(target * eased);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, duration]);
  return decimals > 0 ? v.toFixed(decimals) : Math.round(v).toLocaleString();
}

function Stat({
  value,
  decimals = 0,
  prefix = "",
  suffix = "",
  label,
}: {
  value: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  label: string;
}) {
  const display = useCountUp(value, 1600, decimals);
  return (
    <div className="relative">
      <div className="font-display text-3xl font-bold tracking-tight text-white tabular-nums sm:text-4xl">
        {prefix}
        {display}
        <span className="text-brand-bright">{suffix}</span>
      </div>
      <div className="mt-1 font-mono text-[10px] uppercase tracking-[0.18em] text-white/45">
        {label}
      </div>
    </div>
  );
}

function useClock() {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);
  return now.toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    timeZone: "UTC",
  });
}

export default function BrandPanel() {
  const ref = useRef<HTMLElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const clock = useClock();

  function onMove(e: React.MouseEvent) {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = ((e.clientX - r.left) / r.width - 0.5) * 2;
    const y = ((e.clientY - r.top) / r.height - 0.5) * 2;
    setTilt({ x, y });
  }

  return (
    <section
      ref={ref}
      onMouseMove={onMove}
      className="relative flex min-h-[42vh] flex-col justify-between overflow-hidden bg-navy px-7 py-7 text-white sm:px-10 sm:py-9 lg:min-h-full lg:px-14 lg:py-12"
    >
      {/* base gradient */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_90%_at_15%_0%,#0e2b4a_0%,#08172b_55%,#050e1a_100%)]" />
      {/* animated diagonal grid echoing the N */}
      <div className="bg-diagrid anim-gridpan pointer-events-none absolute inset-0 opacity-70" />
      {/* colour glows that respond to cursor */}
      <div
        className="pointer-events-none absolute -left-24 top-1/4 h-96 w-96 rounded-full bg-brand/30 blur-[120px] transition-transform duration-500 ease-out"
        style={{ transform: `translate(${tilt.x * 18}px, ${tilt.y * 18}px)` }}
      />
      <div className="pointer-events-none absolute -right-20 bottom-0 h-80 w-80 rounded-full bg-brand-deep/40 blur-[120px]" />
      {/* sweeping light beam */}
      <div className="anim-beam pointer-events-none absolute -top-1/3 left-0 h-[160%] w-1/3 bg-gradient-to-b from-transparent via-white/10 to-transparent blur-2xl" />
      {/* noise */}
      <div className="noise pointer-events-none absolute inset-0 opacity-[0.06] mix-blend-overlay" />

      {/* giant parallax watermark of the N mark */}
      <div
        className="pointer-events-none absolute -right-16 top-1/2 hidden -translate-y-1/2 transition-transform duration-300 ease-out lg:block"
        style={{
          transform: `translate(${tilt.x * -22}px, calc(-50% + ${
            tilt.y * -16
          }px)) rotate(-4deg)`,
        }}
      >
        <NetSolMark size={560} markColor="rgba(61,151,222,0.10)" />
      </div>

      {/* floating telemetry chips */}
      <div className="anim-floaty absolute right-10 top-28 hidden rounded-lg border border-white/10 bg-white/[0.04] px-3.5 py-2.5 backdrop-blur-sm xl:block">
        <div className="font-mono text-[10px] uppercase tracking-widest text-white/40">
          auth latency
        </div>
        <div className="font-display text-lg font-semibold text-white">
          38<span className="text-white/50">ms</span>
        </div>
      </div>
      <div
        className="anim-floaty absolute right-24 top-64 hidden rounded-lg border border-white/10 bg-white/[0.04] px-3.5 py-2.5 backdrop-blur-sm xl:block"
        style={{ animationDelay: "1.4s" }}
      >
        <div className="font-mono text-[10px] uppercase tracking-widest text-white/40">
          origination
        </div>
        <div className="font-display text-lg font-semibold text-emerald-300">
          +12.4<span className="text-emerald-300/60">%</span>
        </div>
      </div>

      {/* ---------- content ---------- */}
      <div className="relative z-10 flex items-start justify-between">
        <NetSolLogo size={40} markColor="#3d97de" wordColor="#ffffff" sheen />
        <span className="hidden items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 font-mono text-[10px] uppercase tracking-[0.2em] text-white/55 sm:inline-flex">
          <span className="h-1.5 w-1.5 rounded-full bg-brand-bright" />
          LFAS · v4.2
        </span>
      </div>

      <div className="relative z-10 mt-10 hidden max-w-xl lg:block">
        <div className="rise font-mono text-[11px] uppercase tracking-[0.32em] text-brand-bright">
          // lending &amp; lease finance cloud
        </div>
        <h2
          className="rise mt-5 font-display text-4xl font-bold leading-[1.04] tracking-tight text-white xl:text-5xl"
          style={{ animationDelay: "0.08s" }}
        >
          The control room
          <br />
          for modern{" "}
          <span className="relative whitespace-nowrap text-brand-bright">
            lending
            <svg
              className="absolute -bottom-2 left-0 w-full"
              viewBox="0 0 200 10"
              fill="none"
              preserveAspectRatio="none"
            >
              <path
                d="M2 7 C 50 2, 150 2, 198 6"
                stroke="#3d97de"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
            </svg>
          </span>
          .
        </h2>
        <p
          className="rise mt-6 max-w-md text-[15px] leading-relaxed text-white/60"
          style={{ animationDelay: "0.16s" }}
        >
          Originate, service and audit every lease and loan from a single
          hardened workspace — built for the institutions that move real
          capital.
        </p>
      </div>

      <div className="relative z-10 mt-10 lg:mt-12">
        <div className="grid grid-cols-3 gap-6 border-t border-white/10 pt-6">
          <Stat value={99.99} decimals={2} suffix="%" label="uptime SLA" />
          <Stat value={48} prefix="$" suffix="B" label="assets serviced" />
          <Stat value={120} suffix="+" label="institutions" />
        </div>

        <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 font-mono text-[11px] text-white/50">
          <span className="inline-flex items-center gap-2">
            <span className="anim-pulsering inline-block h-2 w-2 rounded-full bg-emerald-400" />
            <span className="text-emerald-300">All systems operational</span>
          </span>
          <span className="hidden h-3 w-px bg-white/15 sm:inline-block" />
          <span className="uppercase tracking-widest">region · us-east-1</span>
          <span className="hidden h-3 w-px bg-white/15 sm:inline-block" />
          <span className="tabular-nums uppercase tracking-widest">
            {clock} <span className="text-white/30">UTC</span>
          </span>
        </div>
      </div>
    </section>
  );
}
