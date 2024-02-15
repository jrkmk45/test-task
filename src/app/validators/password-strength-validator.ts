import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { PasswordStrength } from '../enums/password-strength';

const MIN_PASSWORD_LENGTH: number = 8;

export class PasswordStrengthValidator {

  public static validateStrength : ValidatorFn 
    = (control: AbstractControl): ValidationErrors | null => {

    if (control.value.length < 1) {
      return this.formatResult(PasswordStrength.Empty);
    }
    if (control.value.length < MIN_PASSWORD_LENGTH && control.value.length > 0) {
      return this.formatResult(PasswordStrength.NotEnoughCharacters);
    }

    const hasLetters = /[a-zA-Z]/.test(control.value);
    const hasSymbols = /[^a-zA-Z0-9]/.test(control.value);
    const hasDigits = /\d/.test(control.value);
    
    if (hasLetters && hasSymbols && hasDigits) {
      return this.formatResult(PasswordStrength.Strong);
    }

    if (hasLetters && hasSymbols || hasLetters && hasDigits || hasDigits && hasSymbols) {
      return this.formatResult(PasswordStrength.Medium);
    }

    if (hasLetters || hasSymbols || hasDigits) {
      return this.formatResult(PasswordStrength.Easy);
    }

    return null;
  };

  private static formatResult(strength: PasswordStrength) : { strength: PasswordStrength } {
    return { strength: strength };
  }
}