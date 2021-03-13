/**
 * create By reza mollaei
 * Email: reza_yki@yahoo.com
 * telegram: reza_yki
 */

import {Pipe, PipeTransform} from '@angular/core';

@Pipe({name: 'enumKeyValue'})
export class EnumKeyValue implements PipeTransform {
  transform(value: any, type?: any): any {
    const array = [];
    if (value) {
      if (type === 'number') {
        const startIndex = Object.keys(value).length / 2;
        Object.keys(value).map((key, index) => {
          if (index >= startIndex) {
            array.push({
              value: value[key],
              key
            });
          }
        });
      } else {
        Object.keys(value).map((key, index) => {
          if ((index % 2) === 0) {
            array.push({
              value: value[key],
              key
            });
          }
        });

      }


      console.log('array', array);
      return array;
    }
  }
}

// @Pipe({ name: 'values',  pure: false })
// export class EnumKeyValue implements PipeTransform {
//   transform(value: any, args: any[] = null): any {
//     const array = [];
//     Object.keys(value).map(key => {
//       if (key) {
//         array.push(value[key]);
//         // console.log(key);
//         console.log('aaaa', value[key]);
//       }
//     });
//
//     return array;
//   }
// }
