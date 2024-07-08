import * as yup from "yup";

export const createSupplierFormSchema = yup.object().shape({
  cnpj: yup
    .string()
    .required("Campo obrigatório")
    .matches(
      /^\d{2}\.?\d{3}\.?\d{3}\/?\d{4}\-?\d{2}$/,
      "Formato de CNPJ inválido"
    ),
  razaoSocial: yup.string().required("Campo obrigatório"),
  nomeFantasia: yup.string().required("Campo obrigatório"),
  email: yup.string().required("Campo obrigatório").email("E-mail inválido"),
  fone: yup.string().required("Campo obrigatório"),
  cep: yup.string().required("Campo obrigatório"),
  endereco: yup.string().required("Campo obrigatório"),
  numero: yup.string().required("Campo obrigatório"),
  bairro: yup.string().required("Campo obrigatório"),
  // cidade: yup.string().required("Campo obrigatório"),
  // uf: yup.string().required("Campo obrigatório"),
});

export type createSupplierData = {
  cnpj: number;
  razaoSocial: string;
  nomeFantasia: string;
  email: string;
  fone: string;
  cep: number;
  endereco: string;
  numero: number;
  bairro: string;
  cidade: string;
  uf: string;
  complemento: string;
  observacao: string;
};
