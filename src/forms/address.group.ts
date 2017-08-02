import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';


export const AddressFormGroup  = (fb: FormBuilder) => {
    return fb.group({
        address : ['',Validators.required],
        area    : ['',Validators.required]
    });
    
} 

export var AddressValidateMessages = {
    address: 'Chưa chọn địa chỉ giao hàng',
    area: 'Khu vực không xác định'
}