import { ErrorStateMatcher } from '@angular/material/core';
import { FormControl, FormGroupDirective } from '@angular/forms';

export class CheckFormControlForError implements ErrorStateMatcher {
  checkForm = false;

  isErrorState(control: FormControl | null, form: FormGroupDirective | null): boolean {
    return !!(control && control.invalid && (control.dirty || control.touched || this.checkForm));
  }
}
