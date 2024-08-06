

export class CompanyModel {
    id: number;	
    cnpj: number;	
    corporateName: string;	
    tradeName: string;
    phone: number;	
    postalCode: number;	
    number: number;	
    state: string;	
    city: string;	
    complement: string;	
    street: string;	
    district: string;	
    status: string;
    active: boolean;	
    email: string;
    password: string;
    
    constructor 
        (
        id: number,	
        cnpj: number,	
        corporateName: string,	
        tradeName: string,
        phone: number,	
        postalCode: number,	
        number: number,	
        state: string,	
        city: string,	
        complement: string,	
        street: string,	
        district: string,	
        status: string,
        active: boolean,	
        email: string,
        password: string,
    ) {
        this.id = id;
        this.cnpj = 	cnpj;
        this.corporateName = corporateName;	
        this.tradeName = tradeName;
        this.phone = phone;
        this.postalCode = postalCode; 	
        this.number = number;	
        this.state = state;	
        this.city = city;	
        this.complement = complement;	
        this.street = street;	
        this.district = district; 	
        this.status = status;
        this.active = active;	
        this.email = email;
        this.password = password;
    }

    

}