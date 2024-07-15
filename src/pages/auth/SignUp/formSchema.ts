import * as yup from "yup";

export const signUpFormSchema = yup.object().shape({
  cnpj: yup
    .string()
    .required("Campo obrigatório")
    .matches(
      /^\d{2}\.?\d{3}\.?\d{3}\/?\d{4}\-?\d{2}$/,
      "Formato de CNPJ inválido"
    ),
  corporateName: yup.string().required("Campo obrigatório"), //razaoSocial
  tradeName: yup.string().required("Campo obrigatório"), //nomeFantasia
  email: yup.string().required("Campo obrigatório").email("E-mail inválido"),
  phone: yup.string().required("Campo obrigatório"),
  district: yup.string().required("Campo obrigatório"),
  street: yup.string().required("Campo obrigatório"),
  number: yup.string().required("Campo obrigatório"),
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

export type SignUpFormData = {
  cnpj: string;
  corporateName: string;
  tradeName: string;
  email: string;
  phone: string;
  district: string;
  street: string;
  number: number;
  postalCode: string;
  state: string;
  city: string;
  complement: string;
  password: string;
  confirmPassword: string;
};
