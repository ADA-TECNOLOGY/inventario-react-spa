import * as yup from "yup";

export const filterCostumerFormSchema = yup.object().shape({
  name: yup.string(),
  document: yup.string(),
  active: yup.boolean(),
  id: yup.string(),
  
  
});


export type FilterCustomerFormData = {
  id: number;
  document: string;
  name: string;
  active: boolean;
 
}
