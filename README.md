# Inside an AI Data Center · Interactive 3D Tour

An educational, browser-based 3D walkthrough of a modern AI data center — from cooling towers to NVLink inside a tray. Built for people who know what a GPU is but not how AI factories are wired.

**Chapter 1** tours the physical building (**8 stops**); **Chapter 2** overlays the **“verifiable stack”** (**15 telemetry / audit layers**) — who can see each signal, how it can be spoofed, and how to verify it independently — as **additional tour stops**. Full tour ≈ **23 stops / ~7 minutes**; captions explain each beat.

## What you'll see

### Chapter 1 — The building

1. **Site Overview** — shell, fence, road, transformers, towers  
2. **Power Chain** — substation → diesels → UPS  
3. **Liquid Cooling Loop** — towers → CDU → manifold → cold plate  
4. **Compute Hall** — hot/cold aisles under cable trays  
5. **GB200 NVL72 Rack** — trays + switches in one cabinet  
6. **Compute Tray + NVLink** — 4 GPUs + 2 Grace CPUs meshed  
7. **Scale-out Fabric** — spine–leaf topology  
8. **Storage Tier** — flash tier feeding GPUs  

Animated flows show coolant loops, NVLink packets, east–west fabric traffic, and utility power pulses.

### Chapter 2 — The verifiable stack (tour overlays)

Nine control / telemetry / crypto **layers** surface as HUDs keyed to stops (hardware inventory rows, scheduler queue, billing API logs, GPU util & profiling counters, NVLink & fabric SNMP-style panels, PDU + campus meter readings, cooling sensors, host/process/object/training traces, **attestation** quotes, challenge probes, and satellite/permit-style public anchors).

Tour mode can **auto-open the verification sidebar once** when you first enter Chapter 2; afterward use **Who can see · how to fake · how to verify** near the caption. Switching back to Chapter 1 closes that panel.

## Two modes

- **Tour** — cinematic path with captions, dot rail (with chapter divider after stop 8), `Play / Pause / Prev / Next / Skip`.  
- **Free** — orbit / pan / zoom; click hotspots for module detail panels (Chapter 2 sidecar is tour-only).

## Keyboard shortcuts

| Key | Action |
| --- | --- |
| `Space` | Play / pause tour |
| `←` / `→` | Previous / next stop |
| `F` | Toggle Tour / Free |
| `Esc` | Close detail panel |

## Tech stack

- [Next.js 16](https://nextjs.org/) (App Router)
- [React Three Fiber](https://r3f.docs.pmnd.rs/) + [drei](https://github.com/pmndrs/drei) + [postprocessing](https://github.com/pmndrs/react-postprocessing)
- [Tailwind CSS 4](https://tailwindcss.com/) + [framer-motion](https://www.framer.com/motion/)
- [Zustand](https://github.com/pmndrs/zustand) for app state
- Procedural geometry only — no bundled GLTFs

## Getting started

```bash
npm install
npm run dev
# open http://localhost:3000
```

Production:

```bash
npm run build
npm run start
```

## Project structure

```
src/
  app/
  components/
    scene/
      Scene.tsx              # <Canvas>, lighting, Bloom
      DataCenter.tsx         # Physical modules + LayerOverlays
      CameraRig.tsx
      modules/               # SiteShell, PowerYard, NetworkFabric, …
      flows/                  # CoolantFlow, PacketFlow, PowerPulse, PowerFeedAmbient, DataPathFlows
      layers/                 # Telemetry HUDs per Chapter 2 stop (Html + light 3D)
    ui/
  lib/
    store.ts                  # Mode, tour, layer panel visibility
    tour.ts                   # 23 cinematic stops (kind: module | layer)
    modules.ts / layers.ts / stops.ts / layerAnchors.ts
    palette.ts · types.ts · …
```

## Color encoding

| Color | Meaning |
| --- | --- |
| Red `#ff4d4f` | Compute / GPU |
| Cyan `#22d3ee` | Cooling |
| Amber `#f59e0b` | Power |
| Purple `#a855f7` | NVLink scale-up |
| Emerald `#10b981` | Scale-out fabric |
| Blue `#3b82f6` | Storage |
| Yellow `#facc15` | Verification / audit UI accents |
| Grey | Shell / neutral |

## Accessibility

- Respects `prefers-reduced-motion`
- Buttons have `aria-label`s where needed
- Captions and detail copy are DOM text

## Roadmap

- Voice-over synced to captions
- Detail mini-scenes (e.g. single die zoom)
- Selective bloom per layer/material
- Optional live telemetry hooks replacing mock counters
