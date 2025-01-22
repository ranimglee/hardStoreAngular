import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CategorieProduit } from 'src/models/CategorieProduit';

@Injectable({
  providedIn: 'root'
})
export class CategoriProduitService {

  private apiUrl = 'http://localhost:8082/hardStore/categories'; // Replace with your backend URL

  constructor(private http: HttpClient) {}
 
  // Get all categories
  getAllCategories(): Observable<CategorieProduit[]> {
    return this.http.get<CategorieProduit[]>(this.apiUrl+ '/getAllCategories');
  }
}
