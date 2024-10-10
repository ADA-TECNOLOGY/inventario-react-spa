import * as yup from 'yup';

export const createProductFormSchema = () => {
    return yup.object({
        id: yup.string(),
        name: yup.string().required("Campo obrigatório"),
        category: yup.string().required("Campo obrigatório"),
        description: yup.string(),
        unitOfMeasure: yup.string().required("Campo obrigatório"),
        purchasePrice: yup.string(),
        stockQuantity: yup.string().required("Campo obrigatório"),
        salePrice: yup.string().required("Campo obrigatório"),
        minimumStock: yup.string().required("Campo obrigatório"),
        supplier: yup.object().required("Campo obrigatório"),
        expirationDate: yup.string(),
        batch: yup.string(),
        image: yup.string(),
        remarks: yup.string(),
        location: yup.string(),
    })
    
}
export type ProductFormSchema = yup.InferType<ReturnType<typeof createProductFormSchema>>;