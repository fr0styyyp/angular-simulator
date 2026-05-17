import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'plural',
})
export class PluralPipe implements PipeTransform {

  transform(value: number | string, firstFormat: string, secondFormat: string, thirdFormat: string): string {
    const number: number = Math.abs(Number(value));
    const remainder100: number = number % 100;
    const remainder10: number = number % 10;
    
    const isTeenExclusion: boolean = remainder100 >= 11 && remainder100 <= 14;
    const endsWithOne: boolean = remainder10 === 1;
    const endsWithFew: boolean = remainder10 >= 2 && remainder10 <= 4;
    
    if (isTeenExclusion) {
      return `${ number } ${ thirdFormat }`;
    } else if (endsWithOne) {
      return `${ number } ${ firstFormat }`;
    } else if (endsWithFew) {
      return `${ number } ${ secondFormat }`;
    } else {
      return `${ number } ${ thirdFormat }`;
    }
  }

}
