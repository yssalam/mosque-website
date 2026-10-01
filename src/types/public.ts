export interface PublicMosque {
  mosqueName: string;
  description: string;
  logoURL: string;
  heroImageURL: string;

  address: string;
  latitude?: number;
  longitude?: number;
  phone: string;
  email: string;
  mapURL: string;

  shortHistory: string;
  vision: string;
  mission: string;
  operationalHours: string;
}
