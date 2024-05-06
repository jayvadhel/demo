import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'capitalization',
  standalone: true,
})
export class CapitalizationPipe implements PipeTransform {
  transform(str: string, ...args: any[]): any {
    if (!str) return '';

    let result = '';

    for (let i = 0; i < str.length; i++) {
      if (i === 0) {
        result += str[i].toUpperCase();
      } else {
        result += str[i].toLowerCase();
      }
    }
    return result;
  }
}
