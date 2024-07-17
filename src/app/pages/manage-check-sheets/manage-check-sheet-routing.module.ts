import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AddNewCheckSheetComponent } from './add-new-check-sheet/add-new-check-sheet.component';
import { AddNewCheckPointComponent } from './add-new-check-point/add-new-check-point.component';
import { EditCheckPointComponent } from './edit-check-point/edit-check-point.component';
import { CheckSheetDetailsComponent } from './check-sheet-details/check-sheet-details.component';
import { ManageCheckSheetsComponent } from './manage-check-sheets.component'

const routes: Routes = [{
  path: '',
  component: ManageCheckSheetsComponent,
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
      path: 'add-new-check-sheet',
      component: AddNewCheckSheetComponent,
    },
    {

      path: 'add-new-check-sheet/:checksheetid/add-new-check-point',
      component: AddNewCheckPointComponent,
    },
    {
      path: 'edit-check-point',
      component: EditCheckPointComponent,
    },
    {
      path: 'add-new-check-sheet/:id',
      component: AddNewCheckSheetComponent,
    },
    {
      path: 'add-new-check-sheet/:checksheetid/edit-check-point/:id',
      component: EditCheckPointComponent,
    } ,
    // {
    //  path: 'check-points-list/:id',
    //  component: CheckPointsListComponent,
    // }
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ManageCheckSheetRoutingModule { }
