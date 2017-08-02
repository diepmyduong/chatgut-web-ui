import { FormGroup, FormControl, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { PasswordFormControl , PasswordValidateMessages } from './controls/password.control';
import { EmailFormControl, EmailValidateMessages } from './controls/email.control';
import { PhoneFormControl, PhoneValidateMessages } from './controls/phone.control';

function passwordMatcher(c: AbstractControl){
    return c.get('password').value === c.get('confirm').value
        ? null : { 'passwordNotMatch': true};
}

export const RegistrationFormGroup  = (fb: FormBuilder) => {
    return fb.group({
        fullName   : ['',Validators.required],
        email       : EmailFormControl,
        phone       : PhoneFormControl,
        password    : PasswordFormControl,
        confirm     : ['',Validators.required],
    }, { validator: passwordMatcher});
} 

export var RegistrationValidateMessages = {
    required    : 'Bắt buộc phải nhập',
    passwordNotMatch: 'Mật khẩu không khớp',
    password: PasswordValidateMessages,
    email: EmailValidateMessages,
    phone: PhoneValidateMessages
}

export const RegisWithProviderFormGroup = (fb: FormBuilder) => {
    return fb.group({
        fullName   : ['',Validators.required],
        email       : EmailFormControl,
        phone       : PhoneFormControl,
    });
} 