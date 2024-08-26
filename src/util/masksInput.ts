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