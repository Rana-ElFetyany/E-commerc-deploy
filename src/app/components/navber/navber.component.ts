import { Component, inject, SimpleChanges } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { SharedService } from '../../core/services/shared.service';
import { NgClass } from '@angular/common';
import { CartService } from './../../core/services/cart.service';
import { WishlistService } from '../../core/services/wishlist.service';

@Component({
  selector: 'app-navber',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, NgClass],
  templateUrl: './navber.component.html',
  styleUrl: './navber.component.scss',
})
export class NavberComponent {
  isHeartIconGreen: boolean = false;
  cartCounter: number = 0;
  wishCounter: number = 0;

  private readonly _CartService = inject(CartService);
  private readonly _WishlistService = inject(WishlistService);

  constructor(private _sharedService: SharedService) {}

  // ngAfterViewChecked(): void {
  //   //Called after every check of the component's view. Applies to components only.
  //   //Add 'implements AfterViewChecked' to the class.
  //   //console.log(this.isHeartIconGreen);
  //   this._sharedService.heartIconState$.subscribe((state) => {
  //     this.isHeartIconGreen = state;
  //   });
  // }

  getLoggedUserCart() {
    this._CartService.getLoggedUserCart().subscribe({
      next: (res) => {
        this._CartService.cartCounter.next(res.numOfCartItems);
      },
      error: (err) => {},
    });
  }

  getLoggedUserWishList() {
    this._WishlistService.getLoggedUserWishlist().subscribe({
      next: (res) => {
        console.log(res);
        this._WishlistService.wishCounter.next(res.data.length);
      },
      error: (err) => {

      },
    });
  }

  ngOnInit(): void {
    this.getLoggedUserCart();
    this.getLoggedUserWishList()
    this._CartService.cartCounter.subscribe({
      next: (count) => {
        this.cartCounter = count;
      },
    });
    this._WishlistService.wishCounter.subscribe({
      next: (count) => {
        this.wishCounter = count;
      },
    });
  }
}
