import { Component } from '@angular/core';
import { quizQuestions } from 'src/shared/mock-quiz/mock-quiz';
import { FilterService } from 'src/shared/services/filter.service';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss']
})
export class QuizComponent {
  questions = quizQuestions;

  constructor(private filterService: FilterService){
    this.filterService.sendListPage(false);
    console.log(this.questions)
  }

  getValue(e: any){console.log(e.target)}
  
}
