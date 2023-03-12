import { IPerson } from '../model/persons';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterPersons',
})
export class FilterPersonsPipe implements PipeTransform {
  transform(persons: IPerson[], searchText: string): IPerson[] {
    if (!persons) {
      return [];
    }
    if (!searchText) {
      return persons;
    }
    searchText = searchText.toLocaleLowerCase();

    return persons.filter((el) => {
      return el.name.toLocaleLowerCase().includes(searchText);
    });
  }
}
