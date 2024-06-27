import * as yup from "yup";

export const signUpFormSchema = yup.object().shape({
  cnpj: yup
    .string()
    .required("Campo obrigatório")
    .matches(
      /^\d{2}\.?\d{3}\.?\d{3}\/?\d{4}\-?\d{2}$/,
      "Formato de CNPJ inválido"
    ),
  nomeFantasia: yup.string().required("Campo obrigatório"),
  email: yup.string().required("Campo obrigatório").email("E-mail inválido"),
  fone: yup.string().required("Campo obrigatório"),
  endereco: yup.string().required("Campo obrigatório"),
  numero: yup.string().required("Campo obrigatório"),
  cep: yup.string().required("Campo obrigatório"),
  uf: yup.string().required("Campo obrigatório"),
  cidade: yup.string().required("Campo obrigatório"),
  senha: yup
    .string()
    .required("Campo obrigatório")
    .min(6, "Senha deve ter no mínimo 6 caracteres"),
  confirmarSenha: yup
    .string()
    .required("Campo obrigatório")
    .oneOf([yup.ref("senha"), null], "Senhas não conferem"),
});

export type SignUpFormData = {
  cnpj: number;
  nomeFantasia: string;
  email: string;
  fone: string;
  endereco: string;
  numero: number;
  cep: number;
  uf: string;
  cidade: string;
  complemento: string;
  senha: string;
  confirmarSenha: string;
};
