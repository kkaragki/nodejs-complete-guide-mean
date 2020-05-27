import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';

import { Product } from '../product.model';
import { ProductsService } from '../products.service';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css']
})
export class ProductItemComponent implements OnInit, OnDestroy {
  userIsAuthenticated = false;
  product: Product;
  isLoading = false;
  imagePreview: string;
  private productId: string;

  constructor(public productsService: ProductsService, public route: ActivatedRoute) {}

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      this.productId = paramMap.get('productId');
      this.isLoading = true;
      this.productsService.getProduct(this.productId).subscribe(productData => {
        this.isLoading = false;
        this.product = {
          id: productData._id,
          title: productData.title,
          imageURL: productData.imageURL,
          price: productData.price,
          description: productData.description
        };
        this.imagePreview = this.product.imageURL;
      });
    });
  }

  addToCart() {}

  ngOnDestroy() {

  }

}
