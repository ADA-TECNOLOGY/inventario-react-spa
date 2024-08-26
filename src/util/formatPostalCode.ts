
export function formatPostalCode(cep: string) {
    return cep
    // Remove tudo que não é dígito
      .replace(/\D/g, '')

    // Adiciona hífen após os primeiros 5 dígitos 
      .replace(/(\d{5})(\d)/, '$1-$2'); 
  }
