import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserDetailsComponent } from './user-details/user-details.component';
import { UserListComponent } from './user-list/user-list.component';
import { UserManagementComponent } from './user-management.component'
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [{
  path: '',
  component: UserManagementComponent,
  children: [
    {
      path: '',
      component: UserListComponent,
    },
    {
      path: 'user-list',
      component: UserListComponent,
    },
    {
      path: 'user-details',
      component: UserDetailsComponent,
    },
    {
      path: 'user-details/:id',
      component: UserDetailsComponent,
    }
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserManagementRoutingModule { }
