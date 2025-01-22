import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CategoriProduitService } from 'src/app/Services/categori-produit.service';
import { ProduitService } from 'src/app/Services/product.service';
import { SupplierService } from 'src/app/Services/supplier.service';
import { CategorieProduit } from 'src/models/CategorieProduit';
import { Fournisseur } from 'src/models/fournisseur';
import Swal from 'sweetalert2';
import { GetProductComponent } from '../../Product/get-product/get-product.component';
import { GetSupplierComponent } from '../get-supplier/get-supplier.component';

@Component({
  selector: 'app-add-supplier',
  templateUrl: './add-supplier.component.html',
  styleUrls: ['./add-supplier.component.css']
})
export class AddSupplierComponent implements OnInit {

  supplierForm: FormGroup;
  @Output() close = new EventEmitter<void>();

  constructor(
    private formBuilder: FormBuilder,
    private modalService: NgbModal,
    private getSupplierComponent: GetSupplierComponent,
    private supplierService: SupplierService
  ) {
    this.supplierForm = this.formBuilder.group({
      nom: ['', Validators.required],
      telephone: ['', [Validators.required]],
      adresse: ['', [Validators.required]]
      
    });
  }

  ngOnInit(): void {
   
  }
  
 
  addSupplier(): void {
    if (this.supplierForm.valid ) {
      const formData = new FormData();
      
      // Use safe access for form values
      const nom = this.supplierForm.get('nom')?.value;
      const telephone = this.supplierForm.get('telephone')?.value;
      const adresse = this.supplierForm.get('adresse')?.value;
     
  
      if (nom && telephone && adresse ) {
        formData.append('nom', nom);
        formData.append('telephone', telephone);
        formData.append('adresse', adresse);
        
  
        
    
        // Log form values to inspect before appending to FormData
        console.log('Form Values:', this.supplierForm.value);
    
        // Call the service to add the product
        this.supplierService.addFournisseur(formData).subscribe(() => {
          Swal.fire('Success!', 'Supplier added successfully!', 'success');
          this.supplierForm.reset();
          this.close.emit();
          this.getSupplierComponent.loadSuppliers();
        }, error => {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'An error occurred while adding the supplier.',
            footer: '<a href="#">Why this error?</a>'
          });
          console.error('Error adding product:', error);
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Please fill in all the required fields correctly ',
          footer: '<a href="#">Why this error?</a>'
        });
  
        // Log which fields are invalid
        Object.keys(this.supplierForm.controls).forEach(key => {
          if (this.supplierForm.get(key)?.invalid) {
            console.log(`${key} is invalid.`);
          }
        });
      }
    }
  }
  
 // Close the modal
 onClose(): void {
  this.close.emit();
}

cancelEdit(): void {
  this.supplierForm.reset();
}

goBack(): void {
  window.history.back();
}

}
