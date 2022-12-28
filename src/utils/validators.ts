import {cpf} from 'cpf-cnpj-validator';

export const cpfIsValid = (num: string): Validate<any> => {
    console.log
    return !cpf.isValid(num) ? 'CPF inválido' : null
}

