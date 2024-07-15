import * as yup from "yup";

export const createSupplierFormSchema = yup.object().shape({
  cnpj: yup
    .string()
    .required("Campo obrigatório")
    .matches(
      /^\d{2}\.?\d{3}\.?\d{3}\/?\d{4}\-?\d{2}$/,
      "Formato de CNPJ inválido"
    ),
  corporateName: yup.string().required("Campo obrigatório"),
  tradeName: yup.string().required("Campo obrigatório"),
  email: yup.string().required("Campo obrigatório").email("E-mail inválido"),
  phone: yup.string().required("Campo obrigatório"),
  address: yup.object().shape({
    postalCode: yup.string().required("Campo obrigatório"),
    street: yup.string().required("Campo obrigatório"),
    number: yup.string().required("Campo obrigatório"),
    district: yup.string().required("Campo obrigatório"),
    city: yup.string().required("Campo obrigatório"),
    state: yup.string().required("Campo obrigatório"),
  })
  
});

export interface Address {
  postalCode: string;
  street: string;
  number: string;
  district: string;
  city: string;
  state: string;
}

export interface CreateSupplierFormData {
  cnpj: string;
  corporateName: string;
  tradeName: string;
  email: string;
  phone: string;
  address: Address;
}
