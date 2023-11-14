import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FilterService {
  private toolbarSubject = new BehaviorSubject<string>('');
  private isListPage = new Subject<boolean>();
  private loginPage = new Subject<boolean>();

  isListPage$ = this.isListPage.asObservable();

  setToolbarValue(value: string) {
    this.toolbarSubject.next(value);
  }

  setLoginPage(value: boolean) {
    this.loginPage.next(value);
  }

  getToolbarValue() {
    return this.toolbarSubject.asObservable();
  }

  getLoginPage() {
    return this.loginPage.asObservable();
  }

  sendListPage(value: boolean) {
    this.isListPage.next(value);
  }
}
