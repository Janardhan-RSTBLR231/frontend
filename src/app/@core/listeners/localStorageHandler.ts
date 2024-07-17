import { Injectable, OnDestroy } from "@angular/core";
import { Subject } from 'rxjs';
import { share } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageHandler implements OnDestroy {

  private onSubject = new Subject<{ key: string, value: any }>();
  public changes = this.onSubject.asObservable().pipe(share());

  constructor() {
    this.start();
  }

  ngOnDestroy() {
    // this.stop();
  }

  setData(key: string, data: any) {
    let _data = JSON.stringify(data);
    localStorage.setItem(key, _data);

    // the local application doesn't seem to catch changes to localStorage...
    this.onSubject.next({ key: key, value: data });
  }

  getData(key: string) {
    let _data = localStorage.getItem(key);
    if (_data != undefined && _data != "undefined" && _data != null) {
      return JSON.parse(_data)
    } else {
      return undefined;
    }
  }

  clearAll() {
    var user: any = {};
    if (localStorage.getItem("rememberMe")) {
      user.login = localStorage.getItem("userName");
      user.password = atob(localStorage.getItem("password"));
      user.rememberMe = true;
    }
    localStorage.clear();
    if (user.rememberMe) {
      localStorage.setItem("userName", user.login);
      localStorage.setItem("password", btoa(user.password));
      localStorage.setItem("rememberMe", user.rememberMe);
    }

  }

  clearItem(key: string) {
    localStorage.removeItem(key);
    // the local application doesn't seem to catch changes to localStorage...
    this.onSubject.next({ key: key, value: null });
  }

  private start(): void {
    window.addEventListener("storage", this.storageEventListener.bind(this));
  }

  private storageEventListener(event: StorageEvent) {
    if (event.storageArea == localStorage) {
      let v;
      try {
        v = JSON.parse(event.newValue + "");
      } catch (e) {
        v = event.newValue;
      }
      this.onSubject.next({ key: event.key + "", value: v });
    }
  }

  private stop(): void {
    window.removeEventListener("storage", this.storageEventListener.bind(this));
    this.onSubject.complete();
  }
}
