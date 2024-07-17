import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { CheckSheetDetailsComponent } from './check-sheet-details/check-sheet-details.component';
import { CheckPointDetailsComponent } from './check-point-details/check-point-details.component';
import { FillCheckSheetComponent } from '../fill-check-sheet/fill-check-sheet.component';

const routes: Routes = [{
  path: '',
  component: FillCheckSheetComponent,
  children: [
    {
      path: '',
      component: CheckSheetDetailsComponent,
    },
    {
      path: 'check-sheet-details',
      component: CheckSheetDetailsComponent,
    },
    {
      path: 'check-point-details',
      component: CheckPointDetailsComponent,
    },
    {
      path: 'check-point-details/:id',
      component: CheckPointDetailsComponent,
    }
  ],

}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FillCheckSheetRoutingModule { }
