import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { ApiService } from '../../../services/api.service'
import { CheckSheetTransaction, BadgeCount, UserActions } from '../../../@core/interfaces/ChecksheetDetails'
import { Cell, LocalDataSource } from 'ng2-smart-table';
import { ImageCacheService } from '../../../services/image-cache.service'
import { CheckRecordCustomRenderComponent } from '../check-record-custom-render/check-record-custom-render.component'
import { OperationResponse } from '../../../@core/interfaces/OperationResponse';
import { NbToastrService, NbDialogService } from '@nebular/theme';
import { JwtService } from '../../../@core/services/jwt.service'
import { BadgeCountService } from '../badgeCount.service';
import { Dictionary } from '../../../auth/models/user';
import { NgxSpinnerService } from 'ngx-spinner';
import { ImageRenderComponent } from '../image-render/image-render.component'
import { ShiftDialogComponent } from '../shift-dialog/shift-dialog.component';
@Component({
  selector: 'ngx-check-point-details',
  templateUrl: './check-point-details.component.html',
  styleUrls: ['./check-point-details.component.scss']
})
export class CheckPointDetailsComponent implements OnInit {

  @ViewChild('fileInput') fileInput: ElementRef;

  selectedTable: string = "";
  status: string;
  useractions: any;
  okData: any = [];
  ngData: any = [];
  naData: any = [];
  normalData: any = [];
  abnormalcuData: any = [];
  applydd: any;
  checkSheetTransaction: CheckSheetTransaction = this.getEmptyCheckSheetTransaction();
  userActions: UserActions = this.getEmptyUseraction();
  badgeCount: BadgeCount = this.getEmptyBadgeCount()
  showComments = false;
  allcheckpointtext = false;
  apiService = inject(ApiService);
  rowData: any[];
  selectedCheckSheetId: string;
  selectedCheckSheetName: string;
  selectedRowId: any;
  selectedValue: any;
  Usercomment: any;
  isCheckSheetSubmitted: boolean = false;
  globalSearch: string = "";
  checksheetId: string;
  userrole: string;
  itemToUpdate: any;
  updatedComments: any;
  noimages: any = "../../../../assets/images/NoImage.jpg"
  constructor(private router: Router, private route: ActivatedRoute,
    private toasterService: NbToastrService,
    private imageCacheservice: ImageCacheService,
    private datePipe: DatePipe,
    private jwtservice: JwtService,
    private badgeCountService: BadgeCountService,
    private spinnerService: NgxSpinnerService,
    private dialogService: NbDialogService,
    private cdr: ChangeDetectorRef) {

    this.selectedCheckSheetId = this.route.snapshot.paramMap.get('id');
    this.selectedCheckSheetName = this.route.snapshot.paramMap.get('name')
    this.badgeCountService.badgeCount$.subscribe((badgeCounts: Dictionary<number>) => {
      // Log the contents of the dictionary
      // If you want to iterate over the dictionary
      const hasOK = badgeCounts.hasOwnProperty('OK');
      const hasNA = badgeCounts.hasOwnProperty('NA');
      const hasNG = badgeCounts.hasOwnProperty('NG');
      const hasAbnormalCanUse = badgeCounts.hasOwnProperty('AbnormalCanUse');
      Object.keys(badgeCounts).forEach(key => {
        if (key == "OK") {
          this.badgeCount.OK = badgeCounts[key];
          this.updateTabsData();
        } else if (key == "NA") {
          this.badgeCount.NA = badgeCounts[key];
          this.updateTabsData();
        } else if (key == "NG") {
          this.badgeCount.NG = badgeCounts[key];
          this.updateTabsData();
        } else if (key == "AbnormalCanUse") {
          this.badgeCount.AbnormalCanUse = badgeCounts[key];
          this.updateTabsData();
        }
      });
      if (!hasOK) {
        this.badgeCount.OK = 0;
      }
      if (!hasNA) {
        this.badgeCount.NA = 0;
      }
      if (!hasNG) {
        this.badgeCount.NG = 0;
      }
      if (!hasAbnormalCanUse) {
        this.badgeCount.AbnormalCanUse = 0;
      }
    });
  }

  settings = {
    actions: {
      add: false,
      edit: false,
      delete: false
    },
    hideSubHeader: true,
    columns: {
      id: {
        title: 'ID',
        hide: true,
      },

      seqOrder: {
        title: 'Seq Order',
        filter: false,
        width: '121px',

      },
      name: {
        title: 'Name',
        filter: false,

      },
      standard: {
        title: 'Standard',
        filter: false,

      },
      condition: {
        title: 'Condition',
        filter: false,

      },
      method: {
        title: 'Method',
        filter: false,

      },
      frequencyText: {
        title: 'Frequency',
        filter: false,

      },
      image: {
        title: 'Image',
        type: 'custom',
        renderComponent: ImageRenderComponent,
      },
      checkRecord: {
        title: 'Check Record',
        type: 'custom',
        renderComponent: CheckRecordCustomRenderComponent,
        onComponentInitFunction: (instance: any) => {

          instance.checksheetId = this.selectedCheckSheetId;
          instance.valueChange.subscribe((value: any) => {
            this.selectedRowId = instance.rowData.id;
            this.Usercomment = instance.rowData.comments;
            this.selectedValue = value;
            this.checksheetId = this.selectedCheckSheetId;
          });
          instance.commentAdded.subscribe((comments: string) => {
            this.Usercomment = comments;
          });
        },
        filter: false,
      },

    },

  };

  allData: any[];

  private getEmptyCheckSheetTransaction(): CheckSheetTransaction {
    return {
      checkPointTransactions: [],
      checkSheetId: "",
      department: "",
      line: "",
      maintenaceClass: "",
      station: "",
      equipment: "",
      equipmentCode: "",
      location: "",
      subLocation: "",
      checkSheetDay: "",
      startedBy: "",
      startedOn: "",
      validatedBy: "",
      validatedOn: "",
      status: "",
      colorCode: "",
      ngRecordExists: false,
      isLocked: false,
      lockedOn: "",
      name: "",
      lineId: "",
      departmentId: "",
      uniqueId: "",
      equipmentId: "",
      maintenaceClassId: "",
      stationId: "",
      locationId: "",
      subLocationId: "",
      version: 0,
      shift: "",
      revision: "",
      changeDetails: "",
      id: undefined,
      createdOn: "",
      createdBy: "",
      modifiedOn: "",
      modifiedBy: "",
      isActive: false
    }
  }
  private getEmptyUseraction(): UserActions {
    return {
      isReadOnly: false,
      showExportPrintVersion: false,
      showSubmitButton: false,
      showApproveButton: false,
    }
  }
  private getEmptyBadgeCount(): BadgeCount {
    return {
      OK: 0,
      NG: 0,
      AbnormalCanUse: 0,
      NA: 0
    }
  }

  back() {
    this.router.navigate(['pages/fill-check-sheet']);
  }
  ngOnInit(): void {
    this.userrole = this.jwtservice.getRole();
    this.assignDataToTabs();
  }

  assignDataToTabs() {
    try {
      this.spinnerService.show();
      this.apiService.getCheckPointDetailsById(this.selectedCheckSheetId).subscribe((response: OperationResponse) => {
        this.spinnerService.hide();
        if (response.isSuccess) {
          if (response.messages) this.toasterService.danger(response.messages, 'Error');
          this.badgeCount = response.payload.badgeCount;
          this.userActions = response.payload.userActions;
          this.status = this.checkSheetTransaction.status;
          this.checkSheetTransaction = response.payload.checkSheetTransaction;
          this.allData = this.checkSheetTransaction.checkPointTransactions.map(
            (checkpoint) => {
              const imagePath = checkpoint.fileName
                ? this.getImageFromCacheOrApi(
                  checkpoint.fileName,
                  checkpoint.uniqueFileName
                )
                : this.noimages;
              return {
                ...checkpoint,
                image: imagePath,
              };
            }
          );
          this.okData = this.allData.filter(data => data.checkRecord === 'OK');
          this.ngData = this.allData.filter(data => data.checkRecord === 'NG');
          this.abnormalcuData = this.allData.filter(data => data.checkRecord === 'AbnormalCanUse');
          this.naData = this.allData.filter(data => data.checkRecord === 'NA');
        }
        else {
          this.spinnerService.hide();
          this.toasterService.danger(response.messages, 'Error');
        }
      });
    } catch (error) {
      this.spinnerService.hide();
      this.toasterService.danger(error, 'Error');
    }
  }

  exportToExcel() {
    this.spinnerService.show();
    this.apiService.getExport2Excel(this.selectedCheckSheetId).subscribe(data => {
      this.spinnerService.hide();
      this.downloadFile(data, "Checksheet_" + this.datePipe.transform(new Date(), 'ddMMyyyyHHmmss'))
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
  onSubmit() {
    this.spinnerService.show();
    this.apiService.submitCheckSheet(this.selectedCheckSheetId).subscribe((response: OperationResponse) => {
      this.spinnerService.hide();
      if (response.isSuccess) {
        this.toasterService.success(response.messages, 'Submitted');
        this.router.navigate(['/pages/fill-check-sheet']);
      } else {
        this.toasterService.danger(response.messages, 'Error');
      }
    },
      errors => {
        this.spinnerService.hide();
        this.toasterService.danger(errors, 'Error');
      }
    );

  }
  ApproveCheckSheet() {
    this.spinnerService.show();
    this.apiService.approveCheckSheet(this.selectedCheckSheetId).subscribe((response: OperationResponse) => {
      this.spinnerService.hide();
      if (response.isSuccess) {
        this.toasterService.success(response.messages, 'Approved');
        this.router.navigate(['/pages/fill-check-sheet']);

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
  onApplyStatus() {
    const selected = this.applydd;
    const action = 'Save';
    const bulkUpdate = {
      checkSheetId: this.selectedCheckSheetId,
      checkRecord: selected,
      userAction: action
    }
    this.spinnerService.show();
    this.apiService.bulkUpdateChcekRecord(bulkUpdate).subscribe((response: OperationResponse) => {
      this.spinnerService.hide();
      if (response.isSuccess) {
        this.badgeCount = response.payload
        this.toasterService.success(response.messages, 'Updated');
        this.bulkUpdateTabsData(bulkUpdate.checkRecord);
      } else {
        this.toasterService.danger(response.messages, 'Error');
        this.bulkUpdateTabsData(bulkUpdate.checkRecord);
      }
    },
      errors => {
        this.spinnerService.hide();
        this.toasterService.danger(errors, 'Error');
      },
    );
  }
  isFormLocked(): boolean {
    return this.status === 'Approved' || this.status === 'Submitted' || this.status === 'Reviewed' || this.userrole === 'Validator';
  }
  isApproved(): boolean {
    return this.status === 'Approved';
  }
  updateTabsData() {

    if (this.selectedRowId !== null && this.allData) {
      this.itemToUpdate = this.allData.map(item => {
        if (item.id === this.selectedRowId) {
          this.updatedComments = this.Usercomment;

          // Update comments based on checkRecord
          if (this.selectedValue === 'OK' || this.selectedValue === 'NA') {
            this.updatedComments = ''; // Update comments to empty string for 'OK'
          } else if (this.selectedValue === 'NG' || this.selectedValue === 'AbnormalCanUse') {
            this.updatedComments = this.Usercomment; // Update comments to Usercomment value for 'NG' and 'AbnormalCanUse'
          }

          return { ...item, comments: this.updatedComments, checkRecord: this.selectedValue };
        }
        return item;
      });
      this.allData = this.itemToUpdate;
      this.okData = this.itemToUpdate.filter(data => data.checkRecord === 'OK');
      this.ngData = this.itemToUpdate.filter(data => data.checkRecord === 'NG');
      this.abnormalcuData = this.itemToUpdate.filter(data => data.checkRecord === 'AbnormalCanUse');
      this.naData = this.itemToUpdate.filter(data => data.checkRecord === 'NA');
    }

  }

  bulkUpdateTabsData(cRecord: any) {

    const selectedRecord = cRecord;
    this.itemToUpdate = this.allData.map(item => {
      this.updatedComments = '';
      return { ...item, checkRecord: selectedRecord, comments: this.updatedComments, };
    });
    this.allData = this.itemToUpdate
    this.okData = this.itemToUpdate.filter(data => data.checkRecord === 'OK');
    this.ngData = this.itemToUpdate.filter(data => data.checkRecord === 'NG');
    this.abnormalcuData = this.itemToUpdate.filter(data => data.checkRecord === 'AbnormalCanUse');
    this.naData = this.itemToUpdate.filter(data => data.checkRecord === 'NA');

  }
  getImageFromCacheOrApi(fileName: string, uniqueFileName: string): string {
    const cacheKey = this.getCacheKey(fileName, uniqueFileName);
    const cachedImage = this.imageCacheservice.getImageFromCache(cacheKey);
    if (cachedImage) {
      return cachedImage;
    } else {
      const imagePath = this.apiService.GetImagePath(fileName, uniqueFileName);
      this.imageCacheservice.cacheImage(cacheKey, imagePath);
      return imagePath;
    }
  }

  getCacheKey(fileName: string, uniqueFileName: string): string {
    return `${fileName}_${uniqueFileName}`;
  }

  clearCache() {
    this.imageCacheservice.clearCache();
  }
}


