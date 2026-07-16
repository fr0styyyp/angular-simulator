import { inject, Pipe, PipeTransform } from '@angular/core';
import { DATE_FORMAT_TOKEN } from '../tokens/date-format-token';
import { IDateFormatProvider } from '../interfaces/IDateFormatProvider';

@Pipe({
  name: 'appDate',
  pure: false
})
export class AppDatePipe implements PipeTransform {
  
  private readonly dateFormatProvider: IDateFormatProvider = inject(DATE_FORMAT_TOKEN);
  
  transform(value: Date | string): string {
    const parsedDate: Date = new Date(value);
    const day: string = String(parsedDate.getDate()).padStart(2, '0');
    const month: string = String(parsedDate.getMonth() + 1).padStart(2, '0');
    const year: string = String(parsedDate.getFullYear());
    const hour: string = String(parsedDate.getHours()).padStart(2, '0');
    const minute: string = String(parsedDate.getMinutes()).padStart(2, '0');
    
    const format: string = this.dateFormatProvider.getCurrentFormat();
    const [datePart, timePart]: string[] = format.split(' ');
    const formattedDate: string = datePart
      .replace('dd', day)
      .replace('mm', month)
      .replace('yyyy', year);
    const formattedTime: string = timePart
      .replace('hh', hour)
      .replace('mm', minute);
    
    return `${ formattedDate } ${ formattedTime }`;
  }

}
