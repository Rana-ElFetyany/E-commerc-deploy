import { Component, inject } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { SliderComponent } from "../slider/slider.component";
import { CategorySliderComponent } from "../category-slider/category-slider.component";
import { Product } from '../../core/interfaces/product';
import { ToastrService } from 'ngx-toastr';
import { Wishlist } from '../../core/interfaces/wishlist';
import { CartService } from '../../core/services/cart.service';
import { ProductsService } from '../../core/services/products.service';
import { SharedService } from '../../core/services/shared.service';
import { WishlistService } from '../../core/services/wishlist.service';
import { RouterLink } from '@angular/router';
import { SearchPipe } from '../../core/pipes/search.pipe';
import { SoldOutPipe } from '../../core/pipes/sold-out.pipe';
import { FormsModule } from '@angular/forms';
import { NgxSpinnerModule } from 'ngx-spinner';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    RouterLink,
    SliderComponent,
    CategorySliderComponent,
    SearchPipe,
    SoldOutPipe,
    FormsModule,
    NgxSpinnerModule,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  searchTerm: string = '';
  allProducts: Product[] = [];
  wishlist: Wishlist = {} as Wishlist;
  inFavorite: boolean = false;
  // isHeartIconGreen: boolean = false;

  private readonly _token = inject(AuthService);
  private readonly _CartService = inject(CartService);
  private readonly _WishlistService = inject(WishlistService);
  private readonly _SharedService = inject(SharedService);
  private readonly toaster = inject(ToastrService);

  constructor(private _ProductsService: ProductsService) {
    this._token.saveUserData();
  }

  getProducts = () => {
    this._ProductsService.getProducts().subscribe({
      next: (res) => {
        console.log(res.data);
        this.allProducts = res.data;
        // for(let i=0; i<this.allProducts.length; i++) {
        //   this.isItemInWishlist(this.allProducts[i]._id)
        // }
      },
      error: (err) => {
        console.log(err);
      },
    });
  };

  getWishList() {
    this._WishlistService.getLoggedUserWishlist().subscribe({
      next: (res) => {
        console.log(res);
        this.wishlist = res;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  isItemInWishlist(productId: string): boolean {
    if (!this.wishlist.data) {
      return false;
    } else if (
      this.wishlist.data.some((product) => product._id === productId)
    ) {
      this.inFavorite = true;
      return true;
    } else {
      return false;
    }
  }

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
    if (this.isItemInWishlist(productId)) {
      // this.toaster.warning('Product is already in wishlist!', '', {
      //   timeOut: 3000,
      //   closeButton: true,
      //   progressBar: true,
      // });
      return;
    }

    this._WishlistService.addProductToWishlist(productId).subscribe({
      next: (res) => {
        console.log(res);
        // make the heart in nav yo light during add to wishlist
        this._SharedService.setHeartIconState(true); // Set the heart icon state to true
        setTimeout(() => {
          this._SharedService.setHeartIconState(false); // Revert the heart icon state after 3 seconds
        }, 3000);
        this.toaster.success('Product added to wishlist successfully!', '', {
          timeOut: 3000,
          closeButton: true,
          progressBar: true,
        });
        this.getProducts();
        this.isItemInWishlist(productId);
      },
      error: (err) => {
        console.log(err);
        this.toaster.error('Failed to add product to wishlist!');
      },
    });
  }

  deleteFromWishlist(productId: string) {
    if (!this.isItemInWishlist(productId)) {
      // this.toaster.warning('Product is not in wishlist!', '', {
      //   timeOut: 3000,
      //   closeButton: true,
      //   progressBar: true,
      // });
      return;
    }

    this._WishlistService.RemoveItemFromWishlist(productId).subscribe({
      next: (res) => {
        console.log(res);
        this.getWishList(); //only used when the res of teh 2 request 193, 194 are the same
        this.wishlist = res;
        this.toaster.success('Product deleted successfully!', '', {
          timeOut: 3000,
          closeButton: true,
          progressBar: true,
        });
        this.getProducts();
        this.isItemInWishlist(productId);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  ngOnInit(): void {
    this.getProducts();
    this.getWishList();
  }
}
