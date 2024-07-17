import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  NbAccordionModule, NbButtonModule, NbCardModule, NbCheckboxModule,
  NbDatepickerModule, NbIconModule, NbInputModule, NbMenuModule,
  NbRouteTabsetModule, NbSpinnerModule, NbTabsetModule,
  NbTimepickerModule
} from '@nebular/theme';

import { ThemeModule } from '../../@theme/theme.module';
import { ProfileRoutingModule } from './profile-routing.module'
import { ProfileComponent } from './profile.component'
import { ComponentsModule } from '../../@components/components.module';
import { FormsModule } from '@angular/forms';
import { NgxSpinnerModule } from "ngx-spinner";

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
    NbTimepickerModule,
    NbButtonModule,
    NbRouteTabsetModule,
    ProfileRoutingModule,
    NbSpinnerModule,
    ComponentsModule,
    NbAccordionModule,
    NbCardModule,
    NbCheckboxModule,
    NgxSpinnerModule
  ],
  declarations: [ProfileComponent]
})
export class ProfileModule { }
