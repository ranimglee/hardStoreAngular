import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Fournisseur } from 'src/models/fournisseur';

@Injectable({
  providedIn: 'root'
})
export class SupplierService {

  
  private baseUrl: string = 'http://localhost:8082/hardStore/fournisseurs';
  
    constructor(private http : HttpClient) { }
    
  getAllFournisseurs(): Observable<Fournisseur[]> {
    return this.http.get<Fournisseur[]>(this.baseUrl + '/getAllFournisseurs');
  }


  addFournisseur(formData: FormData): Observable<Fournisseur>{
      return this.http.post<Fournisseur>(this.baseUrl + '/add', formData);
    }
}


