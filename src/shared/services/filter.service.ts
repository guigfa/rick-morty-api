import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FilterService {
  private toolbarSubject = new BehaviorSubject<string>('');
  private isListPage = new Subject<boolean>();

  isListPage$ = this.isListPage.asObservable();

  setToolbarValue(value: string) {
    this.toolbarSubject.next(value);
  }

  getToolbarValue() {
    return this.toolbarSubject.asObservable();
  }

  sendListPage(value: boolean) {
    this.isListPage.next(value);
  }
}
