import { Component, inject } from '@angular/core';
import { WishlistService } from '../../core/services/wishlist.service';
import { ToastrService } from 'ngx-toastr';
import { Wishlist } from '../../core/interfaces/wishlist';

@Component({
  selector: 'app-wishlist',
  standalone: true,
  imports: [],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.scss',
})
export class WishlistComponent {
  wishlist: Wishlist = {} as Wishlist;
  isLoading: boolean = true;
  itemQTN: number = 2;
  Loading: boolean = true;

  private readonly _WishlistService = inject(WishlistService);
  private readonly toaster = inject(ToastrService);

  getLoggedUserWishList() {
    this._WishlistService.getLoggedUserWishlist().subscribe({
      next: (res) => {
        console.log(res);
        this.Loading = false;
      },
      error: (err) => {
        console.log(err);
        this.Loading = false;
      },
    });
  }

  deleteItem(productId: string) {
    this._WishlistService.RemoveItemFromWishlist(productId).subscribe({
      next: (res) => {
        console.log(res);
        // this.getLoggedUserCart();
        // this.cart = res; //only used when the res of teh 2 request 35, 36 are the same
        this.itemQTN = res.data.products.product.quantity;
        this.toaster.success('Product deleted successfully!', '', {
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

  ngOnInit(): void {
    this.getLoggedUserWishList();
  }
}
