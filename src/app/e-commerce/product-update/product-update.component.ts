import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/model/product';
import { CommonService } from 'src/app/shared/common.service';

@Component({
  selector: 'app-product-update',
  templateUrl: './product-update.component.html',
  styleUrls: ['./product-update.component.css']
})
export class ProductUpdateComponent implements OnInit {

  updateForm!: FormGroup
  product!: Product

  constructor(private fb: FormBuilder, private commonService: CommonService, private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.updateForm = this.createFormGroup()
    this.getProductById();
  }

  getProductById() {
    this.activatedRoute.paramMap.subscribe(params => {
      const productId = params.get('id')
      if (productId) {
        console.log(productId)

        this.commonService.getProductById(productId).subscribe(response => {
          this.product = response;

          console.log('product', this.product)

          this.suppliersFormArray.clear()

          // Patch form values with fetched product data
          this.updateForm.patchValue(this.product);

          // Add each supplier to the form array
          if (this.product.suppliers && this.product.suppliers.length > 0) {
            this.product.suppliers.forEach(supplier => {
              this.addOrUpdateSupplier(supplier)
            });
          }
          console.log('Update Form', this.updateForm.value)
        });
      } else {
        console.error("Product ID not found in URL parameters");
      }
    })
  }


  createFormGroup(): FormGroup {
    return this.fb.group({
      id: [{ value: '' }],
      name: ['', Validators.required],
      sku: ['', Validators.required],
      description: [''],
      price: [0, [Validators.required, Validators.min(0)]],
      quantity: [0, [Validators.required, Validators.min(0)]],
      suppliers: this.fb.array([])
    })
  }

  createSupplierFormGroup(supplier: any = {}): FormGroup {
    return this.fb.group({
      id: [supplier.id || ''],
      name: [supplier.name || '', Validators.required],
      phone: [supplier.phone || '', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      email: [supplier.email || '', [Validators.required, Validators.email]],
      address: [supplier.address || '', Validators.required]
    });
  }

  get suppliersFormArray(): FormArray {
    return this.updateForm.get('suppliers') as FormArray
  }

  addSupplier() {
    this.suppliersFormArray.push(this.createSupplierFormGroup())
  }

  addOrUpdateSupplier(supplier: any) {
    const existingSupplierIndex = this.suppliersFormArray.controls.findIndex((control) => control.value.id === supplier.id);

    if (existingSupplierIndex !== -1) {
      // Update existing supplier
      this.suppliersFormArray.at(existingSupplierIndex).patchValue(supplier);
    } else {
      // Add new supplier
      this.suppliersFormArray.push(this.createSupplierFormGroup(supplier));
    }
  }

  removeSupplier(index: number): void {
    this.suppliersFormArray.removeAt(index)
  }

  onSubmit() {
    if (this.updateForm.valid) {
      const updatedProduct = this.updateForm.value;
      console.log('Updated Product:', updatedProduct);
      console.log('Updated Form ID:', updatedProduct.id)
      this.commonService.updateProduct(updatedProduct).subscribe(() => {
        alert('Product updated successfully!')
        setTimeout(() => {
          window.location.reload()
        }, 2000); // 2000 milliseconds = 2 seconds
      });
    }
  }
}
