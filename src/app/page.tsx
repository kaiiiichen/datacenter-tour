"use client";

import dynamic from "next/dynamic";
import { TopBar } from "@/components/ui/TopBar";
import { Caption } from "@/components/ui/Caption";
import { TourControls } from "@/components/ui/TourControls";
import { DetailPanel } from "@/components/ui/DetailPanel";
import { IntroOverlay } from "@/components/ui/IntroOverlay";
import { FreeModeHint } from "@/components/ui/FreeModeHint";
import { Keyboard } from "@/components/ui/Keyboard";
import { CanvasLoading } from "@/components/ui/CanvasLoading";
import { LocaleHydration } from "@/components/ui/LocaleHydration";

const Scene = dynamic(
  () => import("@/components/scene/Scene").then((m) => m.Scene),
  {
    ssr: false,
    loading: () => <CanvasLoading />,
  },
);

export default function Home() {
  return (
    <main className="relative h-screen w-screen overflow-hidden bg-[#07090d] text-white">
      <LocaleHydration />
      <Scene />

      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0)_55%,rgba(0,0,0,0.45)_100%)]" />

      <TopBar />
      <Caption />
      <TourControls />
      <FreeModeHint />
      <DetailPanel />
      <IntroOverlay />
      <Keyboard />
    </main>
  );
}
