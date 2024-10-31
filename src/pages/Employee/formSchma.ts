import * as yup from "yup";

export const employeeFormSchema = (hasNoNumber: boolean) => {
    return yup.object().shape({
        name: yup.string().required("Campo obrigatório"),
        document: yup.object().required("Campo obrigatório"),
        email: yup.string().required("Campo obrigatório").email("E-mail inválido"),
        phone: yup.string().required("Campo obrigatório"),
        birthDate: yup.string().required("Campo obrigatório"),
        password: yup.string().required("Campo obrigatório"),
        confirmPassword: yup.string().required("Campo obrigatório"),
        position: yup.string(),
        address: yup.object().shape({
            postalCode: yup.string().required("Campo obrigatório"),
            street: yup.string().required("Campo obrigatório"),
            number: yup.string().nullable().when([], {
                is: () => !hasNoNumber, // Se hasNoNumber for falso, o número será obrigatório
                then: yup.string().required("Campo obrigatório"),
                otherwise: yup.string().nullable(), // Se for verdadeiro, o campo pode ser nulo
            }),
            district: yup.string().required("Campo obrigatório"),
            state: yup.string().required("Campo obrigatório"),
            city: yup.string().required("Campo obrigatório"),
            complement: yup.string(),
            
        }),
    });
}
export type Address = {
    postalCode: string;
    street: string;
    number: string;
    district: string;
    city: string;
    state: string;
    complement: string;
    password: string;
    confirmPassword: string;


}

export type EmployeeFormData = {
    id?: number;
    name: string;
    document: string;
    email: string;
    phone: string;
    address: Address;
    active?: boolean;
    birthDate: string;
    password: string;
    confirmPassword: string
    position: string;

}

export const filterEmployeeFormSchema = yup.object().shape({
    name: yup.string(),
    document: yup.string(),
    active: yup.boolean(),
    id: yup.string(),
});

export type FilterEmployeeFormData = {
    id: number;
    document: string;
    name: string;
    active: boolean;

}