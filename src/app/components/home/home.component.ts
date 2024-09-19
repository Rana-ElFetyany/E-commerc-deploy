import { Component, inject } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { SliderComponent } from "../slider/slider.component";
import { CategorySliderComponent } from "../category-slider/category-slider.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [SliderComponent, CategorySliderComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  private readonly _token = inject(AuthService);
  constructor(){
    this._token.saveUserData();
    // call this func here as is anyone try to chang the token it will be cleared
  }
}
