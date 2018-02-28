import { Pipe, PipeTransform } from '@angular/core';
import {ImdbResultsForLocalStorage} from "./models/imdb-results-for-local-storage";

@Pipe({
  name: 'searchByTitle'
})


export class SearchByTitlePipe implements PipeTransform {
  transform(items: ImdbResultsForLocalStorage[], searchText: string): any[] {
    if(!items) return [];
    if(!searchText) return items;
    searchText = searchText.toLowerCase();
    return items.filter( film => {
      if(film.results.length > 0) {
        return film.results[0].title.toLowerCase().includes(searchText) || film.wunderlistTitle.toLowerCase().includes(searchText);
      }
    });
  }
}
