export function LogoMark({ size = 36 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="SynAck Solutions"
    >
      {/* Upper dark navy ring — left vertex → over top → right vertex */}
      <polygon
        fill="#0A1628"
        points="4,50 27,10 73,10 96,50 72,50 61,31 39,31 28,50"
      />
      {/* Lower blue ring — left vertex → under bottom → right vertex */}
      <polygon
        fill="#2472C8"
        points="4,50 27,90 73,90 96,50 72,50 61,69 39,69 28,50"
      />
      {/* Blue SE arrow (drawn first = behind) */}
      <polygon
        fill="#2472C8"
        points="64,67 63,51 60,54 42,34 34,42 51,63 48,66"
      />
      {/* Dark navy NW arrow (drawn second = in front) */}
      <polygon
        fill="#0A1628"
        points="38,35 54,36 51,39 69,60 61,68 42,48 39,51"
      />
    </svg>
  );
}
