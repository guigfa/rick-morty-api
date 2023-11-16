import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'genderPipe'
})
export class TranslateGenderPipe implements PipeTransform {
  transform(value: string): string {
    switch (value?.toLowerCase()) {
      case 'male':
        return 'Homem';
      case 'female':
        return 'Mulher';
      case 'unknown':
        return 'Desconhecido';
      case 'genderless':
        return 'Sem Gênero';
      default:
        return value;
    }
  }
}
