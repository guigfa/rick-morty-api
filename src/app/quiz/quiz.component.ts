import { Component } from '@angular/core';
import { quizQuestions } from 'src/shared/mock-quiz/mock-quiz';
import { FilterService } from 'src/shared/services/filter.service';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss'],
})
export class QuizComponent {
  questions = quizQuestions;
  checkedQuestion: any[] = [];
  controllerList: any[] = [];
  hasChanged: number = 0;
  count: number = 0;
  resultPage: boolean = false;

  constructor(private filterService: FilterService) {
    this.filterService.sendListPage(false);
    console.log(this.questions);
  }

  changeAnswers(event: any, id: number) {
    console.log(event);
    if (!this.checkedQuestion.find((identifier) => identifier === id)) {
      this.hasChanged++;
      this.checkedQuestion.push(id);
    }
    this.hasChanged++;
    let question = this.questions.find((question) => question.id === id);

    if (event === question.trueOption) {
      if (this.controllerList.some((c) => c.id === question.id)) return;
      this.controllerList.push(question);
      this.count++;
    } else {
      if (this.controllerList.some((c: any) => c.id === question.id)) {
        this.controllerList = this.controllerList.filter(
          (c) => c.id !== question.id
        );
        this.count--;
      }
    }
    console.log(this.checkedQuestion);
    console.log(this.count);
  }

  checkResult() {
    this.resultPage = true;
  }
}
