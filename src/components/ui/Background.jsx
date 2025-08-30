import React from "react";

const Background = () => (
  <div aria-hidden className="pointer-events-none fixed inset-0 -z-10">
    <div className="absolute inset-0 bg-[radial-gradient(1000px_500px_at_20%_-10%,rgba(139,92,246,0.25),transparent),radial-gradient(800px_400px_at_80%_110%,rgba(34,211,238,0.18),transparent)]" />
    <div
      className="absolute inset-0 opacity-[0.15]"
      style={{
        backgroundImage: "url('https://grainy-gradients.vercel.app/noise.svg')",
      }}
    />
  </div>
);

export default Background;
