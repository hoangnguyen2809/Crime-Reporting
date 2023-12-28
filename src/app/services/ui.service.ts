import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UiService {
  private showMoreInfo: boolean = false;
  private showAddReport: boolean = false;
  private subject = new Subject<any>();
  constructor() {}

  toggleMoreInfo(): void {
    this.showMoreInfo = !this.showMoreInfo;
    this.subject.next(this.showMoreInfo);
  }

  toggleAddReport(): void {
    this.showAddReport = !this.showAddReport;
    this.subject.next(this.showAddReport);
  }

  onToggle(): Observable<any> {
    return this.subject.asObservable();
  }
}
