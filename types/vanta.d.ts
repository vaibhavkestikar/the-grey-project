declare module "vanta/dist/vanta.net.min" {
  import type * as THREE from "three";

  interface VantaEffect {
    destroy: () => void;
  }

  interface VantaNetOptions {
    el: HTMLElement | null;
    THREE: typeof THREE;
    mouseControls?: boolean;
    touchControls?: boolean;
    gyroControls?: boolean;
    minHeight?: number;
    minWidth?: number;
    scale?: number;
    scaleMobile?: number;
    color?: number;
    backgroundColor?: number;
    points?: number;
    maxDistance?: number;
    spacing?: number;
    showDots?: boolean;
    speed?: number;
  }

  export default function NET(options: VantaNetOptions): VantaEffect;
}
