import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Dictionary } from '../../auth/models/user';

@Injectable({
  providedIn: 'root'
})
export class BadgeCountService {
  private _badgeCountSource = new BehaviorSubject<Dictionary<number>>({});

  badgeCount$ = this._badgeCountSource.asObservable();
  
    updateBadgeCount(counts: Dictionary<number>) {
      this._badgeCountSource.next(counts);
    }
}
