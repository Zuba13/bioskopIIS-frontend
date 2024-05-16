import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ContractItem } from '../../model/contract-item.model';
import { ContractDto, ContractType } from '../../model/contract.model';
import { ContractService } from '../../services/contract.service';

@Component({
  selector: 'xp-contracts-table',
  templateUrl: './contracts-table.component.html',
  styleUrls: ['./contracts-table.component.css'],
})
export class ContractsTableComponent implements OnInit {
  contracts: ContractDto[] = [];

  displayedColumns: string[] = [
    'id',
    'name',
    'validFrom',
    'validUntil',
    'dateOfSignature',
    'contractType',
    'supplierName',
    'numberOfContractItems',
  ];
  dataSource = this.contracts;

  constructor(
    private router: Router,
    private contractService: ContractService
  ) {}
  ngOnInit(): void {
    this.contractService.getContracts().subscribe((value) => {
      this.contracts = value;
      this.dataSource = value;
    });
  }

  public addContract() {
    this.router.navigate(['/supplier-contract']);
  }

  public getContractType(value: number) {
    return ContractType[value];
  }
}
