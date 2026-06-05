/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useState } from 'react';

interface Particle {
  id: number;
  size: number;
  x: number;
  y: number;
  delay: number;
  duration: number;
  opacity: number;
}

export default function EmberEffect() {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    const numParticles = 24;
    const initialParticles: Particle[] = Array.from({ length: numParticles }).map((_, i) => ({
      id: i,
      size: Math.random() * 4 + 2, // 2px to 6px
      x: Math.random() * 100, // 0 to 100%
      y: Math.random() * 100, // 0 to 100%
      delay: Math.random() * -10, // Start offset
      duration: Math.random() * 8 + 12, // 12s to 20s
      opacity: Math.random() * 0.4 + 0.1,
    }));
    setParticles(initialParticles);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {particles.map((p) => (
        <div
          key={p.id}
          className="ember absolute rounded-full bg-[#d4af37] filter blur-[1px]"
          style={{
            width: `${p.size}px`,
            height: `${p.size}px`,
            left: `${p.x}%`,
            top: `${p.y}%`,
            opacity: p.opacity,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
          }}
        />
      ))}
    </div>
  );
}
