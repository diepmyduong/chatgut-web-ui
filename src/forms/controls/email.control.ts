import { Validators } from '@angular/forms';

export const EmailFormControl = [
    '', Validators.compose([
        Validators.required,
        Validators.pattern('[A-Z0-9a-z._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,64}')
    ])
];

export var EmailValidateMessages = {
    required: 'Bắt buộc phải nhập',
    pattern: 'Email Không hợp lệ'
}