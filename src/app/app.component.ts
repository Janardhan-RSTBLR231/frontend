
import { Component, OnInit, inject } from '@angular/core';
import { ApiService } from './services/api.service';
import { first } from 'rxjs/operators';
import { LocalStorageHandler } from './@core/listeners/localStorageHandler';
import { Router } from '@angular/router';
// import { AnalyticsService } from './@core/utils/analytics.service';
// import { SeoService } from './@core/utils/seo.service';

@Component({
  selector: 'ngx-app',
  template: '<router-outlet></router-outlet>',
})
export class AppComponent implements OnInit {
  apiService = inject(ApiService);

  constructor(private localStorageHandler: LocalStorageHandler,
    private router: Router,

    // private analytics: AnalyticsService, private seoService: SeoService
  ) {
  }

  async ngOnInit(): Promise<void> {
    // var tokenData = await this.apiService.login({
    //   "login": "admin@bacapp.com",
    //   "password": "Welcome@123"
    // });
    // var token = tokenData.token?.access_token.toString();
    // this.localStorageHandler.setData("token", token);
    // var refreshToken = tokenData.token?.refresh_token;
    // this.localStorageHandler.setData("refresh_token", refreshToken);
    // this.router.navigate(["pages"])
    
  }
}
