import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/model/product';
import { CommonService } from 'src/app/shared/common.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  product!: Product

  constructor(private activatedRoute: ActivatedRoute, private commonService: CommonService) {

    this.activatedRoute.paramMap.subscribe(params => {
      const productId = params.get('id')
      if (productId) {
        this.commonService.getProductById(productId).subscribe(response => {
            this.product = response
          })
      }else {
        console.error("Product ID not found in URL parameters");
      }
    }
    )
  }

  ngOnInit(): void {
  }

}
