import * as yup from "yup";

export const customerFormSchema = (hasNoNumber: boolean) => {
  return yup.object().shape({
    document: yup.string().required("Campo obrigatório"),
    name: yup.string().required("Campo obrigatório"),
    email: yup.string().required("Campo obrigatório").email("E-mail inválido"),
    phone: yup.string().required("Campo obrigatório"),
    birthDate: yup.string().required("Campo obrigatório"),
    address: yup.object().shape({
      postalCode: yup.string().required("Campo obrigatório"),
      street: yup.string().required("Campo obrigatório"),
      number: yup.string().nullable().when([], {
        // Aqui, usamos o valor de hasNoNumber diretamente
        is: () => !hasNoNumber, // Se hasNoNumber for falso, o número será obrigatório
        then: yup.string().required("Campo obrigatório"),
        otherwise: yup.string().nullable(), // Se for verdadeiro, o campo pode ser nulo
      }),
      district: yup.string().required("Campo obrigatório"),
      city: yup.string().required("Campo obrigatório"),
      state: yup.string().required("Campo obrigatório"),
      complement: yup.string(),
    }),
  });
};

export type Address = {
  postalCode: string;
  street: string;
  number: string;
  district: string;
  city: string;
  state: string;
  complement: string;
};

export type CustomerFormData = {
  id?: number;
  document: string;
  name: string;
  email: string;
  phone: string;
  address: Address;
  active?: boolean;
  birthDate: string;
};

export const filterCostumerFormSchema = yup.object().shape({
  name: yup.string(),
  document: yup.string(),
  active: yup.boolean(),
  id: yup.string(),
  
  
});


export type FilterCustomerFormData = {
  id: number;
  document: string;
  name: string;
  active: boolean;
 
}
