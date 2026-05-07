type CrossPatteeProps = {
  className?: string;
  "aria-hidden"?: boolean | "true" | "false";
};

export function CrossPattee({ className, "aria-hidden": ariaHidden }: CrossPatteeProps) {
  return (
    <svg
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
      aria-label={ariaHidden ? undefined : "Cross Pattée"}
      aria-hidden={ariaHidden}
      className={className}
      fill="currentColor"
    >
      <path d="M 42 6 L 58 6 C 56 24, 56 36, 64 38 L 94 42 L 94 58 L 64 62 C 56 64, 56 76, 58 94 L 42 94 C 44 76, 44 64, 36 62 L 6 58 L 6 42 L 36 38 C 44 36, 44 24, 42 6 Z" />
    </svg>
  );
}
