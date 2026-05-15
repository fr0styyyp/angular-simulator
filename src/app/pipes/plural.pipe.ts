import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'plural',
})
export class PluralPipe implements PipeTransform {

  transform(value: number | string, firstFormat: string, secondFormat: string, thirdFormat: string): string {
    const number: number = Math.abs(Number(value));
    
    if (number % 10 === 1 && number % 100 !== 11) {
      return firstFormat;
    }
    if (number % 10 >= 2 && number % 10 <= 4 && (number % 100 < 10 || number % 100 >= 20)) {
      return secondFormat;
    }
    return thirdFormat;
  }

}
