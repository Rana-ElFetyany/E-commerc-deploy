import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  private heartIconState = new BehaviorSubject<boolean>(false);
  heartIconState$ = this.heartIconState.asObservable();

  setHeartIconState(state: boolean) {
    this.heartIconState.next(state);
  }
}
