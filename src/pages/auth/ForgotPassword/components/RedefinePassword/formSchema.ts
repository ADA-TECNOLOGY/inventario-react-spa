import * as yup from "yup";

export const RedefinePasswordFormSchema = yup.object().shape({
  password: yup
    .string()
    .required("Campo obrigatório")
    .min(6, "Senha deve ter no mínimo 6 caracteres"),
  confirmPassword: yup
    .string()
    .required("Campo obrigatório")
    .oneOf([yup.ref("password"), null], "Senhas não conferem"),
});

export type RedefinePasswordFormData = {
  password: string;
  confirmPassword: string;
};
