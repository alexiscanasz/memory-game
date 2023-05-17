import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StateService {
  private startNewGame$ = new Subject<boolean>();

  constructor() { }

  startNewGame(): void {
    this.startNewGame$.next(true);
  }

  getStartNewGame$(): Observable<boolean> {
    return this.startNewGame$.asObservable();
  }
}
