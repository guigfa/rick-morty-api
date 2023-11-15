import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'typePipe',
})
export class TranslateTypePipe implements PipeTransform {
  transform(value: string): string {
    switch (value.toLowerCase()) {
      case 'planet':
        return 'Planeta';
      case 'fantasy town':
        return 'Cidade da Fantasia';
      case 'dimension':
        return 'Dimensão';
      case 'menagerie':
        return 'Zoologico';
      case 'space station':
        return 'Estação Espacial';
      case 'box':
        return 'Caixa';
      case 'microverse':
        return 'Microverso';
      case 'dream':
        return 'Sonho';
      default:
        return value;
    }
  }
}
