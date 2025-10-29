"use client";

import { useState } from "react";
import Curtain from "./rsvp/[id]/components/Curtain";
import CoverCountdownSection from "./rsvp/[id]/components/CoverCountdownSection";
import { useCountdown } from "./rsvp/[id]/hooks/useCountdown";
import VerseSection from "./rsvp/[id]/components/VerseSection"; 
import CoupleSection from "./rsvp/[id]/components/CoupleSection"; 
import SaveTheDateSection from "./rsvp/[id]/components/SaveTheDateSection"; 
import WeddingEventSection from "./rsvp/[id]/components/WeddingEventSection"; 
import GallerySection from "./rsvp/[id]/components/GallerySection"; 
import WeddingGiftSection from "./rsvp/[id]/components/WeddingGiftSection";
import ClosingSection from "./rsvp/[id]/components/ClosingSection";
import HomeMessageSection from "./HomeMessageSection";

export default function HomePageClient() {
  const [opened, setOpened] = useState(false);
  const countdown = useCountdown("2025-11-08T00:00:00");

  return (
    <div className="flex flex-col relative min-h-screen">
      <Curtain
        name="Bapak/Ibu/Saudara/i"
        time="16:00"
        opened={opened}
        onOpen={() => setOpened(true)}
      />

      <div
        className={`${
          !opened ? "overflow-hidden min-h-screen" : ""
        } flex flex-col`}
      >
        <CoverCountdownSection countdown={countdown} opened={opened} />
        <VerseSection />
        {/* <CoupleSection /> */}
        <SaveTheDateSection countdown={countdown} />
        <WeddingEventSection />
        <GallerySection />
        <WeddingGiftSection />
        <HomeMessageSection />
        <ClosingSection />
      </div>
    </div>
  );
}
