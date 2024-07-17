import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { DynamicFilter, DynamicTable } from '../../../@core/interfaces/DynamicFilter';
import { NbDialogService, NbToastrService } from '@nebular/theme';
import { OperationResponse } from '../../../@core/interfaces/OperationResponse';
import { JwtService } from '../../../@core/services/jwt.service';
import { DatePipe, formatDate } from '@angular/common';
import { LocalDataSource } from 'ng2-smart-table';
import { ViewCheckPointRowrenderComponent } from '../view-check-point-rowrender.component'
import { ApiService } from '../../../services/api.service'
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'ngx-view-checsheet-details',
  templateUrl: './view-checsheet-details.component.html',
  styleUrls: ['./view-checsheet-details.component.scss']
})
export class ViewChecsheetDetailsComponent implements OnInit {
  loading = false;
  globalSearch: string = "";
  fromDate = new Date();
  toDate = new Date();
  Fromdate: string;
  Todate: string;
  totalcount: any;
  searchByDate: boolean = false;
  isSubmitted: boolean = false;
  searchTooltip: string = "Search by Checksheet Name,Line,Station,Status,Revision";
  constructor(private apiservice: ApiService, private datePipe: DatePipe,
    private toasterService: NbToastrService,
    private spinnerService: NgxSpinnerService) { }
  allChecksheets: any;
  settings = {
    hideSubHeader: true,
    actions: false,
    columns: {
      name: {
        title: 'Check Sheet Name',
        type: 'string',
      },
      line: {
        title: 'Line',
        type: 'string',
      },
      station: {
        title: 'Station',
        type: 'string',
      },
      shift: {
        title: 'Shift',
        type: 'string',
      },
      checkSheetDay: {
        title: 'Check Sheet day',
        type: 'string',
        valuePrepareFunction: (value: string, row: any, cell: any) => {
          const datePipe = new DatePipe('en-US');
          return datePipe.transform(value, 'dd-MM-yyyy', 'UTC');
        }
      },
      startedBy: {
        title: 'Started by',
        type: 'string',
      },
      startedOn: {
        title: 'Started at',
        type: 'string',
        valuePrepareFunction: (value: string, row: any, cell: any) => {
          const datePipe = new DatePipe('en-US');
          return datePipe.transform(value, 'dd-MM-yyyy HH:mm', 'UTC');
        }
      },
      validatedBy: {
        title: 'Validated by',
        type: 'string',
      },
      validatedOn: {
        title: 'Validated at',
        type: 'string',
        valuePrepareFunction: (value: string, row: any, cell: any) => {
          const datePipe = new DatePipe('en-US');
          return datePipe.transform(value, 'dd-MM-yyyy HH:mm', 'UTC');
        }
      },
      status: {
        title: 'Status',
        type: 'string',
      },
      revision: {
        title: 'Revision',
        type: 'string',
      },
    },
  };


  source: LocalDataSource;
  ngOnInit() {
    this.totalcount = 0;
  }

  ApplyFilter() {
    this.searchByDate = true;
    if (!this.fromDate && !this.toDate && this.globalSearch) {
      this.Fromdate = ""
      this.Todate = ""
      this.searchByDate = false
      this.filter(this.globalSearch, this.searchByDate, this.Fromdate, this.Todate)
    }
    else if (this.fromDate && this.toDate && !this.globalSearch && this.searchByDate) {
      this.Fromdate = new DatePipe('en-US').transform(this.fromDate, 'yyyy-MM-dd');
      this.Todate = new DatePipe('en-US').transform(this.toDate, 'yyyy-MM-dd');
      this.globalSearch = "";
      this.filter(this.globalSearch, this.searchByDate, this.Fromdate, this.Todate)
    }
    else if (this.fromDate && this.toDate && this.globalSearch && this.searchByDate) {
      this.Fromdate = new DatePipe('en-US').transform(this.fromDate, 'yyyy-MM-dd');
      this.Todate = new DatePipe('en-US').transform(this.toDate, 'yyyy-MM-dd');
      this.searchByDate = true;
      this.filter(this.globalSearch, this.searchByDate, this.Fromdate, this.Todate)
    }
    else {
      this.Fromdate = ""
      this.Todate = ""
      this.searchByDate = false;
      this.globalSearch = "";
      this.filter(this.globalSearch, this.searchByDate, this.Fromdate, this.Todate)
    }

  }
  filter(searchvale: string, searchbydate: boolean, fdate: string, todate: string) {
    this.spinnerService.show();
    this.apiservice.getViewcheksheets(searchvale, searchbydate, fdate, todate).subscribe((response: OperationResponse) => {
      this.spinnerService.hide();
      if (response.isSuccess) {
        this.allChecksheets = response.payload;
        this.source = new LocalDataSource(this.allChecksheets);
        this.totalcount = response.recordCount;
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
  ResetFilter() {
    this.spinnerService.show();
    this.source = new LocalDataSource();
    this.totalcount = 0;
    this.fromDate = new Date();
    this.toDate = new Date();
    this.globalSearch = "";
    setTimeout(() => {
      this.spinnerService.hide();
    }, 1000);
  }

  Export() {
    this.searchByDate = true;
    if (!this.fromDate && !this.toDate && this.globalSearch) {
      this.Fromdate = ""
      this.Todate = ""
      this.searchByDate = false
      this.export2Excel(this.globalSearch, this.searchByDate, this.Fromdate, this.Todate)
    }
    else if (this.fromDate && this.toDate && !this.globalSearch && this.searchByDate) {
      this.Fromdate = new DatePipe('en-US').transform(this.fromDate, 'yyyy-MM-dd');
      this.Todate = new DatePipe('en-US').transform(this.toDate, 'yyyy-MM-dd');
      this.globalSearch = "";
      this.export2Excel(this.globalSearch, this.searchByDate, this.Fromdate, this.Todate)
    }
    else if (this.fromDate && this.toDate && this.globalSearch && this.searchByDate) {
      this.Fromdate = new DatePipe('en-US').transform(this.fromDate, 'yyyy-MM-dd');
      this.Todate = new DatePipe('en-US').transform(this.toDate, 'yyyy-MM-dd');
      this.searchByDate = true;
      this.export2Excel(this.globalSearch, this.searchByDate, this.Fromdate, this.Todate)
    }
    else if (!this.fromDate && !this.toDate && !this.globalSearch) {
      this.Fromdate = ""
      this.Todate = ""
      this.searchByDate = false;
      this.globalSearch = "";
      this.export2Excel(this.globalSearch, this.searchByDate, this.Fromdate, this.Todate)
    }
  }
  export2Excel(search: string, searchbydate: boolean, fromdate: string, todate: string) {
    this.spinnerService.show();
    this.apiservice.getExport2Excel1(search, searchbydate, fromdate, todate).subscribe(data => {
      this.spinnerService.hide();
      this.downloadFile(data, "DAIKIN_DigitalCheckSheet_Transactions_" + this.datePipe.transform(new Date(), 'ddMMMyyyy'))
    });
  }

  downloadFile(data: any, filename: string) {
    const url = window.URL.createObjectURL(data);
    const a = document.createElement('a');
    document.body.appendChild(a);
    a.setAttribute('style', 'display: none');
    a.href = url;
    a.download = filename + '.xlsx';
    a.click();
    window.URL.revokeObjectURL(url);
    a.remove();
  }

}
