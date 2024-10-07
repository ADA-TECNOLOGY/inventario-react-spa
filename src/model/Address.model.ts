export class AddressModel {
  id: number;
  street: string;
  city: string;
  number: string ;
  complement: string;
  district: string;
  state: string;
  postalCode: string;

  constructor(
    id: number,
    street: string,
    city: string,
    number: string ,
    complement: string,
    district: string,
    state: string,
    postalCode: string
  ) {
    this.id = id;
    this.street = street;
    this.city = city;
    this.number = number;
    this.complement = complement;
    this.district = district;
    this.state = state;
    this.postalCode = postalCode;
  }
}
