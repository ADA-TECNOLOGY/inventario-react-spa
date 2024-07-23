
export function formatPhone(phone: string) {
    return phone
    // Remove tudo que não é dígito
      .replace(/\D/g, '') 

    // Adiciona parênteses em volta dos primeiros 2 dígitos e um espaço após eles
      .replace(/(\d{2})(\d)/, '($1) $2')

    // Adiciona hífen antes dos últimos 4 dígitos
      .replace(/(\d{4,5})(\d{4})$/, '$1-$2'); 
  }