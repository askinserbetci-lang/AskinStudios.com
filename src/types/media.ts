export type MediaType =
  | "photo"
  | "award"
  | "event"
  | "press"
  | "performance"
  | "studio"
  | "portrait"
  | "video";

export interface MediaItem {
  id: string;
  title: string;
  year?: number;
  type: MediaType;
  description: string;
  image: string;
  link?: string;
  highlight?: boolean;
}

export interface AwardItem {
  id: string;
  title: string;
  year: number;
  organization: string;
  description: string;
  image?: string;
  link?: string;
}
