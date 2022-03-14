import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'age',
})
export class AgePipe implements PipeTransform {
  transform(date: Date): number {
    const convertAge = new Date(date);
    const timeDiff = Math.abs(Date.now() - convertAge.getTime());
    return Math.floor(timeDiff / (1000 * 3600 * 24) / 365);
  }
}
