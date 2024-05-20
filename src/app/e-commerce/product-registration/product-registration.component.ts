import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Supplier } from 'src/app/model/supplier';
import { CommonService } from 'src/app/shared/common.service';

@Component({
  selector: 'app-product-registration',
  templateUrl: './product-registration.component.html',
  styleUrls: ['./product-registration.component.css']
})
export class ProductRegistrationComponent implements OnInit {

  registrationForm!: FormGroup;

  constructor(private fb: FormBuilder, private commonService: CommonService) {
    this.registrationForm = this.createFormGroup()
  }

  ngOnInit(): void {
  }

  createFormGroup(): FormGroup {
    return this.fb.group({
      id: [{value: '', disabled: true}],
      name: ['', Validators.required],
      sku: ['', Validators.required],
      description: [''],
      price: ['', [Validators.required, Validators.min(0)]],
      quantity: ['', [Validators.required, Validators.min(0)]],
      suppliers: this.fb.array([])
    })
  }

  get suppliersFormArray(): FormArray {
    return this.registrationForm.get('suppliers') as FormArray
  }

  createSupplierFormGroup(): FormGroup {
    return this.fb.group({
      id: [''],
      name: ['', Validators.required],
      phone: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      email: ['', [Validators.required, Validators.email]],
      address: ['', Validators.required]
    })
  }

  addSupplier(): void {
    this.suppliersFormArray.push(this.createSupplierFormGroup())
  }

  setSuppliers(suppliers: Supplier[]): void {
    // Add new suppliers from the provided array
    suppliers.forEach(supplier => this.suppliersFormArray.push(this.fb.group(supplier)))
  }


  removeSupplier(index: number): void {
    this.suppliersFormArray.removeAt(index)
  }

  removeAllSuppliers(): void {
    // Clear existing suppliers
    this.suppliersFormArray.clear()
  }

  onSubmit() {
    if (this.registrationForm.valid) {
      console.log(this.registrationForm.value)
      this.commonService.saveProduct(this.registrationForm.value).subscribe(
        (response) => {
          console.log(response)
        }
      )
    }
  }
}
