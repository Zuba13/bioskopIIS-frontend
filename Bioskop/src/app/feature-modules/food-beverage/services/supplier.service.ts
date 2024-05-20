import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/env/environment';
import { Observable } from 'rxjs';
import { Supplier, SupplierDto } from '../model/supplier.model';

@Injectable({
  providedIn: 'root',
})
export class SupplierService {
  private apiUrl = environment.apiHost + 'suppliers';

  constructor(private http: HttpClient) {}

  registerSupplier(supplier: Supplier): Observable<boolean> {
    return this.http.post<boolean>(this.apiUrl, supplier);
  }

  getSuppliers(): Observable<SupplierDto[]> {
    return this.http.get<SupplierDto[]>(this.apiUrl);
  }

}
