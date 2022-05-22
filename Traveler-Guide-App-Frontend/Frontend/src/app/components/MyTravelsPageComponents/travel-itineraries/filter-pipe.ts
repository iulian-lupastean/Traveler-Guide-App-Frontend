import { Pipe, PipeTransform } from '@angular/core';
import { ITravelItinerary } from 'src/app/Interfaces/ITravelItinerary';

@Pipe({
  name: 'myfilter',
  pure: false,
})
export class MyFilterPipe implements PipeTransform {
  transform(items: any[] | null, filter: any): any {
    if (!items || !filter) {
      return items;
    }
    return items.filter((item) => item.name.indexOf(filter.name) !== -1);
  }
}
