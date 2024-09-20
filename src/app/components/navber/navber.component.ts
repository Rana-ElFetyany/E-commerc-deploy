import { Component, inject, SimpleChanges } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { SharedService } from '../../core/services/shared.service';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-navber',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, NgClass],
  templateUrl: './navber.component.html',
  styleUrl: './navber.component.scss',
})
export class NavberComponent {
  isHeartIconGreen: boolean = false;

  constructor(private _sharedService: SharedService) {}

  ngAfterViewChecked(): void {
    //Called after every check of the component's view. Applies to components only.
    //Add 'implements AfterViewChecked' to the class.
    //console.log(this.isHeartIconGreen);
    this._sharedService.heartIconState$.subscribe((state) => {
      this.isHeartIconGreen = state;
    });
  }

  ngOnInit(): void {}
}
