//lo que devuelve el servidor
export interface Product {
  id: string;
  deleted_at?: Date;
  brand?: string;
  categoryId: string;
  cost: number;
  created_at: string;
  description?: string;
  endDate?: string;
  isOfferActive: boolean;
  nameProd: string;
  price: number;
  proceOffer?: number;
  sku?: string;
  slug?: string;
  updated_at: string;
  startDate?: string;
  product_images?: ProductImage[];
}

export interface ProductImage {
  id: string;
  product_id: string;
  image_url: string;
  position: number;
  created_at?: string;
  updated_at?: string;
}

//super type para el formulario
export interface ProductType {
  sku?: string;
  nameProd: string;
  slug?: string;
  price: number;
  cost: number;
  description: string;
  brand?: string;
  categoryId: string;

  // superset de ambos schemas
  images?: FileList | null;
  imageExisting?: string[];
  imageToDelete?: string[];
}

// Este es el tipo que usaremos para pasar los datos YA LIMPIOS al servicio.
export type ProductSupT = Omit<ProductType, "images"> & {
  images: File[]; // <--- Sobreescribimos FileList a File[]
};
