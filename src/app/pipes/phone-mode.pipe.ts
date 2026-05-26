import { Pipe, PipeTransform } from '@angular/core';
import { PhoneMode } from '../../enums/PhoneMode';

@Pipe({
  name: 'phoneMode',
})
export class PhoneModePipe implements PipeTransform {

  transform(value: number | string, phoneMode: PhoneMode): string {
    if (!value) return '';
    const clean: string = value.toString().replace(/\D/g, '');
    if (clean.length < 10) {
      return clean;
    }
    
    const body: string = clean.slice(-7);
    const op: string = clean.slice(-10, -7);
    const country: string = clean.slice(0, -10)
    const g1: string = body.slice(0, 3);
    const g2: string = body.slice(3, 5);
    const g3: string = body.slice(5, 7);
    
    switch (phoneMode) {
      case PhoneMode.COMPACT:
        return `+${ country }${ op }${ g1 }${ g2 }${ g3 }`;
      case PhoneMode.INTERNATIONAL:
        return `+${ country } ${ op } ${ g1 } ${ g2 } ${ g3 }`;
      case PhoneMode.NATIONAL:
        return `${ op } ${ g1 } ${ g2 } ${ g3 }`;
      case PhoneMode.MASKED:
        return `+${ country } ${ op } *** ** ${ g3 }`;
      default:
        return clean;
    }
  }

}
