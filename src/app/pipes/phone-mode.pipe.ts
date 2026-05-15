import { Pipe, PipeTransform } from '@angular/core';
import { PhoneMode } from '../types/PhoneMode';

@Pipe({
  name: 'phoneMode',
})
export class PhoneModePipe implements PipeTransform {

  transform(value: number | string, phoneMode: PhoneMode = 'international'): string {
    if (!value) return '';
    const clean: string = value.toString().replace(/\D/g, '');
    
    const country: string = clean.slice(0, 2);
    const op: string = clean.slice(2, 5);
    const g1: string = clean.slice(5, 8);
    const g2: string = clean.slice(8, 10);
    const g3: string = clean.slice(10, 12);
    
    switch (phoneMode) {
      case 'compact':
        return `+${country}${op}${g1}${g2}${g3}`;
      case 'international':
        return `+${country} ${op} ${g1} ${g2} ${g3}`;
      case 'national':
        return `${op} ${g1} ${g2} ${g3}`;
      case 'masked':
        return `+${country} ${op} *** ** ${g3}`;
      default:
        return clean;
    }
  }

}
