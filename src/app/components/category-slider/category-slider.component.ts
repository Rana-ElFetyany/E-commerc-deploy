import { Component, inject } from '@angular/core';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { CategoriesService } from '../../core/services/categories.service';
import { CategorySlider } from '../../core/interfaces/product';

@Component({
  selector: 'app-category-slider',
  standalone: true,
  imports: [CarouselModule],
  templateUrl: './category-slider.component.html',
  styleUrl: './category-slider.component.scss',
})
export class CategorySliderComponent {
  categories: CategorySlider[] = [];
  private readonly _CategoriesService = inject(CategoriesService);
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    margin:20,
    autoplay: true,
    autoplayTimeout: 1200,
    autoplayHoverPause: true,
    // slideTransition: 'linear',
    // smartSpeed: 1700,
    responsive: {
      0: {
        items: 1,
      },
      400: {
        items: 1,
      },
      740: {
        items: 1,
      },
      940: {
        items: 4,
      },
    },
    nav: true,
  };

  getCategoryService = () => {
    this._CategoriesService.getCategories().subscribe({
      next: (res) => {
        console.log(res.data);
        this.categories = res.data; 
      },
      error: (err) => {
        console.log(err);
      },
    });
  };

  ngOnInit(): void {
    this.getCategoryService();
  }
}
