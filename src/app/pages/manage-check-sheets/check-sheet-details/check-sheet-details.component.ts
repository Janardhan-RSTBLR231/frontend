import { Component, OnInit, inject } from '@angular/core';
import { NbDialogService, NbToastrService } from '@nebular/theme';
import { LocalDataSource } from 'ng2-smart-table';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { ChecksheetRowrenderComponent } from '../checksheet-rowrender.component'
import { ApproverandReviewer } from '../../../@core/interfaces/CheckSheetVersion'
import { ApiService } from '../../../services/api.service';
import { ApproverAndReviewerSelectionComponent } from '../approver-and-reviewer-selection/approver-and-reviewer-selection.component'
import { OperationResponse } from '../../../@core/interfaces/OperationResponse';
import { JwtService } from '../../../@core/services/jwt.service'
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'ngx-check-sheet-details',
  templateUrl: './check-sheet-details.component.html',
  styleUrls: ['./check-sheet-details.component.scss']
})
export class CheckSheetDetailsComponent implements OnInit {
  searchValue: string = '';
  selectedRows;
  loading = false;
  ardata: ApproverandReviewer[] = [];
  allTab: any[];
  submittedTab: any[];
  reviewedTab: any[];
  approvedTab: any[];
  submittedTabCount: number = 0;
  reviewedTabCount: number = 0;
  approvedTabCount: number = 0;
  allCount: number = 0;
  reveiewCount: number = 0;
  submittedCount: number = 0;
  approveCount: number = 0;
  checkboxChecked: boolean = false;
  apiService = inject(ApiService);
  globalSearch: string = "";
  userRole: string;
  requestData: any;
  searchTooltip: string = "Search by Checksheet Name,Line,Station,Status,Revision";
  public onUserRowSelect(event) {
    this.selectedRows = event.selected;
  }

  constructor(private router: Router,
    private dialogService: NbDialogService,
    private toasterService: NbToastrService,
    private jwtservice: JwtService,
    private spinnerService: NgxSpinnerService) { }
  settings = {
    actions: false,
    hideSubHeader: true,
    columns: {
      name: {
        title: 'Check Sheet Name',
        type: 'custom',
        filter: false,
        renderComponent: ChecksheetRowrenderComponent,
      },
      line: {
        title: 'Line',
        type: 'string',
      },
      department: {
        title: 'Department',
        type: 'string',
      },
      station: {
        title: 'Station',
        type: 'string',
      },
      createdBy: {
        title: 'Created by',
        type: 'string',
      },
      createdOn: {
        title: 'Created on',
        type: 'string',
        valuePrepareFunction: (value: string, row: any, cell: any) => {
          const datePipe = new DatePipe('en-US');
          return datePipe.transform(value, 'dd-MM-yyyy HH:mm:ss', 'UTC');
        }
      },
      revision: {
        title: 'Revision',
        type: 'string',
      },
      status: {
        title: 'Status',
        type: 'string',
      }
    },
  };

  source: LocalDataSource;

  ngOnInit(): void {
    this.getLatest();
    this.userRole = this.jwtservice.getRole();
  }

  getLatest() {
    this.spinnerService.show();
    this.apiService.getLatestCheckSheet(this.globalSearch).subscribe((response: OperationResponse) => {
      this.spinnerService.hide();
      if (response.isSuccess) {
        this.allTab = response.payload;
        this.submittedTab = this.allTab.filter(sheet => sheet.status === 'Submitted');
        this.reviewedTab = this.allTab.filter(sheet => sheet.status === 'Reviewed' || sheet.status === 'Partially Reviewed');
        this.approvedTab = this.allTab.filter(sheet => sheet.status === 'Approved' || sheet.status === 'Partially Approved')
        this.updateBadgeCounts();
        this.source = new LocalDataSource(this.allTab);
        this.allCount = response.recordCount;
        this.submittedCount = this.submittedTab.length;
        this.reveiewCount = this.reviewedTab.length;
        this.approveCount = this.approvedTab.length;
      }
      else {
        this.toasterService.danger(response.messages, 'Error');
      }
    },
      errors => {
        this.spinnerService.hide();
        this.toasterService.danger(errors, 'Error');
      }
    );
  }
  showVersion() {
    this.spinnerService.show();
    this.apiService.getCheckSheetVersion(this.globalSearch).subscribe((response: OperationResponse) => {
      this.spinnerService.hide();
      if (response.isSuccess) {
        this.allTab = response.payload;
        this.submittedTab = this.allTab.filter(sheet => sheet.status === 'Submitted');
        this.reviewedTab = this.allTab.filter(sheet => sheet.status === 'Reviewed' || sheet.status === 'Partially Reviewed');
        this.approvedTab = this.allTab.filter(sheet => sheet.status === 'Approved' || sheet.status === 'Partially Approved')
        this.allCount = response.recordCount;
        this.submittedCount = this.submittedTab.length;
        this.reveiewCount = this.reviewedTab.length;
        this.approveCount = this.approvedTab.length;
        this.updateBadgeCounts();
        this.source = new LocalDataSource(this.allTab);
      }
      else {
        this.toasterService.danger(response.messages, 'Error');
      }
    },
      errors => {
        this.spinnerService.hide();
        this.toasterService.danger(errors, 'Error');
      },
    );

  }
  private updateBadgeCounts(): void {
    this.submittedTabCount = this.submittedTab.length;
    this.reviewedTabCount = this.reviewedTab.length;
    this.approvedTabCount = this.approvedTab.length;
  }


  newChecksheet() {
    this.dialogService.open(ApproverAndReviewerSelectionComponent, {
      context: {
        title: "Add New Check Sheet"
      },
      closeOnBackdropClick: false,
      closeOnEsc: false,
    }).onClose.subscribe(result => {
      if (result && result.requestData) {
        this.ardata = result.requestData;
        this.spinnerService.show();
        this.apiService.createCheckSheet(this.ardata).subscribe((response: OperationResponse) => {
          this.spinnerService.hide();
          if(response.isSuccess) {
            const id = response.payload.id;
            this.router.navigate(['/pages/manage-check-sheets/add-new-check-sheet/', id]);

          } else {
            this.toasterService.danger(response.messages, 'Error');
          }
        },
          errors => {
            this.spinnerService.hide();
            this.toasterService.danger(errors, 'Error');
          },
        );
      }
    });
  }

  ApplyFilter() {
    if (this.checkboxChecked && this.globalSearch) {
      this.showVersion();

    }
    else if (this.checkboxChecked && !this.globalSearch) {
      this.showVersion();
    }
    else if (!this.checkboxChecked && this.globalSearch) {
      this.getLatest();
    }
    else {
      this.getLatest();
    }
  }
}
