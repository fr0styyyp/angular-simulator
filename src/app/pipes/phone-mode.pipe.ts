import { Pipe, PipeTransform } from '@angular/core';
import { PhoneMode } from '../types/PhoneMode';

@Pipe({
  name: 'phoneMode',
})
export class PhoneModePipe implements PipeTransform {

  transform(value: number | string, mode: PhoneMode = 'international'): string {
    if (!value) return '';
    const clean = value.toString().replace(/\D/g, '');
    
    const country = clean.slice(0, 2);
    const op = clean.slice(2, 5);
    const g1 = clean.slice(5, 8);
    const g2 = clean.slice(8, 10);
    const g3 = clean.slice(10, 12);
    
    switch (mode) {
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
