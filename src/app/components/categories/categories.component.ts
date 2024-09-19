import { Component } from '@angular/core';
import { CategoriesService } from '../../core/services/categories.service';
import { Category } from '../../core/interfaces/product';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [NgFor],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss',
})
export class CategoriesComponent {
  allCategories: Category[] = [];
  constructor(private _CategoriesService: CategoriesService) {}

  getCategories = () => {
    this._CategoriesService.getCategories().subscribe({
      next: (res) => {
        console.log(res.data);
        this.allCategories = res.data
      },
      error: (err) => {
        console.log(err);
      },
    });
  };

  ngOnInit(): void {
    this.getCategories();
  }
}
