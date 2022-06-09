import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function verifyBudget(prms: number): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {

    const val = control.value;

    if (isNaN(val)) {

      return { "number": true };
    } else if (!isNaN(prms)) {

      return val < prms ? { "number": true } : null;
    } else {

      return null;
    }
  }
}