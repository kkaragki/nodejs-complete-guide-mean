import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';

import { Product } from './product.model';
import { environment } from 'src/environments/environment';

const BACKEND_URL = environment.apiURL + '/products/';

@Injectable({ providedIn: 'root' })
export class ProductsService {
  private products: Product[] = [];
  private productsUpdated = new Subject<{ products: Product[]; productCount: number }>();

  constructor(private http: HttpClient) {}

  getProducts(postsPerPage: number, currentPage: number) {
    const queryParams = `?pagesize=${postsPerPage}&page=${currentPage}`;
    this.http
      .get<{ message: string; products: any; maxProducts: number }>(
        BACKEND_URL + queryParams
      )
      .pipe(
        map((productData) => {
          return {
            products: productData.products.map((product) => {
              return {
                id: product._id,
                title: product.title,
                imageURL: product.imageURL,
                price: product.price,
                description: product.description,
              };
            }),
            maxProducts: productData.maxProducts,
          };
        })
      )
      .subscribe(transformedProductData => {
        this.products = transformedProductData.products;
        this.productsUpdated.next({
          products: [...this.products],
          productCount: transformedProductData.maxProducts,
        });
      })
  }

  getPostUpdateListener() {
    return this.productsUpdated.asObservable();
  }

  getProduct(id: string) {
    return this.http.get<{
      _id: string;
      title: string;
      imageURL: string;
      price: number;
      description: string;
    }>(BACKEND_URL + id);
  }
}

