
function formatCpf(cpf:string) {
    return cpf
        .replace(/\D/g, '') 
        .replace(/(\d{3})(\d)/, '$1.$2') 
        .replace(/(\d{3})(\d)/, '$1.$2') 
        .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
}

function formatCnpj(cnpj:string) {
    return cnpj 
        .replace(/\D/g, '') 
        .replace(/(\d{2})(\d)/, '$1.$2') 
        .replace(/(\d{3})(\d)/, '$1.$2') 
        .replace(/(\d{3})(\d)/, '$1/$2') 
        .replace(/(\d{4})(\d)/, '$1-$2'); 
}

export function formatDocument(document:string) {
    if (document.length > 11) {
        return formatCnpj(document)
    }else{
        return formatCpf(document)
    }
        
}