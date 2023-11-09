import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FilterService {
  private toolbarSubject = new BehaviorSubject<string>('');
  private dataLabel = new Subject<any>();

  dataLabel$ = this.dataLabel.asObservable();

  setToolbarValue(value: string) {
    this.toolbarSubject.next(value);
  }

  getToolbarValue() {
    return this.toolbarSubject.asObservable();
  }

  sendData(value: any) {
    this.dataLabel.next(value);
  }

}