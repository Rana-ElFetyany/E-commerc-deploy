import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../core/services/products.service';
import { ProductDetails } from '../../core/interfaces/product';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss',
})
export class DetailsComponent {
  productId: string | null = '';
  productDetails?: ProductDetails;
  private readonly _ActivatedRoute = inject(ActivatedRoute);
  private readonly _ProductsService = inject(ProductsService);

  sendData() {
    this._ProductsService.getProductDetails(this.productId).subscribe({
      next: (res) => {
        console.log(res);
        console.log(res.data);
        this.productDetails = res.data;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe({
      next: (param) => {
        console.log(param);
        console.log(param.get('id'));
        this.productId = param.get('id');
      },
    });

    // this._ActivatedRoute.snapshot.params['id'];
    // console.log(this.id);  // هنا يمكنك الحصول على ال id من الرابط
    // the difference from paramsMap that it is nit observable so it dose not subscribe ف مبتلقطش مبتسمعش معايا علططول اي تغيير
    // بيسمع بس لما اعمل refresh
    this.sendData();
  }
}
