import { Cheque } from "./Cheque";
import { Produit } from "./produit";

export interface Fournisseur {
  id: number;
  nom: string;
  telephone: string;
  adresse: string;
  produits: Produit[];  
  cheques?: Cheque[]; // Adjust if a list of cheques is relevant
  }
