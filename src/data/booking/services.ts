import { BookingService } from "../../types/booking";

export const bookingServices: BookingService[] = [
  {
    id: "live-performance",
    name: "Live Performance",
    description: "Concerts, festivals, cultural events, and special performances featuring Turkish world‑music fusion.",
    startingPrice: "Contact for quote",
    durationHint: "Typically 60–90 minutes"
  },
  {
    id: "studio-production",
    name: "Studio Production & Arranging",
    description: "Custom compositions, arrangements, and production for artists, film, TV, and media.",
    startingPrice: "Project‑based",
    durationHint: "Scope‑dependent"
  },
  {
    id: "workshops-masterclasses",
    name: "Workshops & Masterclasses",
    description: "Educational sessions on Turkish music, world‑music fusion, and cinematic composition.",
    startingPrice: "Contact for quote",
    durationHint: "Typically 60–120 minutes"
  }
];
