import * as yup from "yup";

export const RedefinePasswordFormSchema = yup.object().shape({
  senha: yup
    .string()
    .required("Campo obrigatório")
    .min(6, "Senha deve ter no mínimo 6 caracteres"),
  confirmarSenha: yup
    .string()
    .required("Campo obrigatório")
    .oneOf([yup.ref("senha"), null], "Senhas não conferem"),
});

export type RedefinePasswordFormData = {
  senha: string;
  confirmarSenha: string;
};
