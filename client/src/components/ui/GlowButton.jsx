const GlowButton = ({
  label,
  color = "#fbbf24", // default amber
  onClick,
  disabled = false
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{
        "--glow-color": color
      }}
      className={`
        relative w-full py-3 font-bold uppercase tracking-wider
        rounded-md
        transition-all duration-200
        overflow-hidden

        bg-[var(--glow-color)]
        text-black
        shadow-[0_0_20px_var(--glow-color)]
        hover:shadow-[0_0_35px_var(--glow-color)]
        hover:scale-[1.03]
        active:scale-95

        disabled:opacity-50
        disabled:cursor-not-allowed
        disabled:hover:scale-100
        disabled:hover:shadow-none
      `}
    >
      {/* light sweep */}
      {!disabled && (
        <span
          className="
            pointer-events-none absolute inset-0
            bg-gradient-to-r from-transparent via-white/40 to-transparent
            translate-x-[-100%]
            hover:translate-x-[100%]
            transition-transform duration-700
          "
        />
      )}

      <span className="relative z-10">{label}</span>
    </button>
  );
};

export default GlowButton;
