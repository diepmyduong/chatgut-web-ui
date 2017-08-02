import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { PasswordFormControl , PasswordValidateMessages } from './controls/password.control';
import { PhoneFormControl, PhoneValidateMessages } from './controls/phone.control';


export const LoginFormGroup  = (fb: FormBuilder) => {
    return fb.group({
        phone       : PhoneFormControl,
        password    : PasswordFormControl
    });
    
} 

export var LoginValidateMessages = {
    password: PasswordValidateMessages,
    phone: PhoneValidateMessages
}