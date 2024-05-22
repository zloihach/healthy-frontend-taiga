import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';

@Pipe({
  standalone: true,
  name: 'dateRu'
})
export class DateRuPipe implements PipeTransform {

  private datePipe: DatePipe;

  constructor() {
    this.datePipe = new DatePipe('ru-RU');
  }

  transform(value: any, format: string = 'fullDate'): any {
    if (!value) return value;
    const date = new Date(value);
    if (isNaN(date.getTime())) return value;
    return this.datePipe.transform(date, format);
  }
}
