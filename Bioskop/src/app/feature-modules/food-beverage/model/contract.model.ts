import { ContractItem, ContractItemDto } from './contract-item.model';
import { Supplier, SupplierDto } from './supplier.model';

export interface BaseContract {
  name: string;
  validFrom: Date;
  validUntil: Date;
  supplier: number;
  responsiblePerson: string;
  contractType: ContractType;
}

export enum ContractType {
  Week = 0,
  AllAtOnce = 1,
}

export interface ContractDto {
  Id: number;
  Name: string;
  validFrom: Date;
  validUntil: Date;
  dateOfSignature: Date;
  supplier: SupplierDto;
  contractType: ContractType;
  contractItems: ContractItemDto[];
}

export interface CreateContractDto {
  baseData: BaseContract;
  contractItems: ContractItem[];
}
