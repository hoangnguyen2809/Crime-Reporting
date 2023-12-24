import { Pipe, PipeTransform } from '@angular/core';
import { Crime } from '../Crime';

@Pipe({
  name: 'unsolves',
})
export class UnsolvesPipe implements PipeTransform {
  transform(crime: Crime[]): number {
    let count = 0;
    for (let i = 0; i < crime.length; i++) {
      if (crime[i].data.status == true) count++;
    }
    return count;
  }
}
