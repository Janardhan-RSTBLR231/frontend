import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NbToastrService, NbDialogService, NbDateService } from '@nebular/theme';
import { Subscription, Subject } from 'rxjs';
import { NgForm } from '@angular/forms';
import { Settings, Shift } from '../../@core/interfaces/Settings';
import { ApiService } from '../../services/api.service';
import { OperationResponse } from '../../@core/interfaces/OperationResponse';
import { ConfirmationdialogComponent } from '../confirmationdialog/confirmationdialog.component';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'ngx-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  title: string = 'Settings';
  isDropDownChanged: boolean = false;
  showMessages: any;
  settings: Settings = this.getEmptySettings();
  shifts: Shift[];
  isSubmitted: boolean = false;
  rowData: any[];
  @ViewChild('form', { static: false }) myform: NgForm;
  date = new Date();

  protected readonly unsubscribe$ = new Subject<void>();
  constructor(private toasterService: NbToastrService,
    private apiService: ApiService,
    private dialogService: NbDialogService,
    protected dateService: NbDateService<Date>,
    private spinnerService: NgxSpinnerService
  ) {
    this.getSettings();
  }

  private getEmptySettings(): Settings {
    return {
      locktime: 0,
      shifts: [],
      senderEmailAddress: '',
      smtpEnableSSL: false,
      smtpHost: '',
      smtpPort: 0,
      smtpUserId: '',
      smtpPassword: '',
      id: '',
      createdOn: '',
      createdBy: '',
      modifiedOn: '',
      modifiedBy: '',
      isActive: false
    }
  }

  ngOnInit(): void {
  }
  submit(form: NgForm) {
    this.isSubmitted = true;

    if (!form.valid) {
      this.toasterService.warning('Please complete the form', 'Error');
      return;
    }
    if (!form.dirty && !this.isDropDownChanged) {
      this.toasterService.info('Nothing to update', 'Error');
      return;
    }

    this.update();

    this.isSubmitted = false;
    this.isDropDownChanged = false;
    this.myform.form.markAsPristine();
  }
  
  update() {
    this.spinnerService.show();
    this.apiService.updateSettings(this.settings).subscribe((response: OperationResponse) => {
      this.spinnerService.hide();
      if (response.isSuccess) {
        this.settings = response.payload;
        this.shifts = this.settings.shifts
        this.toasterService.success(response.messages, 'Updated');
      } else {
        this.toasterService.danger(response.messages, 'Error');
      }
    },
      errors => {
        this.spinnerService.hide();
        this.toasterService.danger(errors, 'Error');
      });
  }

  getSettings() {
    this.spinnerService.show();
    this.apiService.getSettings().subscribe((response: OperationResponse) => {
      this.spinnerService.hide();
      if (response.isSuccess) {
        this.settings = response.payload;
        this.shifts = this.settings.shifts

      } else {
        this.toasterService.danger(response.messages, 'Error');
      }
    },
      errors => {
        this.spinnerService.hide();
        this.toasterService.danger(errors, 'Error');
      });
  }

  changesmtpEnableSSL($event) {
    this.settings.smtpEnableSSL = $event;
    this.isDropDownChanged = true;
  }
}
