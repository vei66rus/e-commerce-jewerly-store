export interface Product {
  id: number;
  documentId: string;
  title: string;
  price: number;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  image: string;
  discountPercent: number;
  description: string;
  additionalImages: {
    additionalImages: [
      {
        imageURL1: string;
        imageURL2: string;
        imageURL3: string;
        imageURL4: string;
      },
    ];
  };
  isFavorite: null;
  SKU: number;
  weight: number;
  dimensions: string;
  color: string;
  material: string;
  itemsInStock: number;
}
