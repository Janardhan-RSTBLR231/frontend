import { Injectable } from '@angular/core';
import {  } from '../@core/interfaces/User'
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedDataService {
  private refreshMainComponentSource = new Subject<void>();
  refreshMainComponent$: Observable<void> = this.refreshMainComponentSource.asObservable();

  constructor() {
   
  }
  triggerRefresh() {
    this.refreshMainComponentSource.next();
  }
}
