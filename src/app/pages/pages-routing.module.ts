import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { NotFoundComponent } from './miscellaneous/not-found/not-found.component';
import { AuthGuard } from '../@core/guards/auth.guard';

import { FillCheckSheetComponent } from './fill-check-sheet/fill-check-sheet.component';
import { ViewCheckSheetComponent } from './view-check-sheet/view-check-sheet.component';
import { ManageCheckSheetsComponent } from './manage-check-sheets/manage-check-sheets.component'
import { UserManagementComponent } from './user-management/user-management.component'
import { JwtService } from '../@core/services/jwt.service';
import { ConfigurationComponent } from './configuration/configuration.component';
import { SettingsComponent } from './settings/settings.component'
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [
  {
    path: '',
    component: PagesComponent,
    children: [

      {
        path: 'fill-check-sheet',
        component: FillCheckSheetComponent,
        loadChildren: () => import('./fill-check-sheet/fill-check-sheet.module').then(m => m.FillCheckSheetModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'view-check-sheet',
        component: ViewCheckSheetComponent,
        loadChildren: () => import('./view-check-sheet/view-check-sheet.module').then(m => m.ViewCheckSheetModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'manage-check-sheets',
        component: ManageCheckSheetsComponent,
        loadChildren: () => import('./manage-check-sheets/manage-check-sheet.module').then(m => m.ManageCheckSheetModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'user-management',
        component: UserManagementComponent,
        loadChildren: () => import('./user-management/user-management.module').then(m => m.UserManagementModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'configuration',
        component:ConfigurationComponent,
        loadChildren: () => import('./configuration/configuration.module').then(m => m.ConfigurationModule),
        canActivate:[AuthGuard]
      },
      {
        path: 'settings',
        component: SettingsComponent,
        loadChildren: () => import('./settings/settings.module').then(m => m.SettingsModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'profile',
        component: ProfileComponent,
        loadChildren: () => import('./profile/profile.module').then(m => m.ProfileModule),
      },
      {
        path: '**',
        component: NotFoundComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule { 
}
