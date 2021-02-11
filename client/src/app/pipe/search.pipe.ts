import {Pipe, PipeTransform} from '@angular/core';
import {Location} from '../services/interfaces';

@Pipe({
  name: 'searchFacilities'
})

export class SearchPipe implements PipeTransform{
  transform(locations: Location[], search = ''): Location[] {
    if (!search.trim()) {
      return locations;
    }

    return locations.filter( location => {
      // @ts-ignore
      let find = false;
      location.facilities.forEach(item => {
        if (item.toLowerCase().includes(search.toLowerCase())){
          find = true;
        }
      });

      if (location.name.toLowerCase().includes(search.toLowerCase()) || find) {
        return location;
      }}

    );
  }

}
