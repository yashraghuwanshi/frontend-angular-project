import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Product } from 'src/app/model/product';
import { CommonService } from 'src/app/shared/common.service';

@Component({
  selector: 'app-product-search',
  templateUrl: './product-search.component.html',
  styleUrls: ['./product-search.component.css']
})
export class ProductSearchComponent implements OnInit {

  product?: Product;
  searchForm: FormGroup;

  constructor(private fb: FormBuilder, private commonService: CommonService) {
     // Initialize the form group
     this.searchForm = this.fb.group({
      name: ['', [Validators.required]]
    });
   }

  ngOnInit(): void {
    this.getProductByName()
  }


  getProductByName(): void {
    const productName = this.searchForm.get('name')?.value;
    if (productName) {
      console.log('Product Name:', productName); // Log the product name
      this.commonService.getProductByName(productName).subscribe((response) => {
        this.product = response
        console.log('Product:', this.product); // Log the product response
      })
    }
  }
}
