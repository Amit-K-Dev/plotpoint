"use client";

export function LoadingPulse({ message }) {
  return (
    <div
      className="flex flex-col items-center justify-center gap-5"
      style={{
        minHeight: "60vh",
      }}
    >
      <div
        className="relative w-16 h-16"
        style={{
          position: "relative",
          width: 64,
          height: 64,
        }}
      >
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              inset: i * 8,
              border: `2px solid rgba(240,192,64,${
                0.6 - i * 0.15
              })`,
              borderRadius: "50%",
              animation: `rp 1.8s ease-in-out ${
                i * 0.3
              }s infinite`,
            }}
          />
        ))}

        <div
          style={{
            position: "absolute",
            inset: 22,
            background: "#f0c040",
            borderRadius: "50%",
            animation:
              "rp 1.8s ease-in-out infinite",
          }}
        />
      </div>

      <p
        style={{
          color: "rgba(255,255,255,0.5)",
          fontFamily: "'DM Sans',sans-serif",
          fontSize: 13,
          margin: 0,
        }}
      >
        {message}
      </p>

      <style>{`
        @keyframes rp {
          0%,100% {
            opacity: .4;
            transform: scale(.95);
          }

          50% {
            opacity: 1;
            transform: scale(1.05);
          }
        }
      `}</style>
    </div>
  );
}