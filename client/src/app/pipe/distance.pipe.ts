import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'dist'
})

export class DistancePipe implements PipeTransform{
  transform(value: any, ...args: any[]): any {
    let km;
    let metr;
    let result;
    if (value > 999.9) {
        km = Math.trunc(value / 1000);
        metr = (((value / 1000).toString().split('.'))[1].substr(0,3));
        result = km + ' km ' + metr + ' m';
    } else {
      metr = Math.floor((value / 1000 - Math.floor(value / 1000)) * 1000);
      result = metr + ' m';
    }

    return result;
  }
}

