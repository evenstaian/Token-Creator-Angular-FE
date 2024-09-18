import { AbstractControl, ValidationErrors } from '@angular/forms';

export function cpfValidator(control: AbstractControl): ValidationErrors | null {
    const cpf = control.value;
    if (!cpf) return null;
    const isValid = validateCPF(cpf);
    return isValid ? null : { invalidCPF: true };
}

export function cnpjValidator(control: AbstractControl): ValidationErrors | null {
    const cnpj = control.value;
    if (!cnpj) return null;
    const isValid = validateCNPJ(cnpj);
    return isValid ? null : { invalidCNPJ: true };
}

export function symbolValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value;

    if (!value) {
        return null;
    }

    const isValidSymbol = /^[A-Z0-9]{3,5}$/.test(value);

    if (!isValidSymbol) {
        return {
            symbolInvalid: 'Symbol must be 3-5 uppercase letters, without spaces or special characters'
        };
    }

    return null;
};

export function uppercaseValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    if (value && value !== value.toUpperCase()) {
        return { uppercase: true };
    }
    return null;
}

export function ethAddressValidator(control: AbstractControl): ValidationErrors | null {
    const address = control.value;
    if (!address) {
        return null; // Permite valores vazios
    }
    
    // Ethereum address regex pattern
    const ethAddressPattern = /^0x[a-fA-F0-9]{40}$/;
    
    if (!ethAddressPattern.test(address)) {
        return { invalidEthAddress: true };
    }
    
    return null;
}

function validateCPF(cpfInput: string): boolean {
    const cpf = cpfInput.replace(/[^\d]+/g, '');
    if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) {
        return false;
    }

    let sum;
    let rest;
    sum = 0;

    for (let i = 1; i <= 9; i++) {
        sum += parseInt(cpf.substring(i - 1, i), 10) * (11 - i);
    }

    rest = (sum * 10) % 11;

    if ((rest === 10) || (rest === 11)) {
        rest = 0;
    }
    if (rest !== parseInt(cpf.substring(9, 10), 10)) {
        return false;
    }

    sum = 0;
    for (let i = 1; i <= 10; i++) {
        sum += parseInt(cpf.substring(i - 1, i), 10) * (12 - i);
    }

    rest = (sum * 10) % 11;

    if ((rest === 10) || (rest === 11)) {
        rest = 0;
    }
    if (rest !== parseInt(cpf.substring(10, 11), 10)) {
        return false;
    }

    return true;
}

function validateCNPJ(cnpjInput: string): boolean {
    const cnpj = cnpjInput.replace(/[^\d]+/g, '');

    if (cnpj.length !== 14) {
        return false;
    }

    // Elimina CNPJs inválidos conhecidos
    if (/^(\d)\1{13}$/.test(cnpj)) {
        return false;
    }

    // Valida DVs
    let length = cnpj.length - 2;
    let numbers = cnpj.substring(0, length);
    const digits = cnpj.substring(length);
    let sum = 0;
    let pos = length - 7;

    for (let i = length; i >= 1; i--) {
        sum += parseInt(numbers.charAt(length - i), 10) * pos--;
        if (pos < 2) {
            pos = 9;
        }
    }

    let result = sum % 11 < 2 ? 0 : 11 - sum % 11;
    if (result !== parseInt(digits.charAt(0), 10)) {
        return false;
    }

    length += 1;
    numbers = cnpj.substring(0, length);
    sum = 0;
    pos = length - 7;

    for (let i = length; i >= 1; i--) {
        sum += parseInt(numbers.charAt(length - i), 10) * pos--;
        if (pos < 2) {
            pos = 9;
        }
    }

    result = sum % 11 < 2 ? 0 : 11 - sum % 11;
    if (result !== parseInt(digits.charAt(1), 10)) {
        return false;
    }

    return true;
}
