import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/env/environment';
import { DistributionContract } from './model/distributionContract.model';
import { Observable } from 'rxjs';
import { DistributionCompany } from './model/distributionCompany.model';

@Injectable({
  providedIn: 'root'
})
export class DistributionContractService {
  private apiUrl = environment.apiHost;

  constructor(private http: HttpClient) { }

  addContract(contract: DistributionContract): Observable<DistributionContract> {   
    if (contract.model === 'Bidding') {
      contract.weeklyCosts = undefined;
      contract.percentage = undefined;
    }
    if (contract.model === 'Percentage') {
      contract.agreedSum = undefined;
    }
    return this.http.post<DistributionContract>(this.apiUrl + 'distribution/contract', contract);
  }

  editContract(contract: DistributionContract): Observable<DistributionContract> {    
    return this.http.put<DistributionContract>(this.apiUrl + 'distribution/contract', contract);
  }

  getCompanies(): Observable<DistributionCompany[]> {
    return this.http.get<DistributionCompany[]>(this.apiUrl + 'distribution/company');
  }
}
