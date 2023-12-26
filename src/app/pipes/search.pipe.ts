import { Pipe, PipeTransform } from '@angular/core';
import { Crime } from '../Crime';
@Pipe({
  name: 'search',
})
export class SearchPipe implements PipeTransform {
  transform(crimes: Crime[], querystring: string): Crime[] {
    if (!querystring || querystring.trim() === '') {
      return crimes; // Return original array if search string is empty
    }

    return crimes.filter((c) => {
      const name = c.data.name ? c.data.name.toLowerCase() : ''; // Check for undefined or null
      const locationName =
        c.data.location && c.data.location.name
          ? c.data.location.name.toLowerCase()
          : ''; // Check for undefined or null

      return (
        name.includes(querystring.toLowerCase()) ||
        locationName.includes(querystring.toLowerCase())
      );
    });
  }
}
