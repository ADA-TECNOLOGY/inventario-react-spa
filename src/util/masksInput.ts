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
  
  export const moneyMask = [
    'R$ ',            // Símbolo da moeda
    /\d/,             // Primeira unidade (milhar)
    /\d/,             // Segunda unidade (milhar)
    /\d/,             // Terceira unidade (milhar)
    /\d?/,            // Quarta unidade (opcional, caso tenha)
    /\d?/,            // Quinta unidade (opcional, caso tenha)
    /\d?/,            // Sexta unidade (opcional, caso tenha)
    '.',              // Ponto como separador de milhar
    /\d/,             // Primeira unidade de centavos
    /\d/,             // Segunda unidade de centavos
    ',',              // Vírgula como separador decimal
    /\d/,             // Primeira unidade decimal
    /\d?/             // Segunda unidade decimal (opcional)
];

