import * as yup from "yup";

export const editCustomerFormSchema = yup.object().shape({
  document: yup.string().required("Campo obrigatório"),
  name: yup.string().required("Campo obrigatório"),
  email: yup.string().required("Campo obrigatório").email("E-mail inválido"),
  phone: yup.string().required("Campo obrigatório"),
  birthDate: yup.string().required("Campo obrigatório"),
  address: yup.object().shape({
    postalCode: yup.string().required("Campo obrigatório"),
    street: yup.string().required("Campo obrigatório"),
    number: yup.string().required("Campo obrigatório"),
    district: yup.string().required("Campo obrigatório"),
    city: yup.string().required("Campo obrigatório"),
    state: yup.string().required("Campo obrigatório"),
    complement: yup.string(),
  }),
});

export type Address = {
  postalCode: string;
  street: string;
  number: number;
  district: string;
  city: string;
  state: string;
  complement: string;
};

export type EditCustomerFormData = {
  id: number;
  document: string;
  name: string;
  email: string;
  phone: string;
  address: Address;
  active: boolean;
  birthDate: string;
};
