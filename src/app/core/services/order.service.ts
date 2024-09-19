import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { baseUrl } from '../environment/environment.local';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  headers = { token: localStorage.getItem('token')! };

  constructor(private _HttpClient: HttpClient) {}

  createSession = (cartId: string, shippingAddress:object): Observable<any> => {
    return this._HttpClient.post(
      baseUrl +
        '/api/v1/orders/checkout-session/' +
        cartId +
        '?url=http://localhost:4200/cart',
      {
        shippingAddress,
      },
      { headers: { ...this.headers } }
    );
  };
}
