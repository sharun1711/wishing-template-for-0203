import React from "react";

export default function Particles({ count = 34 }) {
  return <div className="particle-field" aria-hidden="true">
    {Array.from({ length: count }, (_, i) => <i key={i} style={{
      "--x": `${(i * 37) % 100}%`,
      "--delay": `${(i % 11) * -1.3}s`,
      "--duration": `${9 + (i % 8)}s`,
      "--size": `${2 + (i % 3)}px`
    }} />)}
  </div>;
}
