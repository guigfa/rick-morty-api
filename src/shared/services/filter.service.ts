import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FilterService {
  private toolbarSubject = new BehaviorSubject<string>('');
  private dataLabel = new Subject<any>();
  private isListPage = new Subject<boolean>();

  dataLabel$ = this.dataLabel.asObservable();
  isListPage$ = this.isListPage.asObservable();

  setToolbarValue(value: string) {
    this.toolbarSubject.next(value);
  }

  getToolbarValue() {
    return this.toolbarSubject.asObservable();
  }

  sendData(value: any) {
    this.dataLabel.next(value);
  }

  sendListPage(value: boolean) {
    this.isListPage.next(value);
  }

}