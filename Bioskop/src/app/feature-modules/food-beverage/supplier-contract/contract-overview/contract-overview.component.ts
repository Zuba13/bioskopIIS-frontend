import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { BaseContract } from '../../model/contract.model';
import { ContractItem } from '../../model/contract-item.model';

@Component({
  selector: 'xp-contract-overview',
  templateUrl: './contract-overview.component.html',
  styleUrls: ['./contract-overview.component.css'],
})
export class ContractOverviewComponent implements OnInit, OnChanges {
  @Input() baseContract: BaseContract & { supplierName: string };
  @Input() contractItems: ContractItem[] = [];

  displayedColumns: string[] = ['name', 'quantity', 'price'];
  dataSource = this.contractItems;

  constructor() {}
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['contractItems']) {
      this.dataSource = changes['contractItems'].currentValue;
    }
  }

  ngOnInit() {}

  get validFromDate() {
    return new Date(this.baseContract.validFrom);
  }

  get validUntilDate() {
    return new Date(this.baseContract.validUntil);
  }

  get dateOfSignatureDate() {
    return new Date(this.baseContract.validFrom);
  }
}
