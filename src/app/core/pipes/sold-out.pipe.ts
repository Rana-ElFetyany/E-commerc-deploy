import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'soldOut',
  standalone: true
})
export class SoldOutPipe implements PipeTransform {

      transform(qty: number, limit:number):string| null{
        if (qty > limit) {
          return null;
        } else if (qty == 0) {
          return `Sold Out`;
        } else {
          return `only ${qty} in the stock`;
        }
      }

}

