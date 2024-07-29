import * as yup from "yup";

export const createCategoryFormSchema = yup.object().shape({

  name: yup.string().required("Campo obrigatório"),
  
});


export type  CreateCategoryFormData = {
  name: string;
}
