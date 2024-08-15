import * as yup from "yup";

export const filterSupplierFormSchema = yup.object().shape({
  corporateName: yup.string(),
  document: yup.string(),
  active: yup.boolean(),
  id: yup.string(),
  
  
});


export type FilterSupplierFormData = {
  id: number;
  document: string;
  corporateName: string;
  active: boolean;
 
}
