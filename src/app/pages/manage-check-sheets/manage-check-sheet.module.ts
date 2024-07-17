import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddNewCheckSheetComponent } from './add-new-check-sheet/add-new-check-sheet.component';
import { AddNewCheckPointComponent } from './add-new-check-point/add-new-check-point.component';
import { EditCheckPointComponent } from './edit-check-point/edit-check-point.component';
import { CheckpointRowrenderComponent } from './checkpoint-rowrender.component';
import { ChecksheetRowrenderComponent } from './checksheet-rowrender.component';
import { ManageCheckSheetRoutingModule } from './manage-check-sheet-routing.module'
import { RouterModule } from '@angular/router';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { ManageCheckSheetsComponent } from './manage-check-sheets.component'
import {
  NbDialogModule,
  NbWindowModule,
  NbSpinnerModule,
  NbCardModule,
  NbActionsModule,
  NbSelectModule,
  NbInputModule,
  NbAutocompleteModule,
  NbCheckboxModule,
  NbButtonModule,
  NbTabsetModule,
  NbDatepickerModule,
  NbTooltipModule,
  NbFormFieldModule
} from '@nebular/theme';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CheckSheetDetailsComponent } from './check-sheet-details/check-sheet-details.component';
import { ApproverAndReviewerSelectionComponent } from './approver-and-reviewer-selection/approver-and-reviewer-selection.component';
import { CommentsComponent } from './commentsdialog/comments.component';
import { NgxSpinnerModule } from "ngx-spinner";
import { ImagesRendererComponent } from './images-renderer/images-renderer.component';
import { ComponentsModule } from '../../@components/components.module';

@NgModule({
  declarations: [
    ManageCheckSheetsComponent,
    AddNewCheckSheetComponent,
    AddNewCheckPointComponent,
    EditCheckPointComponent,
    CheckpointRowrenderComponent,
    ChecksheetRowrenderComponent,
    CheckSheetDetailsComponent,
    ApproverAndReviewerSelectionComponent,
    CommentsComponent,
    ImagesRendererComponent,
  ],
  imports: [
    CommonModule,
    NbDialogModule,
    NbWindowModule,
    NbSpinnerModule,
    NbCardModule,
    NbActionsModule,
    NbSelectModule,
    NbInputModule,
    NbAutocompleteModule,
    NbCheckboxModule,
    NbButtonModule,
    RouterModule,
    MatAutocompleteModule,
    MatInputModule,
    MatFormFieldModule,
    Ng2SmartTableModule,
    FormsModule,
    ReactiveFormsModule,
    ManageCheckSheetRoutingModule,
    NbTabsetModule,
    NbDatepickerModule,
    DragDropModule,
    NgxSpinnerModule,
    NbTooltipModule,
    NbFormFieldModule,
    ComponentsModule
  ]
})
export class ManageCheckSheetModule { }
