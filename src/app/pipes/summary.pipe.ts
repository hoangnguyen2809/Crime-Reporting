import { Pipe, PipeTransform } from '@angular/core';
import { Crime } from '../Crime';
@Pipe({
  name: 'summary',
})
export class SummaryPipe implements PipeTransform {
  transform(crime: Crime[]): number {
    return crime.length;
  }
}
