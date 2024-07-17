import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ViewCheckSheetComponent } from '../view-check-sheet/view-check-sheet.component'
import {
  ViewChecsheetDetailsComponent
} from './view-checsheet-details/view-checsheet-details.component'
const routes: Routes = [{
  path: '',
  component: ViewCheckSheetComponent,
  children: [
    {
      path: '',
      component: ViewChecsheetDetailsComponent,
    },
    {
      path: 'view-checsheet-details',
      component: ViewChecsheetDetailsComponent,
    }
  ],

}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewCheckSheetRoutingModule { }
