import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'translatePipe'
})
export class TranslatePipe implements PipeTransform {

  transform(wordInEnglish: string, wordsInPortuguese: Array<any>): string {
    if (!wordInEnglish || !wordsInPortuguese) {
      return '';
    }

    const word = wordsInPortuguese.find(c => c.english === wordInEnglish);
    return word ? word.portuguese : wordInEnglish;
  }
}
