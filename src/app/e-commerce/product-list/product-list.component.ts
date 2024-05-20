import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/model/product';
import { CommonService } from 'src/app/shared/common.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  products!: Product[]

  constructor(private commonService: CommonService, private router: Router) {
    this.commonService.getProducts().subscribe(
      (response) => {
        this.products = response
      }
    )
  }

  ngOnInit(): void {
  }

  deleteProduct(id: string) {
    this.commonService.deleteProduct(id).subscribe()
    window.location.reload()
  }

}

