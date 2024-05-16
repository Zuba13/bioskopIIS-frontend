import { Component, OnInit } from '@angular/core';
import { SupplierDto } from '../../model/supplier.model';
import { Router } from '@angular/router';
import { ContractService } from '../../services/contract.service';
import { SupplierService } from '../../services/supplier.service';

@Component({
  selector: 'xp-suppliers-table',
  templateUrl: './suppliers-table.component.html',
  styleUrls: ['./suppliers-table.component.css'],
})
export class SuppliersTableComponent implements OnInit {
  suppliers: SupplierDto[] = [];

  displayedColumns: string[] = [
    'id',
    'name',
    'email',
    'street',
    'city',
    'country',
    'phone',
  ];
  dataSource = this.suppliers;

  constructor(
    private router: Router,
    private supplierService: SupplierService
  ) {}
  ngOnInit(): void {
    this.supplierService.getSuppliers().subscribe((value) => {
      this.suppliers = value;
      this.dataSource = value;
    });
  }

  public registerSupplier() {
    this.router.navigate(['/supplier-register']);
  }
}
