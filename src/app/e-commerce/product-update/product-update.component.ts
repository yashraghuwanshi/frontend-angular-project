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

  constructor(
    private fb: FormBuilder,
    private commonService: CommonService,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    this.updateForm = this.createFormGroup()
    this.getProductById();
  }

  getProductById() {
    this.route.paramMap.subscribe(params => {
      const productId = params.get('id')
      if (productId) {
        console.log(productId)
        this.commonService.getProductById(productId).subscribe(response => {
          this.product = response;
          this.updateForm.patchValue(this.product); // Set form values using patchValue

          // Clear existing suppliers array before adding new ones
          this.suppliersFormArray.clear();

          // Update form with supplier data (if available)
          if (this.product.suppliers) {
            this.product.suppliers.forEach(supplier => {
              this.suppliersFormArray.push(this.createSupplierFormGroup(supplier));
            });
          }
        })
      }
    })
  }

  createFormGroup(): FormGroup {
    return this.fb.group({
      id: [{ value: '', disabled: true}],
      name: ['', Validators.required],
      sku: ['', Validators.required],
      description: [''],
      price: ['', [Validators.required, Validators.min(0)]],
      quantity: ['', [Validators.required, Validators.min(0)]],
      suppliers: this.fb.array([])
    })
  }

  get suppliersFormArray(): FormArray {
    return this.updateForm.get('suppliers') as FormArray
  }

  createSupplierFormGroup(supplier?: any): FormGroup {
    return this.fb.group({
      id: [supplier?.id],
      name: [supplier?.name, Validators.required],
      phone: [supplier?.phone, [Validators.required, Validators.pattern(/^\d{10}$/)]],
      email: [supplier?.email, [Validators.required, Validators.email]],
      address: [supplier?.address, Validators.required]
    });
  }

  addSupplier(): void {
    this.suppliersFormArray.push(this.createSupplierFormGroup())
  }

  removeSupplier(index: number): void {
    this.suppliersFormArray.removeAt(index)
  }

  onSubmit() {
    console.log(this.updateForm.value)
    this.commonService.updateProduct(this.updateForm.value).subscribe()
    window.location.reload()
  }

}
