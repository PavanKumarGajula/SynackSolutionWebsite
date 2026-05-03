interface EyebrowProps {
  children: React.ReactNode;
  dark?: boolean;
  className?: string;
}

export default function Eyebrow({ children, dark = false, className = "" }: EyebrowProps) {
  return (
    <p
      className={`flex items-center gap-2.5 text-eyebrow font-bold uppercase mb-3.5 ${
        dark ? "text-accent" : "text-accent"
      } ${className}`}
    >
      <span className={`inline-block w-4 h-0.5 rounded-full ${dark ? "bg-accent" : "bg-accent"} flex-shrink-0`} />
      {children}
    </p>
  );
}
