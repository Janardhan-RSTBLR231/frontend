import { NgModule } from '@angular/core';
import {
  NbAccordionModule, NbButtonModule, NbCardModule, NbCheckboxModule, NbDatepickerModule,
  NbIconModule, NbInputModule, NbMenuModule, NbRouteTabsetModule, NbSpinnerModule, NbTabsetModule
} from '@nebular/theme';

import { ThemeModule } from '../../@theme/theme.module';
import { ConfigurationRoutingModule } from './configuration-routing.module';
import { ConfigurationComponent } from './configuration.component';
import { ComponentsModule } from '../../@components/components.module';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NbSelectModule } from '@nebular/theme';
import { NbTableModule } from '@nebular/theme';
import { MatSort, Sort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { FontAwesomeModule } from '@fortawesome/fontawesome-free';
import { DailogAddNewComponent } from './dailog-add-new/dailog-add-new.component';
import { DailogUpdateComponent } from './dailog-update/dailog-update.component';
import { NgxSpinnerModule } from "ngx-spinner";
import { CustomActionsComponent } from './custom-actions/custom-actions.component';
import { Ng2SmartTableModule } from 'ng2-smart-table';

@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    ThemeModule,
    NbMenuModule,
    NbIconModule,
    NbTabsetModule,
    NbInputModule,
    NbCardModule,
    NbDatepickerModule,
    NbButtonModule,
    NbRouteTabsetModule,
    ConfigurationRoutingModule,
    NbSpinnerModule,
    ComponentsModule,
    NbAccordionModule,
    NbCardModule,
    NbCheckboxModule,
    NbSelectModule,
    NbTableModule,
    MatSortModule,
    MatTableModule,
    MatPaginatorModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
    Ng2SmartTableModule
  ],
  declarations: [
    ConfigurationComponent,
    DailogAddNewComponent,
    DailogUpdateComponent,
    CustomActionsComponent,
  ],
})
export class ConfigurationModule { }
