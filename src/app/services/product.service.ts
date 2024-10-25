import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = 'https://vvt9r64f-3000.usw3.devtunnels.ms/api/productos'; // URL de la API

  constructor(private http: HttpClient) {}

  // Obtener todos los productos
  getProductos(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  // Crear un nuevo producto
  createProducto(product: any): Observable<any> {
    return this.http.post(this.apiUrl, product);
  }

  // Actualizar producto por ID
  updateProducto(id: number, product: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, product);
  }

  // Eliminar producto por ID
  deleteProducto(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
