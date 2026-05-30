export interface LegacyEra {
  id: string;
  name: string;
  startYear?: number;
  endYear?: number;
  description?: string;
}

export interface LegacyEvent {
  id: string;
  year: number;
  title: string;
  description: string;
  eraId?: string;
  location?: string;
  image?: string;
  link?: string;
}
