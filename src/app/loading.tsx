export default function Loading() {
  return (
    <div className="fixed inset-0 z-[999] bg-foreground text-background grid place-items-center overflow-hidden">
      <div className="absolute w-[40vw] h-[40vw] max-w-[360px] max-h-[360px] rounded-full bg-brand-main/20 blur-3xl animate-float" />

      <div className="relative z-10 flex flex-col items-center gap-6 px-6">
        <div className="relative w-[112px] h-[112px]">
          <div className="absolute inset-0 rounded-full border border-white/20" />
          <div className="absolute inset-0 rounded-full border-t-2 border-brand-main animate-spin" />
          <div className="absolute inset-3 rounded-full border-r-2 border-brand-light animate-[spin_1.6s_linear_infinite_reverse]" />
          <div className="absolute inset-0 grid place-items-center">
            <span className="text-2xl font-plus-jakarta font-bold tracking-wide text-brand-main">
              CJ
            </span>
          </div>
        </div>

        <div className="text-center">
          <p className="text-white font-plus-jakarta font-semibold tracking-wide text-lg">
            Chanuka Jeewantha
          </p>
          <p className="text-white/80 font-poppins text-sm mt-1">
            Loading your career experience...
          </p>
          <div className="mt-2 flex items-center justify-center gap-2">
            <span className="loader-dot dot-delay-0 w-1.5 h-1.5 rounded-full bg-brand-main" />
            <span className="loader-dot dot-delay-1 w-1.5 h-1.5 rounded-full bg-brand-light" />
            <span className="loader-dot dot-delay-2 w-1.5 h-1.5 rounded-full bg-brand-main" />
          </div>
          <div className="mt-3 h-[3px] w-[220px] bg-white/15 rounded-full overflow-hidden">
            <span className="block h-full w-[45%] bg-brand-main rounded-full loader-sweep" />
          </div>
        </div>
      </div>
    </div>
  );
}
