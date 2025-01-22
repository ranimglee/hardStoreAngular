import { Produit } from "./produit";

export interface CategorieProduit {
    id: number;               // The unique identifier of the category
    nom: string;              // The name of the category
    description: string;      // The description of the category
    image: string;            // The image URL or path for the category image
    products: Produit[];      // A list of products associated with the category
  }