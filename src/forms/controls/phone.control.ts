import { Validators,FormControl } from '@angular/forms';

var min = 10, max = 12;

export const PhoneFormControl = [
    '', //Default value
    Validators.compose([
        Validators.required, //Required
        Validators.minLength(min), 
        Validators.maxLength(max),
        Validators.pattern('\\d+')
    ])
];

export var PhoneValidateMessages = {
    required    : 'Bắt buộc phải nhập',
    minlength   : 'Ít nhất phải từ '+min+' ký tự',
    maxlength   : 'Không thể nhiều hơn '+max+' ký tự',
    pattern     : 'Chỉ có thể nhập số'
}