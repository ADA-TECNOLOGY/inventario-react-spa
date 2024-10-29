import * as yup from "yup";

export const positionFormSchema = yup.object().shape({
  name: yup.string().required("Campo obrigatório"),
});

export type PositionFormData = yup.InferType<typeof positionFormSchema>;
