import { FormGroup, FormControl, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { EmailFormControl, EmailValidateMessages } from './controls/email.control';
import { PhoneFormControl, PhoneValidateMessages } from './controls/phone.control';

export const OrderFormGroup  = (fb: FormBuilder) => {
    return fb.group({
        fullName   : ['',Validators.required],
        email       : EmailFormControl,
        phone       : PhoneFormControl,
        promotion   : [''],
        address     : ['',Validators.required]
    });
} 

export var OrderValidateMessages = {
    required    : 'Bắt buộc phải nhập',
    email: EmailValidateMessages,
    phone: PhoneValidateMessages
}