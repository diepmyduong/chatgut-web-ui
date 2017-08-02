import { Validators } from '@angular/forms';

var min = 6, max = 20;

export const PasswordFormControl = [
    '', Validators.compose([
        Validators.required,
        Validators.minLength(min),
        Validators.maxLength(max),
        Validators.pattern('[a-zA-Z0-9\-_]+')
    ])
];

export var PasswordValidateMessages = {
    required        : 'Bắt buộc phải nhập',
    minlength       : 'Ít nhất phải từ '+min+' ký tự',
    maxlength       : 'Không thể nhiều hơn '+max+' ký tự',
    pattern         : 'Chỉ có thể nhập ký tự và số'
}