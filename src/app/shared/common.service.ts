import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FileUpload } from '../model/file-upload';
import { Product } from '../model/product';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  private apiUrl1: string = 'http://localhost:9090/api/v1/save-product'
  private apiUrl2: string = 'http://localhost:9090/api/v1/get-products'
  private apiUrl3: string = 'http://localhost:9090/api/v1/delete-product'
  private apiUrl4: string = 'http://localhost:9090/api/v1/update-product'
  private apiUrl5: string = 'http://localhost:9090/api/v1/get-product'
  private apiUrl6: string = 'http://localhost:9090/api/v1/upload'


  constructor(private http: HttpClient) { }


  saveProduct(product: Product): Observable<any> {
    const httpHeaders = new HttpHeaders().set('Content-Type', 'application/json')
    console.log('API URL:', this.apiUrl1);
    return this.http.post(this.apiUrl1, product, { headers: httpHeaders, responseType: 'text' })
  }

  getProducts(): Observable<Product[]> {
    console.log('API URL:', this.apiUrl2);
    return this.http.get<Product[]>(this.apiUrl2)
  }

  getProductById(id: string): Observable<Product> {
    const apiUrl = `${this.apiUrl5}/${id}`
    console.log('API URL:', apiUrl)
    return this.http.get<Product>(this.apiUrl5 + '/' + id)
  }

  getProductByName(name: string): Observable<Product> {
    let params = new HttpParams().set('name', name)
    const apiUrl = `${this.apiUrl5}?name=${encodeURIComponent(name)}`; // Construct complete API URL
    console.log('API URL:', apiUrl); // Log the API URL
    return this.http.get<Product>(this.apiUrl5, { params: params })
  }

  // Using Template Literals
  updateProduct(product: Product): Observable<Product> {
    const url = `${this.apiUrl4}/${product.id}`
    return this.http.put<Product>(url, product)
  }

  //Using String Concatenation
  deleteProduct(id: string): Observable<void> {
    return this.http.delete<void>(this.apiUrl3 + '/' + id)
  }

  uploadFile(formData: FormData): Observable<FileUpload> {
    return this.http.post<FileUpload>(this.apiUrl6, formData)
  }
}
