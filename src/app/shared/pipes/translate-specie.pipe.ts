import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'speciePipe'
})
export class TranslateSpeciePipe implements PipeTransform {
  transform(value: string): string {
    switch (value.toLowerCase()) {
      case 'humanoid':
        return 'Humanoide';
      case 'human':
        return 'Humano';
      case 'robot':
        return 'Robô';
        case 'mythological creature':
          return 'Criatura Mitológica';
      default:
        return value;
    }
  }
}
