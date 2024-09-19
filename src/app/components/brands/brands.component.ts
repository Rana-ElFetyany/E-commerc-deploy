import { Component } from '@angular/core';
import { BrandsService } from '../../core/services/brands.service';
import { Brand } from '../../core/interfaces/product';

@Component({
  selector: 'app-brands',
  standalone: true,
  imports: [],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.scss',
})
export class BrandsComponent {
  allBrands:Brand[] = []
  constructor(private _BrandsService: BrandsService) {}

  getBrands = () =>{
    this._BrandsService.getBrands().subscribe({
      next:(res) =>{
        console.log(res.data)
        this.allBrands = res.data
      }
    })
  }

  ngOnInit(): void {
    this.getBrands()
  }
}
