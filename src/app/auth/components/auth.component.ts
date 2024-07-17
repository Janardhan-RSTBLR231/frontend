/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { Component, OnDestroy } from '@angular/core';
import { Location } from '@angular/common';

import { NbAuthService } from '../services/auth.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { ApiService } from '../../services/api.service'

@Component({
  selector: 'nb-auth',
  styleUrls: ['./auth.component.scss'],
  template: `
 <nb-layout>
  <nb-layout-column>
    <div class="row">
      <div class="col-md-6">
        <nb-card class="image-card">
         <nb-card-body>
            <span>
              <img src="../../../assets/images/LandingPage.webp" style="width: 100%; height: 100%;">
            </span>
          </nb-card-body>
        </nb-card>
      </div>
      <div class="col-md-6">
        <nb-card >
          <nb-card-header style="text-align: center;">
            <a class="logo" href="#">
              <span >
                <img src="../../../assets/images/black.webp" style="height: 65px;">
              </span>
            </a>
          </nb-card-header>
          <nb-card-body>
            <nb-auth-block>
              <router-outlet></router-outlet>
            </nb-auth-block>
          </nb-card-body>
        </nb-card>
      </div>
    </div>
  </nb-layout-column>
</nb-layout>

  `,
})
export class NbAuthComponent implements OnDestroy {

  private destroy$ = new Subject<void>();

  subscription: any;

  authenticated: boolean = false;
  token: string = '';
  imageurl: any;

  // showcase of how to use the onAuthenticationChange method
  constructor(protected auth: NbAuthService, protected location: Location,
    private apiService:ApiService) {

    this.subscription = auth.onAuthenticationChange()
      .pipe(takeUntil(this.destroy$))
      .subscribe((authenticated: boolean) => {
        this.authenticated = authenticated;
      });
  }
  ngOnInit() {
    this.imageurl = this.apiService.LandingPageimage("landingPage.webp", "LandingPage.webp")

  }
  back() {
    this.location.back();
    return false;
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
