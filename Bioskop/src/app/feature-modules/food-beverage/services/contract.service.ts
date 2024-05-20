import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from 'src/env/environment';
import { ContractDto, CreateContractDto } from '../model/contract.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ContractService {
  private apiUrl = environment.apiHost + 'contracts';
  constructor(private http: HttpClient) {}
  getContracts(): Observable<ContractDto[]> {
    return this.http.get<ContractDto[]>(this.apiUrl);
  }

  addContract(contract: CreateContractDto): Observable<boolean> {
    console.log(contract);
    return this.http.post<boolean>(this.apiUrl, contract);
    //return of(true);
  }
}
