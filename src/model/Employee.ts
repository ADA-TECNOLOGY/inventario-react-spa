import { AddressModel } from "./Address.model";

export class EmployeeModel {
  id: number;
  document: string;
  position: any;
  name: string;
  email: string;
  phone: string;
  birthDate: string;
  active: boolean;
  address: AddressModel;
  password: string;
  confirmPassword: string;

  constructor(
    id: number,
    document: string,
    position: any,
    name: string,
    email: string,
    phone: string,
    birthDate: string,
    active: boolean,
    address: AddressModel,
    password: string,
    confirmPassword: string,
  ) {
    this.id = id;
    this.document = document;
    this.name = name;
    this.email = email;
    this.phone = phone;
    this.birthDate = birthDate;
    this.active = active;
    this.address = address;
    this.password = password;
    this.confirmPassword = confirmPassword;
    this.position = position
  }
}
