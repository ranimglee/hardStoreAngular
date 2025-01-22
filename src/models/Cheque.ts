import { Fournisseur } from './fournisseur'; // Import the Fournisseur type

export enum Status {
  Pending = 'Pending',
  Paid = 'Paid',
  Cancelled = 'Cancelled'
}

export interface Cheque {
  id: number;
  numeroCheque: string;
  montant: number;
  dateEmission: Date;
  dateEncaissement: Date;
  status: Status;
  fournisseur: Fournisseur; // Make sure fournisseur is properly typed
}
