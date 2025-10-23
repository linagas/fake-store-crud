export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
}

export type ProductModalMode = 'create' | 'edit';

export interface ProductModalData {
  mode: ProductModalMode;
  product?: Product;
}
