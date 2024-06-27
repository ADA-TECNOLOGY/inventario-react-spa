import * as yup from "yup";

export const sendEmailFormSchema = yup.object().shape({
  email: 
    yup.string()
    .required("Campo obrigatório")
    .email("E-mail inválido"),
});

export type SendEmailFormData = {
  email: string;
};
