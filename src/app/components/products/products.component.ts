import { Component, inject, OnInit } from '@angular/core';
import { ProductsService } from '../../core/services/products.service';
import { Product } from '../../core/interfaces/product';
import { RouterLink } from '@angular/router';
import { CartService } from './../../core/services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { WishlistService } from '../../core/services/wishlist.service';
import { SharedService } from '../shared.service';
import { CurrencyPipe, DatePipe, SlicePipe, UpperCasePipe } from '@angular/common';
import { SoldOutPipe } from '../../core/pipes/sold-out.pipe';
import { SearchPipe } from '../../core/pipes/search.pipe';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [
    RouterLink,
    DatePipe,
    CurrencyPipe,
    UpperCasePipe,
    SlicePipe,
    SoldOutPipe,
    SearchPipe,
    FormsModule
  ],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
})
export class ProductsComponent implements OnInit {
  searchTerm:string = ""
  allProducts: Product[] = [];
  // isHeartIconGreen: boolean = false;

  private readonly _CartService = inject(CartService);
  private readonly _WishlistService = inject(WishlistService);
  private readonly toaster = inject(ToastrService);
  private readonly sharedService = inject(SharedService); // Inject the shared service

  constructor(private _ProductsService: ProductsService) {}

  getProducts = () => {
    this._ProductsService.getProducts().subscribe({
      next: (res) => {
        console.log(res.data);
        this.allProducts = res.data;
      },
      error: (err) => {
        console.log(err);
      },
    });
  };

  addToCart = (productId: string) => {
    this._CartService.addProductToCart(productId).subscribe({
      next: (res) => {
        console.log(res);
      },
      error: (err) => {
        console.log(err);
      },
    });
    this.toaster.success('Product added successfully!', '', {
      timeOut: 3000,
      closeButton: true,
      progressBar: true,
      // positionClass: 'toast-bottom-right',
      // progressAnimation: 'increasing' ,
      // tapToDismiss: true,
    });
  };

  addToWishlist(productId: string) {
    this._WishlistService.addProductToWishlist(productId).subscribe({
      next: (res) => {
        console.log(res);
        this.sharedService.setHeartIconState(true); // Set the heart icon state to true
        setTimeout(() => {
          this.sharedService.setHeartIconState(false); // Revert the heart icon state after 3 seconds
        }, 3000);
        this.toaster.success('Product added to wishlist successfully!', '', {
          timeOut: 3000,
          closeButton: true,
          progressBar: true,
        });
      },
      error: (err) => {
        console.log(err);
        this.toaster.error('Failed to add product to wishlist!');
      },
    });
  }

  ngOnInit(): void {
    this.getProducts();
  }
}
