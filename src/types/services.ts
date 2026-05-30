export interface ServiceTier {
  id: string;
  name: string;
  description: string;
  features: string[];
  price?: string;
  image?: string;
}
