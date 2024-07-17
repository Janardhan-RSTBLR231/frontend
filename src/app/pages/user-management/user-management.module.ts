import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserDetailsComponent } from './user-details/user-details.component';
import { UserListComponent } from './user-list/user-list.component';
import { UserRowrenderComponent } from './user-rowrender.component';
import { ThemeModule } from '../../@theme/theme.module';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import {
  NbDialogModule, NbWindowModule, NbSpinnerModule, NbCardModule, NbActionsModule,
  NbSelectModule, NbInputModule, NbAutocompleteModule, NbCheckboxModule,
  NbIconModule, NbFormFieldComponent, NbFormFieldModule,NbButtonModule
} from '@nebular/theme';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { UserManagementRoutingModule } from './user-management-routing.module';
import { ComponentsModule } from '../../@components/components.module';
import { UserManagementComponent } from './user-management.component';
import { ChangePasswordDialogComponent } from './change-password-dialog/change-password-dialog.component'
import { NgxSpinnerModule } from "ngx-spinner";

@NgModule({
  declarations: [
    UserManagementComponent,
    UserDetailsComponent,
    UserListComponent,
    UserRowrenderComponent,
    ChangePasswordDialogComponent
  ],
  imports: [
    FormsModule,
    CommonModule,
    ThemeModule,
    Ng2SmartTableModule,
    NbSpinnerModule,
    NbCardModule,
    NbActionsModule,
    NbSelectModule,
    NbInputModule,
    ComponentsModule,
    RouterModule,
    NbFormFieldModule,
    NbIconModule,
    NbCheckboxModule,
    NbAutocompleteModule,
    NbDialogModule.forChild(),
    NbWindowModule.forChild(),
    UserManagementRoutingModule,
    NbButtonModule,
    NgxSpinnerModule
  ]
})
export class UserManagementModule { }
