import * as yup from "yup";
import { Address } from "../CreateCustomer/formSchema";
import { AddressModel } from "../../../model/Address.model";

export const editCustomerFormSchema = (hasNoNumber: boolean) => {
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
}



export type EditCustomerFormData = {
  id: number;
  document: string;
  name: string;
  email: string;
  phone: string;
  address: AddressModel;
  active: boolean;
  birthDate: string;
};
