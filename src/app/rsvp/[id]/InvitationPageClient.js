"use client";

import { useState } from "react";
import Curtain from "./components/Curtain";
import CoverCountdownSection from "./components/CoverCountdownSection";
import { useCountdown } from "./hooks/useCountdown";
import VerseSection from "./components/VerseSection";
import CoupleSection from "./components/CoupleSection";
import SaveTheDateSection from "./components/SaveTheDateSection";
import WeddingEventSection from "./components/WeddingEventSection";
import BarcodeSection from "./components/BarcodeSection";
import GallerySection from "./components/GallerySection";
import WeddingGiftSection from "./components/WeddingGiftSection";
import ClosingSection from "./components/ClosingSection";
import MessageSection from "./components/MessageSection";

export default function InvitationPageClient({ invitation }) {
  const [opened, setOpened] = useState(false);
  const countdown = useCountdown("2025-11-08T00:00:00");

  // Pastikan arrivalTime diformat jadi string jam, bukan Date object
  const formattedArrivalTime = invitation?.arrivalTime
    ? new Date(invitation.arrivalTime)
        .toISOString()
        .slice(11, 16) // ambil jam dan menit "HH:MM"
    : null;

  return (
    <div className="flex flex-col relative min-h-screen">
      <Curtain
        name={invitation?.guestName ?? "Tamu"}
        time={formattedArrivalTime}
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
        <BarcodeSection invitationId={invitation.id} barcode={invitation?.barcode} rsvpStatus={invitation.rsvpStatus} />
        <MessageSection invitationId={invitation.id} />
        <ClosingSection />
      </div>
    </div>
  );
}
