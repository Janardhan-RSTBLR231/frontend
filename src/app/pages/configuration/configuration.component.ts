import { Component, OnInit, TemplateRef, inject } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatTableDataSource } from '@angular/material/table';
import {
  NbToastrService, NbDialogService
} from '@nebular/theme';
import { NgxSpinnerService } from 'ngx-spinner';
import { ApiService } from '../../services/api.service'
import { ConfirmationdialogComponent } from '../confirmationdialog/confirmationdialog.component';
import { DailogAddNewComponent } from '../configuration/dailog-add-new/dailog-add-new.component'
import { DailogUpdateComponent } from '../configuration/dailog-update/dailog-update.component'
import { OperationResponse } from '../../@core/interfaces/OperationResponse';
import { UserDTO } from '../../@core/interfaces/User'
import { CustomActionsComponent } from './custom-actions/custom-actions.component'
export interface Tabledetails {
  id: string;
  code: string;
  name: string;
  description: string;

}
@Component({
  selector: 'ngx-configuration',
  templateUrl: './configuration.component.html',
  styleUrls: ['./configuration.component.scss']
})

export class ConfigurationComponent implements OnInit {
  public configurationdata?: Tabledetails[];
  selectedTable: string = "";
  displayedColumns: string[] = ['id', 'code', 'description', 'action'];
  dataSource = new MatTableDataSource<Tabledetails>();
  userdata: UserDTO;
  config: any;
  recordsCount: number;
  tabledetails: any;
  apiService = inject(ApiService);
  loading: boolean;

  settings = {
    actions: {
      add: false,
      edit: false,
      delete: false
    },
    hideSubHeader: false,
    columns: {
      id: {
        title: 'ID',
        hide: true,
      },
      code: {
        title: 'Code',
        type: 'number',
      },
      description: {
        title: 'Description',
        type: 'string',
      },
      // Define your custom buttons column
      action: {
        title: 'Actions',
        type: 'custom',
        sort: false,
        renderComponent: CustomActionsComponent, // Custom component for buttons
        onComponentInitFunction: (instance) => {
          instance.edit.subscribe((row) => {
            this.updatedata(row); // Handle button click event
          });
          instance.delete.subscribe((id) => {
            this.deletedata(id); // Handle delete button click event
          });
        },
      },
    },
  };

  source: LocalDataSource = new LocalDataSource();

  constructor(private dialogService: NbDialogService,
    private toasterService: NbToastrService,
    private spinnerService: NgxSpinnerService
  ) { }

  ngOnInit() {
    this.selectedTable = 'Plant'
    this.spinnerService.show();
    this.apiService.getconfig().subscribe((response: OperationResponse) => {
      this.spinnerService.hide();
      if (response.payload && Array.isArray(response.payload)) {
        const filteredData = response.payload.filter(item => item.name === this.selectedTable);
        this.source.load(filteredData)
        this.recordsCount = filteredData.length;
      }
    });
  }


  onTableChange() {
    this.spinnerService.show();
    this.apiService.getconfig().subscribe((response) => {
      this.spinnerService.hide();
      if (response.payload && Array.isArray(response.payload)) {
        if (this.selectedTable === "Maintenance Class") {
          this.selectedTable = "Zone"
          const filteredData = response.payload.filter(item => item.name === this.selectedTable);
          this.source.load(filteredData)
          this.recordsCount = filteredData.length;
        }
        else {
          this.spinnerService.hide();
          const filteredData = response.payload.filter(item => item.name === this.selectedTable);
          this.source.load(filteredData)
          this.recordsCount = filteredData.length;
        }

      }
    });
  }

  InsertData() {
    const selected = this.selectedTable;
    let title: string;
    if (selected === 'Zone') {
      title = "Maintenance Class";
    } else {
      title = selected;
    }
    this.dialogService.open(DailogAddNewComponent
      , {
        context: {
          title: title,
        },
        closeOnBackdropClick: false,
        closeOnEsc: false,
      })
      .onClose.subscribe(result => {
        if (result && result.tabledetails) {
          this.configurationdata = result.tabledetails;
          this.spinnerService.show();
          this.apiService.postnewconfig(this.configurationdata).subscribe((response: OperationResponse) => {
            this.spinnerService.hide();
            if (response.isSuccess) {

              this.toasterService.success(response.messages, 'Inserted');

              this.reload();
            } else {
              this.toasterService.danger(response.messages, 'Error');
              this.reload();
            }
          },
            errors => {
              this.spinnerService.hide();
              this.toasterService.danger(errors, 'Error');
            });
        }
      })
  }

  deletedata(id: any) {
    const selected = this.selectedTable
    this.dialogService.open(ConfirmationdialogComponent, {
      context: {
        title: "Are you sure you want to delete?",
      },
      closeOnBackdropClick: false,
      closeOnEsc: false,
    }).onClose.subscribe(data => {
      if (data === 'ok') {
        this.spinnerService.show();
        this.apiService.deleteconfig(id).subscribe((response: OperationResponse) => {
          this.spinnerService.hide();
          if (response.isSuccess) {

            this.toasterService.success(response.messages, 'Deleted');

            this.reload();
          } else {
            this.spinnerService.hide();
            this.toasterService.danger(response.messages, 'Error');
            this.reload();
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

  updatedata(rowdata: any) {
    const selected = this.selectedTable;
    let title: string;
    if (selected === 'Zone') {
      title = "Maintenance Class";
    } else {
      title = selected;
    }
    this.dialogService.open(DailogUpdateComponent
      , {
        context: {
          title: title,
          configdetails: rowdata,
        },
        closeOnBackdropClick: false,
        closeOnEsc: false,
      })
      .onClose.subscribe(result => {
        if (result && result.tabledetails) {
          this.configurationdata = result.tabledetails;
          this.spinnerService.show();
          this.apiService.updateconfig(this.configurationdata).subscribe((response: OperationResponse) => {
            this.spinnerService.hide();
            if (response.isSuccess) {
              
              this.toasterService.success(response.messages, 'Updated');
              
              this.reload();
            } else {
              this.toasterService.danger(response.messages, 'Error');
              this.reload();
            }
          },
            errors => {
              this.spinnerService.hide();
              this.toasterService.danger(errors, 'Error');
            })
        }
      });
  }

  reload() {
    this.apiService.getconfig().subscribe((response) => {
      if (this.selectedTable === "Maintenance Class") {
        this.selectedTable = "Zone"
        const filteredData = response.payload.filter(item => item.name === this.selectedTable);
        this.source.load(filteredData)
        this.recordsCount = filteredData.length;
      }
      else {
        const filteredData = response.payload.filter(item => item.name === this.selectedTable);
        this.source.load(filteredData)
        this.recordsCount = filteredData.length;
      }
    });
  }
}
