import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProductListComponent } from './products/product-list/product-list.component';
import { ProductCreateComponent } from './products/product-create/product-create.component';
import { ProductItemComponent } from './products/product-item/product-item.component';
import { CartComponent } from './shop/cart/cart.component';
import { OrdersComponent } from './shop/orders/orders.component';

import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
  { path: '', component: ProductListComponent },
  { path: 'products', component: ProductListComponent },
  {
    path: 'products/:productId',
    component: ProductItemComponent,
    // canActivate: [AuthGuard],
  },
  { path: 'cart', component: CartComponent },
  { path: 'orders', component: OrdersComponent },
  { path: 'create', component: ProductCreateComponent, canActivate: [AuthGuard] },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
  },
  // {
  //   path: 'admin',
  //   loadChildren: () => import('./admin/admin.module').then((m) => m.AdminModule), // /add-product + /products
  // },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard],
})
export class AppRoutingModule {}
