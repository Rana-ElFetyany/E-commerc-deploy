import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { baseUrl } from '../environment/environment.local';

@Injectable({
  providedIn: 'root',
})
export class WishlistService {
  headers = { token: localStorage.getItem('token')! };

  constructor(private _HttpClient: HttpClient) {}

  addProductToWishlist = (productId: string): Observable<any> => {
    return this._HttpClient.post(
      baseUrl + '/api/v1/wishlist',
      { productId },
      { headers: { ...this.headers } }
    );
  };

  RemoveItemFromWishlist = (productId: string): Observable<any> => {
    return this._HttpClient.delete(baseUrl + '/api/v1/wishlist/' + productId, {
      headers: { ...this.headers },
    });
  };

  getLoggedUserWishlist = (): Observable<any> => {
    return this._HttpClient.get(baseUrl + '/api/v1/wishlist', {
      headers: { ...this.headers },
    });
  };
}
