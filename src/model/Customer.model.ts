import { AddressModel } from "./Address.model";

export class CustomerModel {
  id: number;
  document: string;
  name: string;
  email: string;
  phone: string;
  birthDate: string;
  active: boolean;
  address: AddressModel;

  constructor(
    id: number,
    document: string,
    name: string,
    email: string,
    phone: string,
    birthDate: string,
    active: boolean,
    address: AddressModel,
  ) {
    this.id = id;
    this.document = document;
    this.name = name;
    this.email = email;
    this.phone = phone;
    this.birthDate = birthDate;
    this.active = active;
    this.address = address
  }
}
