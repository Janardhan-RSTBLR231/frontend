/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef, Component, Inject, Output, inject, EventEmitter
} from '@angular/core';
import { Router } from '@angular/router';
import { NB_AUTH_OPTIONS, NbAuthSocialLink } from '../../auth.options';
import { getDeepFromObject } from '../../helpers';

import { NbAuthService } from '../../services/auth.service';
import { NbAuthResult } from '../../services/auth-result';
import { ApiService } from '../../../services/api.service';
import { LocalStorageHandler } from '../../../@core/listeners/localStorageHandler';
import { MENU_ITEMS } from '../../../pages/pages-menu';
import { ThisReceiver } from '@angular/compiler';
import { UserDTO } from '../../../@core/interfaces/User';
import { SharedDataService } from '../../../services/shared-data.service'
import { DomSanitizer } from '@angular/platform-browser';
import { OperationResponse } from '../../../@core/interfaces/OperationResponse';
import { NbToastrService } from '@nebular/theme';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'nb-login',
  templateUrl: './login.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NbLoginComponent {
  // usersdto: UserDTO;
  @Output() apiResult = new EventEmitter<any>();
  redirectDelay: number = 0;
  showMessages: any = {};
  strategy: string = '';
  imageurl: any;
  errors: string[] = [];
  messages: string[] = [];
  user: any = {};
  submitted: boolean = false;
  socialLinks: NbAuthSocialLink[] = [];
  rememberMe = false;
  apiService = inject(ApiService);

  constructor(protected service: NbAuthService,
    private localStorageHandler: LocalStorageHandler,
    private toasterService: NbToastrService,
    private spinnerService: NgxSpinnerService,
    @Inject(NB_AUTH_OPTIONS) protected options = {},
    protected cd: ChangeDetectorRef,
    protected router: Router, private sanitizer: DomSanitizer) {

    this.redirectDelay = this.getConfigValue('forms.login.redirectDelay');
    this.showMessages = this.getConfigValue('forms.login.showMessages');
    this.strategy = this.getConfigValue('forms.login.strategy');
    // this.socialLinks = this.getConfigValue('forms.login.socialLinks');
    this.rememberMe = this.getConfigValue('forms.login.rememberMe');
    if (localStorage.getItem("rememberMe")) {
      this.user.login = localStorage.getItem("userName");
      this.user.password = atob(localStorage.getItem("password"));
      this.user.rememberMe = true;

    }
    
  }


  async login(): Promise<void> {
    this.errors = [];
    this.messages = [];
    this.submitted = true;

    if (this.user.rememberMe) {
      localStorage.setItem("userName", this.user.login);
      localStorage.setItem("password", btoa(this.user.password));
      localStorage.setItem("rememberMe", this.user.rememberMe);
    } else {
      localStorage.removeItem("userName");
      localStorage.removeItem("password");
      localStorage.removeItem("rememberMe");
    }

    try {
      this.spinnerService.show();
      const response: OperationResponse = await this.apiService.login(this.user).toPromise();
      this.spinnerService.hide();
      if (response.isSuccess) {
        const tokenData = response.payload;
        const token = tokenData.access_token.toString();
        this.localStorageHandler.setData("token", token);
        this.localStorageHandler.setData("loginInfo", tokenData);
        const refreshToken = tokenData.refresh_token;
        this.localStorageHandler.setData("refresh_token", refreshToken);
        this.router.navigate(["pages"]);
      } else {
        this.toasterService.danger(response.messages, 'Error');
      }
    } catch (error) {
      this.spinnerService.hide();
      this.toasterService.danger(error, 'Error');
    }
  }


  getConfigValue(key: string): any {
    return getDeepFromObject(this.options, key, null);
  }
}
