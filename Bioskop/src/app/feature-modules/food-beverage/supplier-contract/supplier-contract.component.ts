import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { NotificationService } from '../../administration/notification.service';
import { SupplierService } from '../services/supplier.service';
import { BaseContract, ContractType } from '../model/contract.model';
import { ContractItem } from '../model/contract-item.model';
import { SupplierDto } from '../model/supplier.model';
import { ContractService } from '../services/contract.service';

@Component({
  selector: 'xp-supplier-contract',
  templateUrl: './supplier-contract.component.html',
  styleUrls: ['./supplier-contract.component.css'],
})
export class SupplierContractComponent implements OnInit {
  // supplierContractForm: FormGroup;
  name: FormControl;
  validFrom: FormControl;
  validUntil: FormControl;
  supplier: FormControl;
  responsiblePerson: FormControl;
  contractType: FormControl;

  isLinear = true;
  baseContractDataFormGroup: FormGroup;
  contractItemsFormGroup: FormGroup;

  suppliers: SupplierDto[];

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private supplierService: SupplierService,
    private notificationService: NotificationService,
    private contractService: ContractService
  ) {}

  ngOnInit() {
    this.createBaseContractForm();
    this.createContractItemsForm();

    this.supplierService.getSuppliers().subscribe((value) => {
      this.suppliers = value;
    });
  }

  private createBaseContractFormControls(): void {
    this.name = new FormControl('Test', {
      validators: [Validators.required, Validators.minLength(3)],
      updateOn: 'blur',
    });
    this.validFrom = new FormControl(new Date(), {
      validators: [Validators.required],
      updateOn: 'blur',
    });
    this.validUntil = new FormControl(new Date(), {
      validators: [Validators.required],
      updateOn: 'blur',
    });
    this.supplier = new FormControl('', {
      validators: [Validators.required],
      updateOn: 'blur',
    });
    this.responsiblePerson = new FormControl('', {
      validators: [Validators.required, Validators.minLength(6)],
      updateOn: 'blur',
    });
    this.contractType = new FormControl(ContractType.Week, {
      validators: [Validators.required],
      updateOn: 'blur',
    });
  }

  private createBaseContractForm(): void {
    this.createBaseContractFormControls();

    this.baseContractDataFormGroup = this.formBuilder.group({
      name: this.name,
      validFrom: this.validFrom,
      validUntil: this.validUntil,
      supplier: this.supplier,
      responsiblePerson: this.responsiblePerson,
      contractType: this.contractType,
    });
  }

  private createContractItemsForm(): void {
    this.contractItemsFormGroup = this.formBuilder.group({
      contractItems: this.formBuilder.array([this.getEmptyFormGroup()]),
    });
  }

  addContract(): void {
    if (
      this.baseContractDataFormGroup.valid &&
      this.contractItemsFormGroup.valid
    ) {
      this.contractService
        .addContract({
          baseData: this.baseContractDataFormGroup.getRawValue(),
          contractItems:
            this.contractItemsFormGroup.getRawValue()['contractItems'],
        })
        .subscribe({
          next: () => {
            this.router.navigate(['/contracts']);
            this.notificationService.openSuccessSnackBar(
              'Contract successfully added.'
            );
          },
          error: (error) => {
            console.error('Contract creation failed:', error);
          },
        });
    }
  }

  public handleBaseContractDataFormValueChange(value: BaseContract) {
    this.baseContractDataFormGroup.setValue(value);
  }

  public handleContractItemsFormValueChange(value: {
    contractItems: ContractItem[];
  }) {
    this.contractItemsFormGroup.setControl(
      'contractItems',
      this.formBuilder.array(value.contractItems)
    );
  }

  getEmptyFormGroup(): FormGroup {
    return this.formBuilder.group({
      name: new FormControl('', { validators: Validators.required }),
      quantity: new FormControl(1, { validators: Validators.required }),
      price: new FormControl(1, { validators: Validators.required }),
    });
  }

  get baseContractData(): BaseContract & { supplierName: string } {
    const supplierName = this.suppliers?.find(
      (s) =>
        s.Id?.toString() ===
        this.baseContractDataFormGroup.getRawValue()['supplier']
    )?.Name;
    return {
      ...this.baseContractDataFormGroup.getRawValue(),
      supplierName: supplierName,
    };
  }

  get contractItems(): ContractItem[] {
    return this.contractItemsFormGroup.getRawValue()['contractItems'];
  }
}
