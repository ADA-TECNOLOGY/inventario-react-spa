import * as yup from "yup";


const requiredString = (message = "Campo obrigatório") => yup.string().required(message);
const requiredNumber = (message = "Campo obrigatório") => yup.number().required(message);


export const productFormSchema: yup.SchemaOf<productFormData> = yup.object({
  id: yup.number().required(),
  name: requiredString(),
  supplier: requiredString(),
  category: requiredString(),
  unitOfMeasure: requiredString(),
  stockQuantity: requiredNumber(),
  minimumStock: requiredNumber(),
  expirationDate: yup.string().optional(),
  batch: requiredString(),
  purchasePrice: requiredNumber(),
  salePrice: requiredNumber(),
  observation: requiredString(),
});

export type productFormData = {
  id: number;
  name: string;
  supplier: string;
  category: string;
  unitOfMeasure: string;
  stockQuantity: number;
  minimumStock: number;
  expirationDate?: string ;
  batch: string;
  purchasePrice: number;
  salePrice: number;
  observation: string;
};
