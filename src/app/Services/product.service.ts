import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Produit } from 'src/models/produit';
import { Sale } from 'src/models/Sale';


@Injectable({
  providedIn: 'root'
})
export class ProduitService {

private baseUrl :string = 'http://localhost:8082/hardStore/produits';

  constructor(private http : HttpClient) { }

  findAllProduits(): Observable<Produit[]>{
    return this.http.get<Produit[]>( this.baseUrl + '/getAllProduits');
  }

  addProduit(formData: FormData): Observable<Produit>{
    return this.http.post<Produit>(this.baseUrl + '/addProduit', formData);
  }

  deleteProduit(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/deleteProduit/${id}`);
  }

  updateProduit(id:number, formData: FormData):Observable<any>{
    return this.http.put(this.baseUrl+ `/updateProduit/${id}`,formData);
  }

  getProduitById(id:any):Observable<any>{
    return this.http.get(this.baseUrl + `/getProduitById/${id}`);
  }
  sellProduct(id: number, quantity: number): Observable<string> {
    const url = `${this.baseUrl}/sellProduit/${id}`;
    const params = new HttpParams().set('quantity', quantity.toString());
    return this.http.post<string>(url, params);
  }

  // Get sales by date
  getSalesByDate(date: string): Observable<Sale[]> {
    const url = `${this.baseUrl}/allsales`;
    const params = new HttpParams().set('date', date);
    return this.http.get<Sale[]>(url, { params });
  }
  
}
