import { Injectable } from "@angular/core";
import { AbstractControl, ValidationErrors } from "@angular/forms";




@Injectable({
    providedIn : 'root'
})
export class PasswordValidation{
    static passwordvalidation(control : AbstractControl) : ValidationErrors | null{
            const value = control.value as string;
            const regb = /[1-9]/;
            
            const paswwordValid = regb.test(value);
           return !paswwordValid ? {passwordError : 'invalid password'} : null
    }
}