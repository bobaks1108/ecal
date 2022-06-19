import { AbstractControl, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';

export class CustomValidators extends Validators{

   static startDateValidator(fdValue: FormControl) {
    const date = fdValue.value;
    if (date ===null || date==='' || date==='Invalid Date') { 
      return { requiredStartDate: true } 
    } else {
      return { }
    };
  
  }

  static endDateValidator(fdValue: FormControl) {
    const date = fdValue.value;
    if (date ===null || date==='' || date==='Invalid Date') { 
      return { endDateValidator: true } 
    } else {
      return { }
    };
  
  }


}