type LogoProps = {
  /** pixel size of the square "N" mark */
  size?: number;
  /** color of the N mark */
  markColor?: string;
  /** show the NETSOL wordmark next to / below the mark */
  wordmark?: boolean;
  /** color of the wordmark text */
  wordColor?: string;
  /** layout of mark + wordmark */
  layout?: "horizontal" | "stacked";
  className?: string;
  /** apply a subtle animated sheen over the mark */
  sheen?: boolean;
};

/**
 * Hand-rebuilt approximation of the NETSOL "N" mark:
 * a thick diagonal band with rounded inner corners plus two
 * corner triangles whose hypotenuses curve inward.
 */
export function NetSolMark({
  size = 40,
  markColor = "currentColor",
  sheen = false,
  className = "",
}: {
  size?: number;
  markColor?: string;
  sheen?: boolean;
  className?: string;
}) {
  return (
    <span
      className={`relative inline-flex ${className}`}
      style={{ width: size, height: size }}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 100 100"
        width={size}
        height={size}
        fill={markColor}
        role="img"
      >
        <path d="M0 0 L94 64 Q100 68 100 76 L100 100 L6 36 Q0 32 0 24 Z" />
        <path d="M68 0 L100 0 L100 32 Q84 18 68 0 Z" />
        <path d="M0 68 Q16 82 32 100 L0 100 Z" />
      </svg>
      {sheen && (
        <span className="sheen-mask rounded-[2px]">
          <span
            className="absolute inset-0"
            style={{ mixBlendMode: "overlay" }}
          />
        </span>
      )}
    </span>
  );
}

export default function NetSolLogo({
  size = 38,
  markColor = "#1b75bc",
  wordmark = true,
  wordColor = "currentColor",
  layout = "horizontal",
  className = "",
  sheen = false,
}: LogoProps) {
  const word = (
    <span
      className="font-display font-bold uppercase leading-none"
      style={{
        color: wordColor,
        letterSpacing: "-0.03em",
        fontSize: size * 0.62,
      }}
    >
      Netsol
      <sup
        style={{ fontSize: size * 0.18, marginLeft: size * 0.04, top: "-0.7em" }}
        className="relative font-sans font-semibold"
      >
        ®
      </sup>
    </span>
  );

  if (!wordmark) {
    return (
      <NetSolMark
        size={size}
        markColor={markColor}
        sheen={sheen}
        className={className}
      />
    );
  }

  const stacked = layout === "stacked";
  return (
    <span
      className={`inline-flex items-center ${
        stacked ? "flex-col items-start gap-2" : "gap-3"
      } ${className}`}
    >
      <NetSolMark size={size} markColor={markColor} sheen={sheen} />
      {word}
    </span>
  );
}
