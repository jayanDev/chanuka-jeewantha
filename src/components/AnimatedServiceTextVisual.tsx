type AnimatedServiceTextVisualProps = {
  label: string;
  className?: string;
  variant?: "default" | "dark";
};

const repeatedItems = Array.from({ length: 8 });
const rows = Array.from({ length: 4 });

export default function AnimatedServiceTextVisual({
  label,
  className = "",
  variant = "default",
}: AnimatedServiceTextVisualProps) {
  const isDark = variant === "dark";
  const frameClasses = isDark
    ? "border-white/15 bg-foreground text-white"
    : "border-zinc-200 bg-[#f4fbf0] text-foreground";
  const trackClasses = isDark ? "text-white/14" : "text-brand-dark/16";
  const mainClasses = isDark
    ? "text-white drop-shadow-[0_10px_28px_rgba(0,0,0,0.32)]"
    : "text-foreground";
  const panelClasses = isDark
    ? "bg-[linear-gradient(135deg,rgba(138,200,38,0.24),rgba(255,255,255,0.08),rgba(37,99,235,0.18))]"
    : "bg-[linear-gradient(135deg,rgba(138,200,38,0.22),rgba(255,255,255,0.72),rgba(245,158,11,0.16))]";

  return (
    <div
      className={`relative isolate flex min-h-[190px] w-full overflow-hidden rounded-[15px] border ${frameClasses} ${className}`}
      aria-label={label}
    >
      <div className={`absolute inset-0 ${panelClasses}`} aria-hidden="true" />
      <div className="absolute inset-0 opacity-70 [background-image:linear-gradient(rgba(15,23,42,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(15,23,42,0.08)_1px,transparent_1px)] [background-size:42px_42px]" aria-hidden="true" />
      <div className="absolute inset-0 flex -rotate-3 flex-col justify-center gap-5 opacity-100" aria-hidden="true">
        {rows.map((_, rowIndex) => (
          <div
            key={rowIndex}
            className={`flex min-w-max gap-7 whitespace-nowrap text-[28px] font-black uppercase leading-none tracking-[0.18em] ${
              rowIndex % 2 === 0 ? "service-text-track" : "service-text-track-reverse"
            } ${trackClasses}`}
            style={{ animationDuration: `${22 + rowIndex * 4}s` }}
          >
            {repeatedItems.map((__, itemIndex) => (
              <span key={`${rowIndex}-${itemIndex}`}>{label}</span>
            ))}
          </div>
        ))}
      </div>
      <div className="relative z-10 flex min-h-full w-full items-center justify-center px-5 py-8 text-center">
        <p className={`service-text-float max-w-[92%] text-balance text-[clamp(1.5rem,4vw,2.85rem)] font-black uppercase leading-[1.05] ${mainClasses}`}>
          {label}
        </p>
      </div>
    </div>
  );
}
