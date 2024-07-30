import { AddressModel } from "./Address.model";

export class SupplierModel {
  id: number;
  document: string;
  corporateName: string;
  tradeName: string;
  email: string;
  phone: string;
  active: boolean;
  address: AddressModel;

  constructor(
    id: number,
    document: string,
    corporateName: string,
    tradeName: string,
    email: string,
    phone: string,
    active: boolean,
    address: AddressModel,
  ) {
    this.id = id;
    this.document = document;
    this.corporateName = corporateName;
    this.tradeName = tradeName;
    this.email = email;
    this.phone = phone;
    this.active = active;
    this.address = address
  }
}
