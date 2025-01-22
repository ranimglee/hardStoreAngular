import { Component, OnInit } from '@angular/core';
import { SupplierService } from 'src/app/Services/supplier.service';
import { Fournisseur } from 'src/models/fournisseur';

@Component({
  selector: 'app-get-supplier',
  templateUrl: './get-supplier.component.html',
  styleUrls: ['./get-supplier.component.css']
})
export class GetSupplierComponent implements OnInit {

  showAddSupplierModal: boolean = false;
  suppliers: Fournisseur[] = [];
  paginatedSuppliers: Fournisseur[] = [];
  currentPage: number = 1;
  pageSize: number = 5;  // Number of items per page
  totalItems: number = 0;

  constructor(private supplierService: SupplierService) {}

  ngOnInit(): void {
    this.loadSuppliers();
  }

  loadSuppliers(): void {
    this.supplierService.getAllFournisseurs().subscribe(
      (suppliers: Fournisseur[]) => {
        this.suppliers = suppliers;
        this.totalItems = suppliers.length;  // Total number of suppliers for pagination
        this.updatePagination();  // Update the pagination list
      },
      (error) => {
        console.error('Error fetching suppliers:', error);
      }
    );
  }
  
  updatePagination(): void {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    this.paginatedSuppliers = this.suppliers.slice(startIndex, startIndex + this.pageSize);
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    this.updatePagination();
  }

  openAddSupplierModal() {
    this.showAddSupplierModal = true;
  }

  closeAddSupplierModal() {
    this.showAddSupplierModal = false;
  }
}
