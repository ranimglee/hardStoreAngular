import { Component, Input, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ProduitService } from 'src/app/Services/product.service';
import { Produit } from 'src/models/produit';

@Component({
  selector: 'app-get-product',
  templateUrl: './get-product.component.html',
  styleUrls: ['./get-product.component.css']
})
export class GetProductComponent implements OnInit {
  products: Produit[] = [];
  @Input() product!: Produit;
  showAddProductModal: boolean = false;
  totalItems!: number;
  pageSize = 6;
  currentPage = 1;
  totalPages!: number;
  pages: number[] = [];
  pagedProducts: Produit[] = [];
  isModalVisible = false;
  selectedProduct: Produit = {
    id: 0, nom: '', stockActuel: 0, image: '',
    codePr: 0,
    seuilMinimal: 0,
    prixUnitaire: 0,
    prixVente: 0
  }; // Default initialization

  constructor(private productService: ProduitService, private modalService: NgbModal) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.productService.findAllProduits().subscribe(
      (res) => {
        this.products = res;
        console.log('API Response:', res); // Debug the response

        this.totalItems = this.products.length;
        this.totalPages = Math.ceil(this.totalItems / this.pageSize);
        this.pages = Array.from({ length: this.totalPages }, (_, i) => i + 1);
      },
      (error) => {
        console.error('Error retrieving products:', error);
      }
    );
  }

  getImageUrl(product: Produit): string {
    return `http://localhost/images/${product.image}`;
  }

  showProductDetails(product: any) {
    this.selectedProduct = product;  // Set the selected product
    this.isModalVisible = true;      // Show the modal
  }

  closeModal() {
    this.isModalVisible = false;  // Close the modal
  }


  openAddProductModal() {
    this.showAddProductModal = true;
  }

  closeAddProductModal() {
    this.showAddProductModal = false;
  }

  deleteProduct(id: number): void {
    this.productService.deleteProduit(id).subscribe((): void => {
      this.loadProducts();
    });
  }

  getCurrentPageProducts(): Produit[] {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    return this.products.slice(startIndex, endIndex);
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePagedProducts();
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePagedProducts();
    }
  }

  updatePagedProducts() {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    this.pagedProducts = this.products.slice(startIndex, startIndex + this.pageSize);
  }

  onPageChange(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.updatePagedProducts();
    }
  }
}
