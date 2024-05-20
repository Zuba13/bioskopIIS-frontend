import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/infrastructure/material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { SupplierRegistrationComponent } from './supplier-registration/supplier-registration.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { SupplierContractComponent } from './supplier-contract/supplier-contract.component';
import { BaseContractDataFormComponent } from './supplier-contract/base-contract-data-form/base-contract-data-form.component';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatStepperModule } from '@angular/material/stepper';
import { ContractOverviewComponent } from './supplier-contract/contract-overview/contract-overview.component';
import { ContractItemsFormComponent } from './supplier-contract/contract-items-form/contract-items-form.component';
import { MatTableModule } from '@angular/material/table';
import { ContractsTableComponent } from './supplier-contract/contracts-table/contracts-table.component';
import { SuppliersTableComponent } from './supplier-contract/suppliers-table/suppliers-table.component';

@NgModule({
  declarations: [
    SupplierRegistrationComponent,
    SupplierContractComponent,
    BaseContractDataFormComponent,
    ContractOverviewComponent,
    ContractItemsFormComponent,
    ContractsTableComponent,
    SuppliersTableComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    MatNativeDateModule,
    MatGridListModule,
    MatRadioModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatStepperModule,
    MatTableModule,
  ],
  exports: [SupplierRegistrationComponent],
})
export class FoodBeverageModule {}
