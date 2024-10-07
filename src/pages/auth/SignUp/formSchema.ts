import * as yup from "yup";

export const signUpFormSchema = (hasNoNumber: boolean) => {
  return yup.object().shape({
  document: yup.string().required("Campo obrigatório"),
  corporateName: yup.string().required("Campo obrigatório"), //razaoSocial
  tradeName: yup.string().required("Campo obrigatório"), //nomeFantasia
  email: yup.string().required("Campo obrigatório").email("E-mail inválido"),
  phone: yup.string().required("Campo obrigatório"),
  district: yup.string().required("Campo obrigatório"),
  street: yup.string().required("Campo obrigatório"),
  number: yup.string().nullable().when([], {
    // Aqui, usamos o valor de hasNoNumber diretamente
    is: () => !hasNoNumber, // Se hasNoNumber for falso, o número será obrigatório
    then: yup.string().required("Campo obrigatório"),
    otherwise: yup.string().nullable(), // Se for verdadeiro, o campo pode ser nulo
  }),
  postalCode: yup.string().required("Campo obrigatório"),
  state: yup.string().required("Campo obrigatório"), //
  city: yup.string().required("Campo obrigatório"),
  password: yup
    .string()
    .required("Campo obrigatório")
    .min(6, "Senha deve ter no mínimo 6 caracteres"),
  confirmPassword: yup
    .string()
    .required("Campo obrigatório")
    .oneOf([yup.ref("password"), null], "Senhas não conferem"),
});
};

export type SignUpFormData = {
  document: string;
  corporateName: string;
  tradeName: string;
  email: string;
  phone: string;
  district: string;
  street: string;
  number: string;
  postalCode: string;
  state: string;
  city: string;
  complement: string;
  password: string;
  confirmPassword: string;
};
