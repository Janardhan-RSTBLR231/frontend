import { Component, OnDestroy, OnInit, Input } from '@angular/core';
import {
  NbMediaBreakpointsService, NbMenuService, NbSidebarService, NbThemeService,
  NbDialogService,NbToastrService
} from '@nebular/theme';
import { FormControl } from '@angular/forms';

import { UserData } from '../../../@core/data/users';
import { LayoutService } from '../../../@core/utils';
import { map, filter, takeUntil, startWith } from 'rxjs/operators';
import { Observable, Subject, of } from 'rxjs';
import { JwtService } from '../../../@core/services/jwt.service';
import { } from '../../../@core/interfaces/User'
import { SharedDataService } from '../../../services/shared-data.service'
import { ApiService } from '../../../services/api.service'
import { OperationResponse } from '../../../@core/interfaces/OperationResponse';
import { ChangePasswordDialogComponent } from '../../../pages/user-management/change-password-dialog/change-password-dialog.component';
import { link } from 'fs';
import { Action } from 'rxjs/internal/scheduler/Action';



@Component({
  selector: 'ngx-header',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit, OnDestroy {

  options: any;
  rolename: any;
  departments: any;
  filteredOptions$: Observable<string[]>;
  inputFormControl: FormControl;

  private destroy$: Subject<void> = new Subject<void>();
  userPictureOnly: boolean = false;
  user: any;

  themes = [
    {
      value: 'default',
      name: 'Light',
    },
    {
      value: 'dark',
      name: 'Dark',
    },
    {
      value: 'cosmic',
      name: 'Cosmic',
    },
    {
      value: 'corporate',
      name: 'Corporate',
    },
  ];

  currentTheme = 'default';

  // userMenu = [{ title: 'Log out', link: '/auth/logout', }, { title: 'Reset Password' }];
  userMenu = this.getMenuItems();

  newPassword: any;
  confirmPassword: any;
  id: any;
  constructor(private sidebarService: NbSidebarService,
    private menuService: NbMenuService,
    private themeService: NbThemeService,
    private jwtService: JwtService,
    private layoutService: LayoutService,
    private breakpointService: NbMediaBreakpointsService,
    private shareddataservice: SharedDataService,
    private apiService: ApiService,
    private dialogService: NbDialogService,
    private toasterService:NbToastrService,
  ) {
   
  }
  getMenuItems() {
    const userLink = ['/pages/profile/'];
    return [
      { title: 'Profile', link: userLink },
      { title: 'Log out', link: '/auth/logout' },
    ];
  }
  ngOnInit() {
    this.options = this.jwtService.getPlant();
    this.id = this.jwtService.getId()
    this.rolename = this.jwtService.getRole();
    this.departments = this.jwtService.getDepartment();
    this.filteredOptions$ = of(this.options);

    this.inputFormControl = new FormControl();

    this.filteredOptions$ = this.inputFormControl.valueChanges
      .pipe(
        startWith(''),
        map(filterString => this.filter(filterString)),
      );

    this.currentTheme = this.themeService.currentTheme;
    this.user =
      { name: this.jwtService.getName(), picture: '', role: this.jwtService.getRole(),department:this.jwtService.getDepartment()};
    const { xl } = this.breakpointService.getBreakpointsMap();
    this.themeService.onMediaQueryChange()
      .pipe(
        map(([, currentBreakpoint]) => currentBreakpoint.width < xl),
        takeUntil(this.destroy$),
      )
      .subscribe((isLessThanXl: boolean) => this.userPictureOnly = isLessThanXl);

    this.themeService.onThemeChange()
      .pipe(
        map(({ name }) => name),
        takeUntil(this.destroy$),
      )
      .subscribe(themeName => this.currentTheme = themeName);
    
 
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  changeTheme(themeName: string) {
    this.themeService.changeTheme(themeName);
  }

  toggleSidebar(): boolean {
    this.sidebarService.toggle(true, 'menu-sidebar');
    this.layoutService.changeLayoutSize();

    return false;
  }

  navigateHome() {
    this.menuService.navigateHome();
    return false;
  }

  private filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.options.filter(optionValue => optionValue.toLowerCase().includes(filterValue));
  }
 
}
