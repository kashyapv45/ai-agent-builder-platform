"use client";

import { useEffect, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";

export default function ParticlesBackground() {
  const [init, setInit] = useState(false);

  // Initialize the engine once
  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  // Define your particle behavior here
  const option = {
  autoPlay: true,
  background: {
    color: { value: "#ffffff" }, // Note: Background is white
  },
  fpsLimit: 120,
  interactivity: {
    detectsOn: "window" as const,
    events: {
      onClick: { enable: true, mode: "push" },
      onHover: { 
        enable: true, 
        mode: "grab" as const,
        parallax: { enable: true, force: 100, smooth: 10 }
      },
      resize: { enable: true, delay: 0.5 }
    },
    modes: {
      push: { quantity: 4 },
      trail: { delay: 1, quantity: 1 }
    }
  },
  particles: {
    color: { value: "#000000" },
    links: {
      color: "#000000",
      distance: 150,
      enable: true,
      opacity: 0.4,
      width: 1,
    },
    move: {
      direction: "none" as const,
      enable: true,
      outModes: { default: "out" } as const,
      speed: 0.5,
    },
    number: {
      density: { enable: true, width: 1920, height: 1080 },
      value: 200,
    },
    opacity: {
      value: { min: 0.1, max: 0.5 },
      animation: { enable: true, speed: 3, sync: false }
    },
    shape: {
      type: "square" as const,
    },
    size: {
      value: { min: 1, max: 10 },
      animation: { enable: true, speed: 10, sync: false }
    },
  },
  detectRetina: true,
  pauseOnBlur: true,
  pauseOnOutsideViewport: true,
};
  if (!init) return null;

  return (
    <div style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", zIndex: -1 }}>
      <Particles id="tsparticles" options={option} />
    </div>
  );
}