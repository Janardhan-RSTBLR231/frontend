import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Checkpoint } from '../../../@core/interfaces/CheckSheetVersion'
import { NbDialogService, NbToastrService } from '@nebular/theme';
import { ApiService } from '../../../services/api.service';
import { Subject } from 'rxjs';
import { NgForm } from '@angular/forms';
import { OperationResponse } from '../../../@core/interfaces/OperationResponse';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'ngx-add-new-check-point',
  templateUrl: './add-new-check-point.component.html',
  styleUrls: ['./add-new-check-point.component.scss']
})
export class AddNewCheckPointComponent implements OnInit {
  weekdayOptions: any[] = [
    { value: 1, label: 'Monday' },
    { value: 2, label: 'Tuesday' },
    { value: 3, label: 'Wednesday' },
    { value: 4, label: 'Thursday' },
    { value: 5, label: 'Friday' },
    { value: 6, label: 'Saturday' },
    { value: 7, label: 'Sunday' }
  ];
  monthDays: number[] = Array.from(Array(31), (_, i) => i + 1);
  yearlymonthdays: number[] = Array.from(Array(31), (_, i) => i + 1);
  yearlymonths: { value: number, label: string }[] = [
    { value: 1, label: 'January' },
    { value: 2, label: 'February' },
    { value: 3, label: 'March' },
    { value: 4, label: 'April' },
    { value: 5, label: 'May' },
    { value: 6, label: 'June' },
    { value: 7, label: 'July' },
    { value: 8, label: 'August' },
    { value: 9, label: 'September' },
    { value: 10, label: 'October' },
    { value: 11, label: 'November' },
    { value: 12, label: 'December' }
  ];

  checkpoint: Checkpoint = this.getEmptychekpoint();
  loading = false;
  isSubmitted: boolean = false;
  url = '';
  selectedCheckSheetID: string;
  selectedOption: any;
  isDropDownChanged: boolean = false;
  apiService = inject(ApiService);
  @ViewChild('form', { static: false }) myform: NgForm;

  protected readonly unsubscribe$ = new Subject<void>();
  isEdit: any;

  constructor(private router: Router,
    private route: ActivatedRoute,
    private dialogService: NbDialogService,
    private toasterService: NbToastrService,
    private spinnerService: NgxSpinnerService) { }


  ngOnInit(): void {
    this.selectedCheckSheetID = this.route.snapshot.paramMap.get('checksheetid');

  }

  private getEmptychekpoint(): Checkpoint {
    return {
      id: undefined,
      name: '',
      standard: '',
      condition: '',
      method: '',
      fileName: '',
      uniqueFileName: '',
      seqOrder: 0,
      frequencyType: 'select',
      completeInSeconds: 0,
      weekDays: [],
      monthDays: [],
      yearlyMonths: [],
      yearlyMonthDays: [],

    }

  }

  backToAddChecksheet() {
    this.router.navigate(['/pages/manage-check-sheets/add-new-check-sheet', this.selectedCheckSheetID])
  }


  getDeleteConfirmationMessage(): string {
    return `Are you sure you want to delete this Checkpoint?`;
  }

  Save(form: NgForm) {
    this.isSubmitted = true;
    if (!form.valid) {
      this.toasterService.warning('Please complete the form', 'Error');
      return;
    }
    if (!form.dirty && !this.isDropDownChanged) {
      this.toasterService.info('Nothing to update', 'Error');
      return;
    }
    if (this.isEdit) {
      this.update();
    } else {
      this.add();
    }
    this.isSubmitted = false;
    this.isDropDownChanged = false;
    this.myform.form.markAsPristine();
  }
  update() {
    throw new Error('Method not implemented.');
  }

  add()
  {
    this.spinnerService.show();
    this.apiService.createcheckpoint(this.selectedCheckSheetID, this.checkpoint).subscribe((response: OperationResponse) => {
      this.spinnerService.hide();
      if (response.isSuccess) {
        this.toasterService.success(response.messages, 'Inserted');
        this.router.navigate(['/pages/manage-check-sheets/add-new-check-sheet/', this.selectedCheckSheetID]);
      } else {
        this.spinnerService.hide()
        this.toasterService.danger(response.messages, 'Error');
      }
    },
      errors => {
        this.spinnerService.hide()
        this.toasterService.danger('Please Enter Valid Value', 'Error');
      }
    );
  }


  changefreaquency($event) {
    this.checkpoint.frequencyType = $event;
    this.isDropDownChanged = true;
  }
  changeweekdays($event) {
    this.checkpoint.weekDays = $event;
    this.isDropDownChanged = true;
  }
  changemonthdays($event) {
    this.checkpoint.monthDays = $event;
    this.isDropDownChanged = true;
  }
  changeyearlymonths($event) {
    this.checkpoint.yearlyMonths = $event;
    this.isDropDownChanged = true;
  }
  changesyearlymonthsdays($event) {
    this.checkpoint.yearlyMonthDays = $event;
    this.isDropDownChanged = true;
  }
}
