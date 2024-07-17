import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree, CanActivateChild, CanLoad, Route, UrlSegment } from '@angular/router';
import { Observable } from 'rxjs';
import { JwtService } from '../services/jwt.service';
import { LocalStorageHandler } from '../listeners/localStorageHandler';
import { MENU_ITEMS } from '../../pages/pages-menu';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild, CanLoad {
  menuAccess: any
  constructor(private jwtSevice: JwtService,
    private localStorageHandler: LocalStorageHandler,
    private router: Router) {
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (!this.checkMenuAccess(state.url)) {
      this.router.navigate(['auth/login']);
      return false;
    }
    return true;
  }
  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    // if (this.jwtSevice.isExpired()) {
    //   this.router.navigate(['auth/login']);
    //   return false;
    // }
    return true;
  }
  canLoad(route: Route, segments: UrlSegment[]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    // if (this.jwtSevice.isExpired()) {
    //   this.router.navigate(['auth/login']);
    //   return false;
    // }
    return true;
  }
  checkMenuAccess(route) {
    var access = false;
    MENU_ITEMS.forEach(menu => {
      if (menu.link == route) {
        access = !menu.hidden
      }
    })
    return access;
  }



}
