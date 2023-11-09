import { Component } from '@angular/core';
import { quizQuestions } from 'src/shared/mock-quiz/mock-quiz';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss']
})
export class QuizComponent {
  questions = quizQuestions;

  constructor(){
    console.log(this.questions)
  }

  getValue(e: any){console.log(e.target)}
  
}
