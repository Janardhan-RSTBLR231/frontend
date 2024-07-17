import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewCheckPointRowrenderComponent } from './view-check-point-rowrender.component';
import { ViewCheckSheetComponent } from './view-check-sheet.component'
import { RouterModule } from '@angular/router';
import { ViewCheckSheetRoutingModule } from './view-check-sheet-routing.module'
import {
  ViewChecsheetDetailsComponent
} from './view-checsheet-details/view-checsheet-details.component'
import {
  NbButtonModule,
  NbCardModule,
  NbProgressBarModule,
  NbUserModule,
  NbIconModule,
  NbSelectModule,
  NbListModule,
  NbDatepickerModule,
  NbInputModule,
  NbTooltipModule,
  NbTabsetModule,
} from '@nebular/theme';
import { ThemeModule } from '../../@theme/theme.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { NgxSpinnerModule } from "ngx-spinner";

@NgModule({
  declarations: [
    ViewCheckSheetComponent,
    ViewCheckPointRowrenderComponent,
    ViewChecsheetDetailsComponent,
  ],
  imports: [
    CommonModule,
    ThemeModule,
    ReactiveFormsModule,
    FormsModule,
    NbButtonModule,
    NbCardModule,
    NbProgressBarModule,
    NbUserModule,
    NbIconModule,
    NbSelectModule,
    NbListModule,
    NbDatepickerModule,
    NbInputModule,
    NbTooltipModule,
    NbTabsetModule,
    Ng2SmartTableModule,
    RouterModule,
    ViewCheckSheetRoutingModule,
    NgxSpinnerModule
  ]
})
export class ViewCheckSheetModule { }
