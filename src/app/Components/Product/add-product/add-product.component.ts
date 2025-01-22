import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ProduitService } from 'src/app/Services/product.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import { GetProductComponent } from '../get-product/get-product.component';
import { CategorieProduit } from 'src/models/CategorieProduit';
import { CategoriProduitService } from 'src/app/Services/categori-produit.service';
import { Fournisseur } from 'src/models/fournisseur';
import { SupplierService } from 'src/app/Services/supplier.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

  productForm: FormGroup;
  selectedFile: File | null = null;
  imageUrl: string | ArrayBuffer | null = null;
  @Output() close = new EventEmitter<void>();
  categorieOptions: CategorieProduit[] = [];
  fournisseurOptions: Fournisseur[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private productService: ProduitService,
    private modalService: NgbModal,
    private getProductComponent: GetProductComponent,
    private categorieProduitService: CategoriProduitService,
    private supplierService: SupplierService
  ) {
    this.productForm = this.formBuilder.group({
      nom: ['', Validators.required],
      prixUnitaire: ['', [Validators.required, Validators.min(0)]],
      prixVente: ['', [Validators.required, Validators.min(0)]],
      stockActuel: ['', [Validators.required, Validators.min(0)]],
      seuilMinimal: ['', [Validators.required, Validators.min(0)]],
      imageFile: ['', Validators.required], // Corrected image file validation
      fournisseur: ['', Validators.required],
      categorieProduit: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    // Fetch categories and suppliers
    this.categorieProduitService.getAllCategories().subscribe(
      (categories: CategorieProduit[]) => {
        this.categorieOptions = categories; // Assign fetched categories
      },
      (error) => {
        console.error('Error fetching categories:', error);
      }
    );
  
    this.supplierService.getAllFournisseurs().subscribe(
      (fournisseur: Fournisseur[]) => {
        this.fournisseurOptions = fournisseur; // Assign fetched suppliers
      },
      (error) => {
        console.error('Error fetching suppliers:', error);
      }
    );
  }
  
  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
    if (this.selectedFile) {
      const reader = new FileReader();
      reader.readAsDataURL(this.selectedFile);
      reader.onload = () => {
        this.imageUrl = reader.result;
      };
      // Update form control with selected file value
      this.productForm.get('imageFile')?.setValue(this.selectedFile);
    }
  }
  
  addProduct(): void {
    if (this.productForm.valid && this.selectedFile) {
      const formData = new FormData();
      
      // Use safe access for form values
      const nom = this.productForm.get('nom')?.value;
      const stockActuel = this.productForm.get('stockActuel')?.value;
      const seuilMinimal = this.productForm.get('seuilMinimal')?.value;
      const prixUnitaire = this.productForm.get('prixUnitaire')?.value;
      const prixVente = this.productForm.get('prixVente')?.value;
      const fournisseurId = this.productForm.get('fournisseur')?.value;
      const categorieProduitId = this.productForm.get('categorieProduit')?.value;
  
      if (nom && stockActuel && seuilMinimal && prixUnitaire && prixVente && fournisseurId && categorieProduitId) {
        formData.append('nom', nom);
        formData.append('stockActuel', stockActuel.toString());
        formData.append('seuilMinimal', seuilMinimal.toString());
        formData.append('prixUnitaire', prixUnitaire.toString());
        formData.append('prixVente', prixVente.toString());
        formData.append('fournisseurId', fournisseurId.toString());
        formData.append('categorieProduitId', categorieProduitId.toString());
  
        // Ensure the image is appended first
        formData.append('imageFile', this.selectedFile, this.selectedFile.name);
    
        // Log form values to inspect before appending to FormData
        console.log('Form Values:', this.productForm.value);
    
        // Append other form data (excluding the image file)
        Object.keys(this.productForm.controls).forEach(key => {
          if (key !== 'imageFile' && this.productForm.get(key)?.value) {
            console.log(`Appending ${key}:`, this.productForm.get(key)?.value);  // Debugging each field value
            formData.append(key, this.productForm.get(key)?.value);
          }
        });
    
        // Log FormData for debugging
        console.log('FormData being sent:', formData);
    
        // Call the service to add the product
        this.productService.addProduit(formData).subscribe(() => {
          Swal.fire('Success!', 'Product added successfully!', 'success');
          this.productForm.reset();
          this.close.emit();
          this.getProductComponent.loadProducts();
          this.selectedFile = null;
        }, error => {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'An error occurred while adding the product.',
            footer: '<a href="#">Why this error?</a>'
          });
          console.error('Error adding product:', error);
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Please fill in all the required fields correctly and select an image.',
          footer: '<a href="#">Why this error?</a>'
        });
  
        // Log which fields are invalid
        Object.keys(this.productForm.controls).forEach(key => {
          if (this.productForm.get(key)?.invalid) {
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
    this.productForm.reset();
    this.selectedFile = null;
  }

  goBack(): void {
    window.history.back();
  }
}
