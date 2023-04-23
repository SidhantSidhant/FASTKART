import { Injectable } from "@angular/core";
import { AbstractControl, ValidationErrors } from "@angular/forms";



@Injectable({
    providedIn: 'root'
})
export class EmailValidation {
    static emailValidation(control: AbstractControl): ValidationErrors | null {
        let val = control.value as string;
        if (!val) {
            return null;
        }
        // let regexp = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9-_.]+\\.[a-zA-Z]{2,100}$/
        let regexp = /[a-z]@/
        const emailIsValid = regexp.test(val);
        if (!emailIsValid) {
            return { emailError: 'InValid Email' }
        } else {
            return null;
        }

    }
}








