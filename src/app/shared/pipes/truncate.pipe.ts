import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  standalone: true,
  name: 'truncate'
})
export class TruncatePipe implements PipeTransform {
  transform(value: string, limit: number = 20, completeWords: boolean = false, ellipsis: string = '...'): string {
    if (!value) return '';

    if (completeWords) {
      limit = value.substr(0, limit).lastIndexOf(' ');
    }

    return value.length > limit ? value.substr(0, limit) + ellipsis : value;
  }
}
