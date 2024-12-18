export function formatCurrency(value: string) {
    const numericValue = typeof value === 'string' ? parseFloat(value) : value; 

    return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(numericValue);
  }