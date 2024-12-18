export interface TProduct {
  id: number;
  title: string;
  price: number;
  price_off: number;
  image: string;
  rating: number;
  reviews: number;
  description: string;
  stock: number;
  available: boolean;
  brand: string;
  material: string;
  features: string[];
  category: string;
}
