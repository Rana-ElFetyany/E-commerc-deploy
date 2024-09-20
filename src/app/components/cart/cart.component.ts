import { Component, inject } from '@angular/core';
import { CartService } from '../../core/services/cart.service';
import { Cart } from '../../core/interfaces/cart';
import { ToastrService } from 'ngx-toastr';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
})
export class CartComponent {
  cart: Cart = {} as Cart;
  isLoading: boolean = true;
  itemQTN: number = 2;

  private readonly _CartService = inject(CartService);
  private readonly toaster = inject(ToastrService);

  getLoggedUserCart() {
    this._CartService.getLoggedUserCart().subscribe({
      next: (res) => {
        console.log(res);
        this.cart = res;
        this.isLoading = false;
      },
      error: (err) => {
        console.log(err);
        this.isLoading = false;
      },
    });
  }


  deleteItem(productId: string) {
    this._CartService.RemoveItemFromCart(productId).subscribe({
      next: (res) => {
        console.log(res);
        // this.getLoggedUserCart();
        this.cart = res; //only used when the res of teh 2 request 35, 36 are the same
        this._CartService.cartCounter.next(res.numOfCartItems);
        this.itemQTN = res.data.products.quantity;
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

  updateQTY(productId: string, count: number) {
    this._CartService.updateProductQTY(productId, count).subscribe({
      next: (res) => {
        console.log(res);
        this.cart = res; //only used when the res of teh 2 request 35, 36 are the same
        this.cart = res; //only used when the res of teh 2 request 35, 36 are the same
        this.toaster.success('Product updated successfully!', '', {
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
    this.getLoggedUserCart();
  }
}

