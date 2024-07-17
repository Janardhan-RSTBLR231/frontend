import { NgModule } from '@angular/core';
import {
  NbActionsModule, NbCardModule, NbIconModule,
  NbInputModule, NbMenuModule, NbRouteTabsetModule, NbSelectModule, NbTabsetModule,
  NbDatepickerModule,
  NbTimepickerModule
} from '@nebular/theme';
import { ThemeModule } from '../@theme/theme.module';
import { PagesComponent } from './pages.component';
import { PagesRoutingModule } from './pages-routing.module';
import { MiscellaneousModule } from './miscellaneous/miscellaneous.module';

import { ConfigurationModule } from './configuration/configuration.module';
import { ConfirmationdialogComponent } from './confirmationdialog/confirmationdialog.component';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { FormsModule } from '@angular/forms';
import { ComponentsModule } from '../@components/components.module';
import { NgxSpinnerModule } from 'ngx-spinner';

import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FillCheckSheetModule } from './fill-check-sheet/fill-check-sheet.module';
import { ViewCheckSheetModule } from './view-check-sheet/view-check-sheet.module';
import { ManageCheckSheetModule } from './manage-check-sheets/manage-check-sheet.module';
import { UserManagementModule } from './user-management/user-management.module';
import { CommonnImageDialogComponent } from './commonn-image-dialog/commonn-image-dialog.component';
import { ProfileComponent } from './profile/profile.component';

@NgModule({
  imports: [
    FormsModule,
    PagesRoutingModule,
    ThemeModule,
    NbMenuModule,
    NbCardModule,
    NbActionsModule,
    MiscellaneousModule,
    NbIconModule,
    NbTabsetModule,
    NbRouteTabsetModule,
    ConfigurationModule,
    NbTimepickerModule,
    ComponentsModule,
    NbSelectModule,
    NbInputModule,
    Ng2SmartTableModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    FillCheckSheetModule,
    ViewCheckSheetModule,
    ManageCheckSheetModule,
    UserManagementModule,
    NbDatepickerModule,
    NgxSpinnerModule
  ],
  declarations: [PagesComponent,
    ConfirmationdialogComponent,
    CommonnImageDialogComponent,
  ],

})
export class PagesModule { }
