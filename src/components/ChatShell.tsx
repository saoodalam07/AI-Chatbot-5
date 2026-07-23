import NetSolLogo from "./NetSolLogo";

/**
 * Placeholder for "your running chatbot" UI. In your real app, delete this
 * file and render your actual chatbot component here instead — the only
 * contract you need is: mount it once `LoginCard`'s onAuthenticated fires.
 */
export default function ChatShell({ onSignOut }: { onSignOut: () => void }) {
  return (
    <div className="fade flex min-h-screen flex-col bg-mist">
      <header className="flex items-center justify-between border-b border-slate-200 bg-white px-6 py-3.5">
        <NetSolLogo size={30} markColor="#1b75bc" />
        <button
          onClick={onSignOut}
          className="rounded-lg border border-slate-200 px-3 py-1.5 text-[13px] font-medium text-slate-600 transition-colors hover:border-slate-300 hover:bg-slate-50"
        >
          Sign out
        </button>
      </header>
      <main className="flex flex-1 items-center justify-center p-8 text-center">
        <div>
          <h1 className="font-display text-2xl font-bold text-ink">
            You're in 🎉
          </h1>
          <p className="mt-2 max-w-sm text-slate-500">
            Swap this component out for your real chatbot UI — mount it right
            where <code className="rounded bg-slate-100 px-1.5 py-0.5">ChatShell</code>{" "}
            is used in <code className="rounded bg-slate-100 px-1.5 py-0.5">App.tsx</code>.
          </p>
        </div>
      </main>
    </div>
  );
}
