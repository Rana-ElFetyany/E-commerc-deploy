import { Component, inject } from '@angular/core';
import { WishlistService } from '../../core/services/wishlist.service';
import { ToastrService } from 'ngx-toastr';
import { Wishlist } from '../../core/interfaces/wishlist';
import { SoldOutPipe } from '../../core/pipes/sold-out.pipe';
import { CartService } from '../../core/services/cart.service';

@Component({
  selector: 'app-wishlist',
  standalone: true,
  imports: [SoldOutPipe],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.scss',
})
export class WishlistComponent {
  wishlist: Wishlist = {} as Wishlist;
  itemQTN: number = 2;
  isLoading: boolean = true;

  private readonly _WishlistService = inject(WishlistService);
  private readonly toaster = inject(ToastrService);
  private readonly _CartService = inject(CartService);

  getLoggedUserWishList() {
    this._WishlistService.getLoggedUserWishlist().subscribe({
      next: (res) => {
        console.log(res);
        this.isLoading = false;
        this.wishlist = res;
      },
      error: (err) => {
        console.log(err);
        this.isLoading = false;
      },
    });
  }

  deleteItem(productId: string) {
    this._WishlistService.RemoveItemFromWishlist(productId).subscribe({
      next: (res) => {
        console.log(res);
        this._WishlistService.wishCounter.next(res.data.length);
        this.getLoggedUserWishList();
        this.wishlist = res; //only used when the res of teh 2 request 35, 36 are the same
        this.toaster.error('Product deleted successfully!', '', {
          timeOut: 3000,
          closeButton: true,
          progressBar: true,
        });
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  addToCart = (productId: string) => {
    this._CartService.addProductToCart(productId).subscribe({
      next: (res) => {
        console.log(res);
        this._CartService.cartCounter.next(res.numOfCartItems);

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

  ngOnInit(): void {
    this.getLoggedUserWishList();
  }
}
