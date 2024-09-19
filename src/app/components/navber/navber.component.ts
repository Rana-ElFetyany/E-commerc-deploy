import { Component, SimpleChanges } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { SharedService } from '../shared.service';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-navber',
  standalone: true,
  imports: [RouterLink, RouterLinkActive,NgClass],
  templateUrl: './navber.component.html',
  styleUrl: './navber.component.scss',
})
export class NavberComponent {
  isHeartIconGreen: boolean = false;

  constructor(private _sharedService: SharedService) {}

  ngOnChanges(changes: SimpleChanges): void {
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add '${implements OnChanges}' to the class.
     console.log(this.isHeartIconGreen);
     this._sharedService.heartIconState$.subscribe((state) => {
       this.isHeartIconGreen = state;
     });
  }

  // ngOnInit(): void {
  //   console.log(this.isHeartIconGreen)
  //   this._sharedService.heartIconState$.subscribe((state) => {
  //     this.isHeartIconGreen = state;
  //   });
  // }
}