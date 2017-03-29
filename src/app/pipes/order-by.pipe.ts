import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'orderBy'
})
export class OrderByPipe implements PipeTransform {

  transform(list: any, orderBy: any, asc: boolean = true) {
    if(!orderBy || orderBy.trim().length === 0) return list;

    if(asc) {
      //ascending order
      return [...list].sort( (item1, item2) => {
        return this.compare(item1[orderBy], item2[orderBy]);
      });
    } else {
      //descending order
      return [...list].sort( (item1, item2) => {
        return this.compare(item2[orderBy], item1[orderBy]);
      });
    }
  }

  compare(val1, val2) {
    if( isNaN(parseFloat(val1)) || !isFinite(val1) || isNaN(parseFloat(val2)) || !isFinite(val2) ) {
      //inputs are string, make them lower case and compare
      if (val1.toLowerCase() < val2.toLowerCase()) {
        return -1;
      } else if(val1.toLowerCase() > val2.toLowerCase()) {
        return 1;
      } else {
        return 0; //val1 === val2
      }//end inner if-else

    } else {
      //inputs are number, compare normally
      if(parseFloat(val1) < parseFloat(val2)) {
        return -1;
      } else if(parseFloat(val1) < parseFloat(val2)) {
        return 1;
      } else {
        return 0; //val1 === val2
      }

    }//end outer if-else

  }

}
