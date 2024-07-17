import { ChangeDetectorRef, Component, OnInit } from '@angular/core';

import { MENU_ITEMS } from './pages-menu';
import { LocalStorageHandler } from '../@core/listeners/localStorageHandler';
import { JwtService } from '../@core/services/jwt.service';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';

@Component({
  selector: 'ngx-pages',
  styleUrls: ['pages.component.scss'],
  template: `
    <ngx-one-column-layout>
      <nb-menu [items]="menu"></nb-menu>
      <router-outlet></router-outlet>
    </ngx-one-column-layout>
  `,
})
export class PagesComponent implements OnInit {

  menu: any;
  resultsAnnounced: boolean = true;
  constructor(
    private localStorageHandler: LocalStorageHandler,
    private dataService: DataService,
    protected router: Router,
    private jwtservice:JwtService
  ) {
     this.menu = this.dataService.getMenuAccess();
    // if (!this.localStorageHandler.getData("resultsAnnounced"))
     this.router.navigate(["pages/",this.jwtservice.redirectToRoleBasedPage()])
  }
  async ngOnInit() {
    this.dataService.currentMenu.subscribe(menu => this.menu = menu);
  }
}
