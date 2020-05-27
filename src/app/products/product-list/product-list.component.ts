import { Component, OnInit, OnDestroy } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Subscription } from 'rxjs';

import { Product } from '../product.model';
import { ProductsService } from '../products.service';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit, OnDestroy {
  products = [];
  isLoading = false;
  totalProducts = 0;
  productsPerPage = 3;
  currentPage = 1;
  pageSizeOptions = [1, 2, 3];
  userIsAuthenticated = false;
  userId: string;
  private productsSub: Subscription;
  private authStatusSub: Subscription;

  constructor(
    public productsService: ProductsService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.isLoading = true;
    this.productsService.getProducts(this.productsPerPage, this.currentPage);
    // this.userId = this.authService.getUserId();
    this.productsSub = this.productsService
      .getPostUpdateListener()
      .subscribe((postData: { products: Product[]; productCount: number }) => {
        this.isLoading = false;
        this.products = postData.products;
        this.totalProducts = postData.productCount;
      });
  }

  onDetails() {}

  addToCart() {}

  onChangedPage(pageData: PageEvent) {
    this.isLoading = true;
    this.currentPage = pageData.pageIndex + 1;
    this.productsPerPage = pageData.pageSize;
    this.productsService.getProducts(this.productsPerPage, this.currentPage);
  }

  ngOnDestroy() {
    this.productsSub.unsubscribe();
    // this.authStatusSub.unsubscribe();
  }
}
