export function formatDate(date: Date) {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Os meses em JavaScript começam de 0 (Janeiro = 0, Dezembro = 11)
    const year = date.getFullYear();
  
    return `${day}/${month}/${year}`;
  }