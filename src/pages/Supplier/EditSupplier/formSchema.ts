import * as yup from "yup";

export const editSupplierFormSchema = (hasNoNumber: boolean) => {
  return yup.object().shape({

  document: yup.string().required("Campo obrigatório"),
    // .matches(
    //   /^\d{2}\.?\d{3}\.?\d{3}\/?\d{4}\-?\d{2}$/,
    //   "Formato de document inválido"
    // ),
  corporateName: yup.string().required("Campo obrigatório"),
  tradeName: yup.string().required("Campo obrigatório"),
  email: yup.string().required("Campo obrigatório").email("E-mail inválido"),
  phone: yup.string().required("Campo obrigatório"),
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
  }) 
});
}

export type  Address = {
  postalCode: string;
  street: string;
  number: string;
  district: string;
  city: string;
  state: string;
  complement: string;
  
}

export type  EditSupplierFormData = {
  id: number;
  document: string;
  corporateName: string;
  tradeName: string;
  email: string;
  phone: string;
  address: Address;
  active: boolean;
}
