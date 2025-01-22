export interface Produit {
    id: number;
    codePr: number;
    nom: string;
    stockActuel: number;
    seuilMinimal: number;
    prixUnitaire: number;
    prixVente: number;
    image: string;
    fournisseur?: any;  // You can define this based on the `Fournisseur` model you have
    categorieProduit?: any; // Similarly, define this based on the `CategorieProduit` model you have
  }
  