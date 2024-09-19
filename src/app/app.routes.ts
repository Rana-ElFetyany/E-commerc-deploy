import { Routes } from '@angular/router';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { SignupComponent } from './components/signup/signup.component';
import { SigninComponent } from './components/signin/signin.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { HomeComponent } from './components/home/home.component';
import { CartComponent } from './components/cart/cart.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { BrandsComponent } from './components/brands/brands.component';
import { ProductsComponent } from './components/products/products.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { OrdersComponent } from './components/orders/orders.component';
import { authGuard } from './core/guards/auth.guard';
import { isLoggedInGuard } from './core/guards/is-logged-in.guard';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { DetailsComponent } from './components/details/details.component';
import { AddressComponent } from './components/address/address.component';
import { WishlistComponent } from './components/wishlist/wishlist.component';

export const routes: Routes = [
  {
    path: '',
    component: AuthLayoutComponent,
    canActivate: [isLoggedInGuard],
    children: [
      { path: '', redirectTo: 'signin', pathMatch: 'full' },
      { path: 'signup', component: SignupComponent, title: 'Signin' },
      { path: 'signin', component: SigninComponent, title: 'Signup' },
      {
        path: 'forgot',
        component: ForgotPasswordComponent,
        title: 'Forgot password',
      },
    ],
  },
  {
    path: '',
    component: MainLayoutComponent,
    canActivate: [authGuard],

    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: HomeComponent, title: 'Home' },
      { path: 'cart', component: CartComponent, title: 'Cart' },
      { path: 'wishlist', component: WishlistComponent, title: 'Wishlist' },

      {
        path: 'categories',
        component: CategoriesComponent,
        title: 'Categories',
      },
      { path: 'brands', component: BrandsComponent, title: 'Brands' },
      { path: 'products', component: ProductsComponent, title: 'Products' },
      {
        path: 'pro-details',
        component: ProductDetailsComponent,
        title: 'Details',
      },
      { path: 'order', component: OrdersComponent, title: '  Order' },
      { path: 'details/:id', component: DetailsComponent, title: '  Details' },
      { path: 'address/:id', component: AddressComponent, title: '  Address' },
    ],
  },
  { path: '**', component: NotFoundComponent, title: 'NotFound' },
];
