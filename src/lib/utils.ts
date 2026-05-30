import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export interface ServiceTier {
  id: string;
  name: string;
  description: string;
  features: string[];
  price?: string;
}

export interface Credit {
  role: string;
  name: string;
}

export interface Collaborator {
  name: string;
  role: string;
  image?: string;
}
