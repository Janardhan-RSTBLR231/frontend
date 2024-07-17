import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FillCheckSheetComponent } from './fill-check-sheet.component'
import { CheckPointRowRenderComponent } from './check-point-row-render.component';
import { CheckSheetDetailsComponent } from './check-sheet-details/check-sheet-details.component';
import { CheckPointDetailsComponent } from './check-point-details/check-point-details.component';
import { FillCheckSheetRoutingModule } from './fill-check-sheet-routing.module'
import { NgxSpinnerModule } from "ngx-spinner";
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
import { CheckSheetTooltipComponent } from '../fill-check-sheet/check-sheet-revision-tooltip.component';
import { CheckRecordCustomRenderComponent } from './check-record-custom-render/check-record-custom-render.component';
import { CommentDialogComponent } from './comment-dialog/comment-dialog.component';
import { CustomRowColourComponent } from './custom-row-colour/custom-row-colour.component'
import { BadgeCountService } from './badgeCount.service';
import { ImageRenderComponent } from './image-render/image-render.component';
import { ShiftDialogComponent } from './shift-dialog/shift-dialog.component';



@NgModule({
  declarations: [
    FillCheckSheetComponent,
    CheckPointRowRenderComponent,
    CheckSheetDetailsComponent,
    CheckPointDetailsComponent, 
    CheckSheetTooltipComponent,
    CheckRecordCustomRenderComponent,
    CommentDialogComponent,
    CustomRowColourComponent,
    ImageRenderComponent,
    ShiftDialogComponent
  ],
  imports: [
    CommonModule,
    NbButtonModule,
    NbCardModule,
    NbProgressBarModule,
    NbUserModule,
    NbIconModule,
    NbSelectModule,
    NbListModule,
    RouterModule,
    NbDatepickerModule,
    NbInputModule,
    NbTooltipModule,
    NbTabsetModule,
    Ng2SmartTableModule,
    FormsModule,
    ReactiveFormsModule,
    FillCheckSheetRoutingModule,
    ThemeModule,
    NgxSpinnerModule
  ]
})
export class FillCheckSheetModule { }
