import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/feature-modules/administration/notification.service';
import { BaseContract, ContractType } from '../../model/contract.model';
import { SupplierService } from '../../services/supplier.service';
import { Observable } from 'rxjs';
import { Supplier, SupplierDto } from '../../model/supplier.model';

@Component({
  selector: 'xp-base-contract-data-form',
  templateUrl: './base-contract-data-form.component.html',
  styleUrls: ['./base-contract-data-form.component.css'],
})
export class BaseContractDataFormComponent implements OnInit {
  @Input() baseContract: BaseContract;
  @Input() suppliers: SupplierDto[];
  @Output() onFormValueChanged = new EventEmitter<BaseContract>();

  baseContractDataForm: FormGroup;
  name: FormControl;
  validFrom: FormControl;
  validUntil: FormControl;
  supplier: FormControl;
  responsiblePerson: FormControl;
  contractType: FormControl;

  constructor(
    private formBuilder: FormBuilder,
    private supplierService: SupplierService
  ) {
    this.createFormControls();
    this.createForm();
  }

  ngOnInit(): void {
    this.baseContractDataForm.valueChanges.subscribe((value) => {
      this.onFormValueChanged.emit(value);
    });
  }

  private createFormControls(): void {
    this.name = new FormControl(this.baseContract?.name ?? '', {
      validators: [Validators.required, Validators.minLength(3)],
      updateOn: 'blur',
    });
    this.validFrom = new FormControl(
      this.baseContract?.validFrom ?? new Date(),
      {
        validators: [Validators.required],
        updateOn: 'blur',
      }
    );
    this.validUntil = new FormControl(
      this.baseContract?.validUntil ?? new Date(),
      {
        validators: [Validators.required],
        updateOn: 'blur',
      }
    );
    this.supplier = new FormControl('', {
      validators: [Validators.required],
      updateOn: 'blur',
    });
    this.responsiblePerson = new FormControl(
      this.baseContract?.responsiblePerson,
      {
        validators: [Validators.required, Validators.minLength(6)],
        updateOn: 'blur',
      }
    );
    this.contractType = new FormControl(
      this.baseContract?.contractType ?? '0',
      {
        validators: [Validators.required],
        updateOn: 'blur',
      }
    );
  }

  private createForm(): void {
    this.baseContractDataForm = this.formBuilder.group({
      name: this.name,
      validFrom: this.validFrom,
      validUntil: this.validUntil,
      supplier: this.supplier,
      responsiblePerson: this.responsiblePerson,
      contractType: this.contractType,
    });
  }
}
