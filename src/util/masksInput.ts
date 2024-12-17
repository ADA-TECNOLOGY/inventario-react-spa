import createNumberMask from 'text-mask-addons/dist/createNumberMask';

export const cpfMask = [
    /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '-', /\d/, /\d/
  ];

export const cnpjMask = [
    /\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/
  ];

export const cepMask = [/\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/];

export const phoneNumberMask = [
    '(', /[1-9]/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/
  ];

  export const currencyMask = createNumberMask({
    prefix: 'R$ ',            // Prefixo de moeda
    suffix: '',               // Sufixo (se necessário, como "USD")
    includeThousandsSeparator: true, // Separador de milhares
    thousandsSeparatorSymbol: '.',  // Simbolo de milhares (ponto no Brasil)
    decimalSymbol: ',',       // Separador decimal
    allowDecimal: true,       // Permite casas decimais
    decimalLimit: 2,          // Quantidade de casas decimais
    integerLimit: null,       // Limite para parte inteira (deixe null para ilimitado)
    allowNegative: false,     // Permitir valores negativos
    allowLeadingZeroes: false // Permitir zeros à esquerda
  });