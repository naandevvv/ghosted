"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "@/components/ui";

type Etoile = {
  x: number;
  y: number;
  z: number; // profondeur 0.3..1 (parallaxe + vitesse de scintillement)
  r: number;
  phase: number;
  teinte: number; // 0 = blanc, 1 = doré
};

type Comete = { x: number; y: number; vx: number; vy: number; vie: number };

export function CielEtoile() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let largeur = 0;
    let hauteur = 0;
    let etoiles: Etoile[] = [];
    let comete: Comete | null = null;
    let prochaineComete = performance.now() + 3500 + Math.random() * 5000;
    let raf = 0;

    const semer = () => {
      const nombre = Math.min(220, Math.floor((largeur * hauteur) / 5500));
      etoiles = Array.from({ length: nombre }, () => ({
        x: Math.random() * largeur,
        y: Math.random() * hauteur,
        z: 0.3 + Math.random() * 0.7,
        r: 0.4 + Math.random() * 1.3,
        phase: Math.random() * Math.PI * 2,
        teinte: Math.random(),
      }));
    };

    const dessiner = (t: number) => {
      ctx.clearRect(0, 0, largeur, hauteur);
      for (const e of etoiles) {
        const scintillement = reduced
          ? 0.75
          : 0.45 + 0.55 * (0.5 + 0.5 * Math.sin(e.phase + t * 0.0012 * (0.4 + e.z)));
        ctx.globalAlpha = scintillement * (0.35 + 0.65 * e.z);
        ctx.fillStyle = e.teinte > 0.8 ? "#ffd88a" : e.teinte > 0.6 ? "#ffc9d8" : "#ffffff";
        ctx.beginPath();
        ctx.arc(e.x, e.y, e.r * e.z, 0, Math.PI * 2);
        ctx.fill();
        if (!reduced) {
          e.x += 0.012 * e.z;
          if (e.x > largeur + 2) e.x = -2;
        }
      }

      if (!reduced) {
        if (!comete && t > prochaineComete) {
          const departX = largeur * (0.2 + Math.random() * 0.7);
          comete = {
            x: departX,
            y: hauteur * (0.05 + Math.random() * 0.25),
            vx: -(3.5 + Math.random() * 2.5),
            vy: 1.6 + Math.random() * 1.2,
            vie: 1,
          };
        }
        if (comete) {
          const c = comete;
          ctx.globalAlpha = Math.min(1, c.vie * 1.4);
          const queue = ctx.createLinearGradient(c.x, c.y, c.x - c.vx * 14, c.y - c.vy * 14);
          queue.addColorStop(0, "rgba(255,255,255,0.95)");
          queue.addColorStop(1, "rgba(255,255,255,0)");
          ctx.strokeStyle = queue;
          ctx.lineWidth = 1.6;
          ctx.beginPath();
          ctx.moveTo(c.x, c.y);
          ctx.lineTo(c.x - c.vx * 14, c.y - c.vy * 14);
          ctx.stroke();
          c.x += c.vx;
          c.y += c.vy;
          c.vie -= 0.016;
          if (c.vie <= 0 || c.x < -60 || c.y > hauteur + 60) {
            comete = null;
            prochaineComete = t + 5000 + Math.random() * 9000;
          }
        }
      }
      ctx.globalAlpha = 1;
    };

    const redimensionner = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      largeur = canvas.clientWidth;
      hauteur = canvas.clientHeight;
      canvas.width = largeur * dpr;
      canvas.height = hauteur * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      semer();
      if (reduced) dessiner(0);
    };

    redimensionner();
    window.addEventListener("resize", redimensionner);

    if (!reduced) {
      const boucle = (t: number) => {
        dessiner(t);
        raf = requestAnimationFrame(boucle);
      };
      raf = requestAnimationFrame(boucle);
    }

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", redimensionner);
    };
  }, [reduced]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none absolute inset-0 h-full w-full"
    />
  );
}
