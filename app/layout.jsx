
import "./globals.css";

export const metadata = {
  title: "PlotPoint — Deep Film Intelligence",
  description: "AI-powered movie trailer analysis: score, hype, emotion arc, easter eggs, fan theories & more.",
  keywords: ["movie trailer", "film analysis", "AI", "fan theories", "cinema"],
  openGraph: {
    title: "PlotPoint",
    description: "Decode any movie trailer with deep AI analysis.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:ital,wght@0,300;0,400;0,500;1,300&display=swap" rel="stylesheet" />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
