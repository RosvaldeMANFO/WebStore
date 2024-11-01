import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../models/product.model';

const API = 'https://fakestoreapi.com/';

@Injectable({
  providedIn: 'root'
})
export class StoreService {
 
  constructor(private httpClient: HttpClient) { }

  getAllProducts = (limit = '10', sort='desc', category?: string): Observable<Array<Product>> => {
    return this.httpClient.get<Array<Product>>(
      `${API}products${
        category ? `/category/${category}` : ''
      }?limit=${limit}&sort=${sort}`
    );
  }

  getAllCategories = (): Observable<Array<string>> => {
    return this.httpClient.get<Array<string>>(`${API}products/categories`);
  }
}
