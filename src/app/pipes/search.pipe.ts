import { Pipe, PipeTransform } from '@angular/core';
import { Crime } from '../Crime';
@Pipe({
  name: 'search',
})
export class SearchPipe implements PipeTransform {
  transform(crimes: Crime[], querystring: string): Crime[] {
    return crimes.filter((c) => {
      return (
        c.data.name.toLowerCase().includes(querystring.toLowerCase()) ||
        c.data.location.name.toLowerCase().includes(querystring.toLowerCase())
      );
    });
  }
}
