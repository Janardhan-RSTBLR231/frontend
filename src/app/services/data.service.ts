import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, Input } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { JwtService } from '../@core/services/jwt.service';
import { LocalStorageHandler } from '../@core/listeners/localStorageHandler';
import { MENU_ITEMS } from '../pages/pages-menu';
import {  UserDTO } from '../@core/interfaces/User';
import { SharedDataService } from '../services/shared-data.service'

@Injectable({
  providedIn: 'root',
})
export class DataService {

  baseurl = environment.apiurl;
  private menu = new BehaviorSubject(MENU_ITEMS);
  currentMenu = this.menu.asObservable();
  constructor(private jwtService: JwtService,
    private localStorageHandler: LocalStorageHandler,
    private shareddataservice: SharedDataService) { }
  getMenuAccess() {
    MENU_ITEMS.forEach(menu => {
      var hidden = true;
      if (menu.title == "Fill Check Sheet") {
        //hidden = !this.jwtService.getRole().includes("Operator");
        hidden = !(this.jwtService.getRole().includes("Operator") || this.jwtService.getRole().includes("Validator") || this.jwtService.getRole().includes("SuperAdmin"));

      }
      else if (menu.title == "View Check Sheets") {
        hidden = !(this.jwtService.getRole().includes("Creator") ||
          this.jwtService.getRole().includes("Reviewer") || this.jwtService.getRole().includes("Approver") ||
          this.jwtService.getRole().includes("SuperAdmin") || this.jwtService.getRole().includes("Validator"));
      }
      else if (menu.title == "User Management") {
        hidden = !this.jwtService.getRole().includes("SuperAdmin");
      }
      else if (menu.title == "Configuration") {
        hidden = !(this.jwtService.getRole().includes("SuperAdmin") || this.jwtService.getRole().includes("Creator"));
      }
      else if (menu.title == "Manage Check Sheets") {
        hidden = !(this.jwtService.getRole().includes("Creator") || this.jwtService.getRole().includes("Reviewer") || this.jwtService.getRole().includes("Approver") || this.jwtService.getRole().includes("SuperAdmin"));
      }
      else if (menu.title == "Settings") {
        hidden = !this.jwtService.getRole().includes("SuperAdmin");
      }
      menu.hidden = hidden;

    });
    this.menu.next(MENU_ITEMS);
    return MENU_ITEMS;
  }

}
