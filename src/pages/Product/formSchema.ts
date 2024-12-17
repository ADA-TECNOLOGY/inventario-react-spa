import * as yup from "yup";


const requiredString = (message = "Campo obrigatório") => yup.string().required(message);
const requiredNumber = (message = "Campo obrigatório") => yup.number().required(message);


export const productFormSchema: yup.SchemaOf<ProductFormData> = yup.object({
  name: requiredString(),
  supplier: requiredNumber(),
  category: requiredString(),
  unitOfMeasure: requiredString(),
  stockQuantity: requiredNumber(),
  minimumStock: requiredNumber(),
  expirationDate: yup.string().optional(),
  batch: requiredString(),
  purchasePrice: requiredString(),
  salePrice: requiredString(),
  observation: yup.string().optional(),
  typeUnitMeasure: requiredString(),
});

export type ProductFormData = {
  name: string;
  supplier: number;
  category: string;
  unitOfMeasure: string;
  stockQuantity: number;
  minimumStock: number;
  expirationDate?: string ;
  batch: string;
  purchasePrice: string;
  salePrice: string;
  observation?: string;
  typeUnitMeasure: string;
};
