import { ServiceTier } from "../types/services";

export const SERVICE_TIERS: ServiceTier[] = [
  {
    id: 'production',
    name: 'Music Production',
    description: 'Professional studio services to bring your sound to life with authentic lineage.',
    image: '/Askin Serbetci 02.jpg',
    features: [
      'Sound design',
      'Cinematic production',
      'Multi-instrumentalist tracking',
      'Mixing & Mastering'
    ]
  },
  {
    id: 'composition',
    name: 'Arranging & Composition',
    description: 'Emotional storytelling through melody, orchestration, and Turkish makams.',
    image: '/Askin Serbetci 04.jpg',
    features: [
      'Custom composition',
      'Orchestration',
      'East-West fusion',
      'Film & TV scoring'
    ]
  },
  {
    id: 'recording',
    name: 'Studio Recording',
    description: 'Professional vocal and instrumental capture in a world-class environment.',
    image: '/Askin Serbetci 01.jpg',
    features: [
      'Vocal recording',
      'Session work',
      'Live instrument tracking',
      'Collaboration'
    ]
  }
];
