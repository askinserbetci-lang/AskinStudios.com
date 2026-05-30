export interface PressItem {
  slug: string;
  title: string;
  year: number;
  type: "award" | "nomination" | "press" | "feature" | "interview";
  image: string;
  description: string;
  link?: string;
}
