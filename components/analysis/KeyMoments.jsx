"use client";

export function KeyMoments({ moments }) {
  if (!moments?.length) return null;

  return (
    <div
      style={{
        background: "rgba(255,255,255,0.04)",
        border: "1px solid rgba(255,255,255,0.09)",
        borderRadius: 14,
        padding: "16px",
        marginBottom: 12,
      }}
    >
      <div
        style={{
          fontSize: 11,
          letterSpacing: 3,
          color: "rgba(240,192,64,0.8)",
          textTransform: "uppercase",
          marginBottom: 14,
        }}
      >
        ⏱️ Key Moments
      </div>

      {moments.map((m, i) => (
        <div
          key={i}
          className="flex gap-3"
          style={{
            marginBottom:
              i < moments.length - 1 ? 13 : 0,
            alignItems: "flex-start",
          }}
        >
          <div
            style={{
              background:
                "rgba(240,192,64,0.13)",
              border:
                "1px solid rgba(240,192,64,0.28)",
              borderRadius: 6,
              padding: "3px 8px",
              fontSize: 11,
              color: "#f0c040",
              fontFamily:
                "'Bebas Neue',sans-serif",
              letterSpacing: 1,
              flexShrink: 0,
              whiteSpace: "nowrap",
            }}
          >
            {m.timestamp}
          </div>

          <div>
            <div
              style={{
                fontSize: 13,
                color:
                  "rgba(255,255,255,0.82)",
                fontWeight: 500,
                marginBottom: 2,
                fontFamily:
                  "'DM Sans',sans-serif",
              }}
            >
              {m.description}
            </div>

            <div
              style={{
                fontSize: 12,
                color:
                  "rgba(255,255,255,0.38)",
                fontFamily:
                  "'DM Sans',sans-serif",
                fontStyle: "italic",
              }}
            >
              {m.significance}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}