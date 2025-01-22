import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ProduitService } from 'src/app/Services/product.service';
import { Produit } from 'src/models/produit';

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.css']
})
export class UpdateProductComponent implements OnInit {
  produitForm: FormGroup;
  produitId: number = 1;  // example ID for the product to update

 constructor(private produitService: ProduitService, private fb: FormBuilder) {
    this.produitForm = this.fb.group({
      nom: [''],
      stockActuel: [''],
      seuilMinimal: [''],
      prixUnitaire: [''],
      prixVente: [''],
      fournisseurId: [''],
      categorieProduitId: [''],
      imageFile: ['']
    });
  }
  ngOnInit(): void {
  }

  updateProduct() {
    const formData = new FormData();
    formData.append('nom', this.produitForm.get('nom')?.value);
    formData.append('stockActuel', this.produitForm.get('stockActuel')?.value);
    formData.append('seuilMinimal', this.produitForm.get('seuilMinimal')?.value);
    formData.append('prixUnitaire', this.produitForm.get('prixUnitaire')?.value);
    formData.append('prixVente', this.produitForm.get('prixVente')?.value);
    formData.append('fournisseurId', this.produitForm.get('fournisseurId')?.value);
    formData.append('categorieProduitId', this.produitForm.get('categorieProduitId')?.value);
    
    // Check if an image file is selected
    const imageFile = this.produitForm.get('imageFile')?.value;
    if (imageFile) {
      formData.append('imageFile', imageFile, imageFile.name);
    }

    // Call the service to update the product
    this.produitService.updateProduit(this.produitId, formData).subscribe(
      (response: Produit) => {
        console.log('Product updated successfully', response);
      },
      (error) => {
        console.error('Error updating product', error);
      }
    );
  }
}
