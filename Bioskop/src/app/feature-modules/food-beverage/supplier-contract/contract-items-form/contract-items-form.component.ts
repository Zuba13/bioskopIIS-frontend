import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormArray,
  Validators,
  FormControl,
} from '@angular/forms';
import { ContractItem } from '../../model/contract-item.model';
import { BaseContract } from '../../model/contract.model';

@Component({
  selector: 'xp-contract-items-form',
  templateUrl: './contract-items-form.component.html',
  styleUrls: ['./contract-items-form.component.css'],
})
export class ContractItemsFormComponent implements OnInit {
  form: FormGroup = this.formBuilder.group({
    contractItems: this.formBuilder.array([this.getEmptyFormGroup()]),
  });
  @Output() onFormValueChanged = new EventEmitter<{
    contractItems: ContractItem[];
  }>();

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.form.valueChanges.subscribe((value) => {
      this.onFormValueChanged.emit(value);
    });
  }
  get contractItems(): FormArray {
    return this.form.get('contractItems') as FormArray;
  }

  addContractItemField() {
    this.contractItems.push(this.getEmptyFormGroup());
  }

  removeContractItemField(index: number): void {
    if (this.contractItems.length > 1) this.contractItems.removeAt(index);
    else this.contractItems.patchValue([{ name: '', price: 1, quantity: 1 }]);
  }

  submit(value: any): void {
    console.log(value);
  }

  reset(): void {
    this.form.reset();
    this.contractItems.clear();
    this.addContractItemField();
  }

  getEmptyFormGroup(): FormGroup {
    return this.formBuilder.group({
      name: new FormControl('', { validators: Validators.required }),
      quantity: new FormControl(1, {
        validators: [Validators.required, Validators.min(1)],
      }),
      price: new FormControl(1, {
        validators: [Validators.required, Validators.min(1)],
      }),
    });
  }
}
