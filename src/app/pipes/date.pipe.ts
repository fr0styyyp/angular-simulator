import { inject, Pipe, PipeTransform } from '@angular/core';
import { DATE_FORMAT_TOKEN } from '../tokens/date-format-token';

@Pipe({
  name: 'appDate',
})
export class AppDatePipe implements PipeTransform {
  
  private readonly dateFormat: string = inject(DATE_FORMAT_TOKEN);
  
  transform(value: Date | string): string {
    const parsedDate: Date = new Date(value);
    const day: string = String(parsedDate.getDate()).padStart(2, '0');
    const month: string = String(parsedDate.getMonth() + 1).padStart(2, '0');
    const year: string = String(parsedDate.getFullYear());
    const hour: string = String(parsedDate.getHours()).padStart(2, '0');
    const minute: string = String(parsedDate.getMinutes()).padStart(2, '0');
    
    const [datePart, timePart]: string[] = this.dateFormat.split(' ');
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
