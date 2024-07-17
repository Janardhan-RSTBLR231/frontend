import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Ng2SmartTableComponent, Cell, LocalDataSource } from 'ng2-smart-table';
import { CheckPointRowRenderComponent } from '../check-point-row-render.component';
import { NbToastrService } from '@nebular/theme';
import { ApiService } from '../../../services/api.service'
import { CheckSheets } from '../../../@core/interfaces/CheckSheets';
import { DatePipe } from '@angular/common';
import { CheckSheetTooltipComponent } from '../check-sheet-revision-tooltip.component';
import { CustomRowColourComponent } from '../custom-row-colour/custom-row-colour.component';
import { OperationResponse } from '../../../@core/interfaces/OperationResponse';
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'ngx-check-sheet-details',
  templateUrl: './check-sheet-details.component.html',
  styleUrls: ['./check-sheet-details.component.scss']
})
export class CheckSheetDetailsComponent implements OnInit {
  searchValue: string = '';
  selectedRows;
  checksheetDetails: CheckSheets[];
  allData: any[];
  notStartedData: CheckSheets[] = [];
  inProgressData: CheckSheets[] = [];
  submittedData: CheckSheets[] = [];
  approvedData: CheckSheets[] = [];
  ngData: CheckSheets[] = [];
  notStartedBadgeCount: number = 0;
  inProgressBadgeCount: number = 0;
  submittedBadgeCount: number = 0;
  approvedBadgeCount: number = 0;
  ngBadgeCount: number = 0;
  badgeCount: any;
  apiService = inject(ApiService);
  globalSearch: string = "";
  public onUserRowSelect(event) {
    this.selectedRows = event.selected;
  }
  constructor(private router: Router, private toasterService: NbToastrService,
    private spinnerService: NgxSpinnerService) { }

  ngOnInit() {

    this.getChecksheetDetails(this.globalSearch);
  }

  settings = {

    columns: {

      name: {
        title: 'Check Sheet Name',
        filter: false,
        type: 'custom',
        renderComponent: CheckPointRowRenderComponent,
      },
      line: {
        title: 'Line',
        filter: false,
        type: 'custom',
        renderComponent: CustomRowColourComponent
      },
      station: {
        title: 'Station',
        filter: false,
        type: 'custom',
        renderComponent: CustomRowColourComponent
      },
      shift: {
        title: 'Shift',
        filter: false,
        type: 'custom',
        renderComponent: CustomRowColourComponent
      },
      department: {
        title: 'Department',
        filter: false,
        type: 'custom',
        renderComponent: CustomRowColourComponent
      },
      startedBy: {
        title: 'Started by',
        filter: false,
        type: 'custom',
        renderComponent: CustomRowColourComponent
      },
      startedOn: {
        title: 'Started at',
        filter: false,
        type: 'custom',
        renderComponent: CustomRowColourComponent,
        valuePrepareFunction: (value: string, row: any, cell: any) => {
          const datePipe = new DatePipe('en-US');
          return datePipe.transform(value, 'HH:mm', 'UTC');
        }
      },
      validatedBy: {
        title: 'Validated by',
        filter: false,
        type: 'custom',
        renderComponent: CustomRowColourComponent
      },
      validatedOn: {
        title: 'Validated at',
        filter: false,
        type: 'custom',
        renderComponent: CustomRowColourComponent,
        valuePrepareFunction: (value: string, row: any, cell: any) => {
          const datePipe = new DatePipe('en-US');
          return datePipe.transform(value, 'HH:mm', 'UTC');
        }
      },
      status: {
        title: 'Status',
        filter: false,
        type: 'custom',
        renderComponent: CustomRowColourComponent
      },
      revision: {
        title: 'Revision',
        filter: false,
        type: 'custom',
        renderComponent: CheckSheetTooltipComponent,
        valuePrepareFunction: (cell, row) => {
          CheckSheetTooltipComponent.revision = row.revision;
          CheckSheetTooltipComponent.anotherValue = row.changeDetails; // Assign another value directly
          return row.revision; // Return the revision value
        }
      },
      colorCode: {
        title: 'Colour Code',
        type: 'custom',
        hide: true,
        renderComponent: CustomRowColourComponent
      }

    },
    actions: false,
    hideSubHeader: true,
  };
  data: LocalDataSource;
  getChecksheetDetails(searchValue: any) {
    this.spinnerService.show();
    this.apiService.getCheckSheet(searchValue).subscribe(
      (response: OperationResponse) => {
        this.spinnerService.hide();
        if (response.isSuccess) {
          this.checksheetDetails = response.payload.checkSheetTransaction;
          this.badgeCount = response.payload.badgeCount;
          this.allData = this.checksheetDetails;
          this.data = new LocalDataSource(this.allData);
          this.notStartedData = this.allData.filter(sheet => sheet.status === 'Not Started');
          this.inProgressData = this.allData.filter(sheet => sheet.status === 'In Progress');
          this.submittedData = this.allData.filter(sheet => sheet.status === 'Submitted');
          this.approvedData = this.allData.filter(sheet => sheet.status === 'Approved');
          this.notStartedBadgeCount = this.badgeCount["Not Started"];
          this.inProgressBadgeCount = this.badgeCount["In Progress"];
          this.submittedBadgeCount = this.badgeCount["Submitted"];
          this.approvedBadgeCount = this.badgeCount["Approved"];
        } else {
          this.spinnerService.hide();
          this.toasterService.danger(response.messages, 'Error');
        }
      },
      (error) => {
        this.spinnerService.hide();
        this.toasterService.danger(error, 'Error');
      }
    );
  }


  ApplyFilter() {
    this.getChecksheetDetails(this.globalSearch);
  }
  ResetFilter() {
    this.globalSearch = ""
    this.getChecksheetDetails(this.globalSearch);
  }

}