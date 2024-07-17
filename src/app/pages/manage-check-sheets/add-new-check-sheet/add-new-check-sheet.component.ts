import { Component, OnInit, ChangeDetectionStrategy, inject, ViewChild, ChangeDetectorRef } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Subscription, Observable, Subject, of } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { LocalDataSource } from 'ng2-smart-table'
import { OperationResponse } from '../../../@core/interfaces/OperationResponse';
import { CheckpointRowrenderComponent } from '../checkpoint-rowrender.component'
import {
  NbToastrService, NbDialogService, NbDateService
} from '@nebular/theme';
import { NgxSpinnerService } from 'ngx-spinner';
import { ApiService } from '../../../services/api.service'
import {
  CheckSheetVersionDTO, Checkpoint, ApproverandReviewer, Approver
  , UserActions, Reviewer, ChecksheetData
} from '../../../@core/interfaces/CheckSheetVersion'
import { DatePipe, formatDate } from '@angular/common';
import { ApproverAndReviewerSelectionComponent } from '../approver-and-reviewer-selection/approver-and-reviewer-selection.component';
import { CommentsComponent } from '../commentsdialog/comments.component';
import { JwtService } from '../../../@core/services/jwt.service'
import { ConfirmationdialogComponent } from '../../confirmationdialog/confirmationdialog.component';
import { ImagesRendererComponent } from '../images-renderer/images-renderer.component';
import { ImageCacheService } from '../../../services/image-cache.service'
@Component({
  selector: 'ngx-add-new-check-sheet',
  templateUrl: './add-new-check-sheet.component.html',
  styleUrls: ['./add-new-check-sheet.component.scss']
})
export class AddNewCheckSheetComponent implements OnInit {
  public isSpinnerVisible: boolean = false;
  status: string;
  settings = {
    actions: false,
    hideSubHeader: true,
    columns: {
      seqOrder: {
        title: 'S.No.',
        type: 'number',
      },
      name: {
        title: 'Check Point',
        type: 'custom',
        renderComponent: CheckpointRowrenderComponent,

      },
      standard: {
        title: 'Standard',
        type: 'string',
      },
      condition: {
        title: 'Condition',
        type: 'string',
      },
      method: {
        title: 'Method',
        type: 'string',
      },
      completeInSeconds: {
        title: 'Complete in Sec',
        type: 'number',
      },
      frequencyText: {
        title: 'Frequency',
        type: 'html',
        valuePrepareFunction: (cell, row) => {
          return row.frequencyText ? row.frequencyText : row.frequencyType;
        },
      },
      image: {
        title: 'Image',
        type: 'custom',
        renderComponent: ImagesRendererComponent,
      }
    },
  };
  reviewerSettings = {
    actions: false,
    hideSubHeader: true,
    columns: {
      reviewerName: {
        title: 'Reviewer Name',
        type: 'string',
        valuePrepareFunction: (value: string) => {
          const words = value.split(' ');
          const capitalizedWords = words.map(word => word.charAt(0).toUpperCase() + word.slice(1));
          return capitalizedWords.join(' ');
        },
      },
      department: {
        title: 'Department',
        type: 'string',
      },
      isReviewed: {
        title: 'Is Reviewed',
        type: 'string',
        valuePrepareFunction: (type) => {
          return (type === true ? 'Yes' : 'No');
        },
      },
      reviewedOn: {
        title: 'Reviewed On',
        type: 'string',
        valuePrepareFunction: (value: string, row: any, cell: any) => {
          // Check if the row is reviewed
          if (row.isReviewed === true) {
            const datePipe = new DatePipe('en-US');
            return datePipe.transform(value, 'dd.MMM.yyyy HH:mm', 'UTC');
          } else {
            return '';
          }
        }
      },
    }
  };

  approverSettings = {
    actions: false,
    hideSubHeader: true,
    columns: {
      approverName: {
        title: 'Approver Name',
        type: 'string',
        valuePrepareFunction: (value: string) => {
          const words = value.split(' ');
          const capitalizedWords = words.map(word => word.charAt(0).toUpperCase() + word.slice(1));
          return capitalizedWords.join(' ');
        },
      },
      department: {
        title: 'Department',
        type: 'string',
      },
      isApproved: {
        title: 'Is Approved',
        type: 'string',
        valuePrepareFunction: (type) => {
          return (type === true ? 'Yes' : 'No');
        },
      },
      approvedOn: {
        title: 'Approved On',
        type: 'string',
        valuePrepareFunction: (value: string, row: any, cell: any) => {
          if (row.isApproved === true) {
            const datePipe = new DatePipe('en-US');
            return datePipe.transform(value, 'dd.MMM.yyyy HH:mm', 'UTC');
          } else {
            return '';
          }
        }
      },
    }
  };
  changeDetailsSettings = {
    actions: false,
    hideSubHeader: true,
    columns: {
      changeDetails: {
        title: 'Change Details'
      },
    }
  }

  source = LocalDataSource;

  userRole: string;
  selectedRows;
  isSubmitted: boolean = false;
  approver: Approver[] = [];
  reviewer: Reviewer[] = [];
  useractions: any;
  subscription: Subscription;
  checkpoints: Checkpoint[] = [];
  ardata: ApproverandReviewer[] = [];
  csdata: ChecksheetData = this.getEmptycheksheetdata();
  csversiondto: CheckSheetVersionDTO[] = [];
  loading = false;
  checksheet: any = [];
  selectedOption: string = '';
  selectedItem = '';
  title: string;
  isExpanded = false;
  apiService = inject(ApiService);
  filterDepartment: any[] = [];
  searchText: string = '';
  selectedDepartment: any;
  departments: any[] = [];

  filterLine: any[] = [];
  line: any[] = [];
  selectedLine: any;

  filterZone: any[] = [];
  zone: any[] = [];
  selectedZone: any;

  filterStation: any[] = [];
  station: any[] = [];
  selectedStation: any;

  filterEquipment: any[] = [];
  equipment: any[] = [];
  selectedEquipment: any;

  filterLocation: any[] = [];
  location: any[] = [];
  selectedLocation: any;

  filterSubLocation: any[] = [];
  subLocation: any[] = []
  selectedSubLocation: any;

  isEdit: Boolean = false;
  selectedCheckSheetName: string;
  selectedCheckSheetID: string;
  isDropDownChanged: boolean;
  changeDetails: string;
  showSmartTable: boolean = true;
  selectedCheckpointId: number;
  actionOnDate: any;
  formatedate: any;
  isReviewButtonVisible: boolean;
  showaddCheckPoint: boolean;
  showReject: boolean;
  showDelete: boolean;
  showApprove: boolean;
  showSubmitt: boolean;
  showReplicate: boolean;
  showCreateVersion: boolean;
  showReview: boolean;
  isReadonly: boolean;
  mindate: Date;
  maxdate: Date;
  @ViewChild('departmentAutoInput') departmentInput;
  @ViewChild('equipmentAutoInput') equipmentInput;
  @ViewChild('zoneAutoInput') zonetInput;
  @ViewChild('stationAutoInput') stationInput;
  @ViewChild('locationAutoInput') locationInput;
  @ViewChild('sublocationAutoInput') sublocationInput;

  form: FormGroup;
  DepartmentControl: FormControl = new FormControl('', Validators.required);
  ZoneControl: FormControl = new FormControl('', Validators.required);
  EquipmentControl: FormControl = new FormControl('', Validators.required);
  LocationControl: FormControl = new FormControl('', Validators.required);
  SubLocationControl: FormControl = new FormControl('', Validators.required);

  noimages: any = "../../../../assets/images/NoImage.jpg"
  @ViewChild('form', { static: false }) myform: NgForm;

  protected readonly unsubscribe$ = new Subject<void>();


  constructor(private router: Router, private dialogService: NbDialogService,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef,
    private toasterService: NbToastrService,
    private jwtservice: JwtService,
    private imageCacheservice: ImageCacheService,
    protected dateService: NbDateService<Date>,
    private spinnerService: NgxSpinnerService) {
    this.mindate = this.dateService.addDay(this.dateService.today(), 0);

  }

  public onUserRowSelect(event) {
    this.selectedRows = event.selected;
  }
  ngOnInit() {
    this.selectedCheckSheetID = this.route.snapshot.paramMap.get('id');
    if (this.selectedCheckSheetID) {
      this.getcheksheetbyid(this.selectedCheckSheetID);
      this.getDropdownDetails();
      this.title = 'Update Check Sheet';
      this.isEdit = true;
    } else {
      this.isEdit = false;
      this.title = 'Add Checksheet';
    }
    this.userRole = this.jwtservice.getRole();
  }

  private getEmptycheksheetdata(): ChecksheetData {
    return {
      id: undefined,
      createdOn: undefined,
      createdBy: '',
      modifiedOn: undefined,
      modifiedBy: '',
      isActive: true,
      name: '',
      lineId: '',
      departmentId: '',
      uniqueId: '',
      equipmentId: '',
      maintenaceClassId: '',
      stationId: '',
      locationId: '',
      subLocationId: '',
      version: 0,
      revision: '',
      changeDetails: '',
      userAction: "Save",
      activateOn: new Date()
    };
  }
  changeline($event) {
    if ($event && $event.id && $event.description) {
      this.csdata.lineId = $event.id;
      this.selectedLine = $event.description;
      this.isDropDownChanged = true;
    }
  }
  displayLine(line: any): string {
    if (typeof line === 'string') {
      return line;
    } else {
      return line ? line.description : '';
    }
  }
  changedepartment($event) {
    if ($event && $event.id && $event.description) {
      this.csdata.departmentId = $event.id;
      this.selectedDepartment = $event.description;
      this.isDropDownChanged = true;
    }
  }
  displayDepartment(department: any): string {
    if (typeof department === 'string') {
      return department;
    } else {
      return department ? department.description : '';
    }
  }
  changeequipment($event) {
    if ($event && $event.id && $event.description) {
      this.csdata.equipmentId = $event.id;
      this.selectedEquipment = $event.description;
      this.isDropDownChanged = true;
    }
  }
  displayEquipment(item: any): string {
    if (typeof item === 'string') {
      return item;
    } else {
      return item ? item.description : '';
    }
  }
  changezone($event) {
    if ($event && $event.id && $event.description) {
      this.csdata.maintenaceClassId = $event.id;
      this.selectedZone = $event.description;
      this.isDropDownChanged = true;
    }
  }
  displayZone(item: any): string {
    if (typeof item === 'string') {
      return item;
    } else {
      return item ? item.description : '';
    }
  }
  changestation($event) {
    if ($event && $event.id && $event.description) {
      this.csdata.stationId = $event.id;
      this.selectedStation = $event.description;
      this.isDropDownChanged = true;
    }
  }
  displayStation(item: any): string {
    if (typeof item === 'string') {
      return item;
    } else {
      return item ? item.description : '';
    }
  }
  changelocation($event) {
    if ($event && $event.id && $event.description) {
      this.csdata.locationId = $event.id;
      this.selectedLocation = $event.description;
      this.isDropDownChanged = true;
    }
  }
  displayLocation(item: any): string {
    if (typeof item === 'string') {
      return item;
    } else {
      return item ? item.description : '';
    }
  }
  changesublocation($event) {
    if ($event && $event.id && $event.description) {
      this.csdata.subLocationId = $event.id;
      this.selectedSubLocation = $event.description;
      this.isDropDownChanged = true;
    }
  }
  displaySubLocation(item: any): string {
    if (typeof item === 'string') {
      return item;
    } else {
      return item ? item.description : '';
    }
  }
  back() {
    this.router.navigate(['/pages/manage-check-sheets'])
  }
  addNewCheckPoint() {
    this.router.navigate(['/pages/manage-check-sheets/add-new-check-sheet/', this.selectedCheckSheetID, 'add-new-check-point'])
  }
  getDropdownDetails() {
    this.spinnerService.show();
    this.apiService.getconfig().subscribe((response) => {
      this.spinnerService.hide();
      if (response.payload && Array.isArray(response.payload)) {
        this.filterDepartment = response.payload.filter(item => item.name == 'Department')
        this.departments = response.payload.filter(item => item.name == 'Department')

        this.filterLine = response.payload.filter(item => item.name == 'Line')
        this.line = response.payload.filter(item => item.name == 'Line')

        this.filterZone = response.payload.filter(item => item.name == 'Zone')
        this.zone = response.payload.filter(item => item.name == 'Zone')

        this.filterStation = response.payload.filter(item => item.name == 'Station')
        this.station = response.payload.filter(item => item.name == 'Station')

        this.filterEquipment = response.payload.filter(item => item.name == 'Equipment')
        this.equipment = response.payload.filter(item => item.name == 'Equipment')

        this.filterLocation = response.payload.filter(item => item.name == 'Location')
        this.location = response.payload.filter(item => item.name == 'Location')

        this.filterSubLocation = response.payload.filter(item => item.name == 'SubLocation')
        this.subLocation = response.payload.filter(item => item.name == 'SubLocation')

      }
    })
  }
  onDepartmentChange() {
    this.filterDepartment = this.departments.filter(department =>
      department.description.toLowerCase().includes(this.departmentInput.nativeElement.value.toLowerCase())
    );
  }

  onZoneChange() {
    this.filterZone = this.zone.filter(zone =>
      zone.description.toLowerCase().includes(this.zonetInput.nativeElement.value.toLowerCase())
    );
  }
  onEquipmentChange() {
    this.filterEquipment = this.equipment.filter(equipment =>
      equipment.description.toLowerCase().includes(this.equipmentInput.nativeElement.value.toLowerCase())
    );
  }
  onStationChange() {
    this.filterStation = this.station.filter(Station =>
      Station.description.toLowerCase().includes(this.stationInput.nativeElement.value.toLowerCase())
    );
  }
  onLocationChange() {
    this.filterLocation = this.location.filter(location =>
      location.description.toLowerCase().includes(this.locationInput.nativeElement.value.toLowerCase())
    );
  }
  onSubLoactionChange() {
    this.filterSubLocation = this.subLocation.filter(sublocation =>
      sublocation.description.toLowerCase().includes(this.sublocationInput.nativeElement.value.toLowerCase())
    );
  }

  save(form: NgForm) {
    this.isSubmitted = true;

    if (!form.valid) {
      this.toasterService.warning('Please complete the form', 'Error');
      return;
    }  

    if (this.departmentInput.nativeElement.value){
      let correctDepartment = this.departments.filter(department =>
        department.description.toLowerCase().includes(this.departmentInput.nativeElement.value.toLowerCase())
    );
      if (correctDepartment.length ==0)
        {
          this.toasterService.warning('Please select correct department', 'Error');
          return;
        }
    }
    if (this.equipmentInput.nativeElement.value) {
      let correctEquipment = this.equipment.filter(equipment =>
        equipment.description.toLowerCase().includes(this.equipmentInput.nativeElement.value.toLowerCase())
      );
      if (correctEquipment.length == 0) {
        this.toasterService.warning('Please select correct Equipment', 'Error');
        return;
      }
    }
    if (this.zonetInput.nativeElement.value) {
      let correctZone = this.zone.filter(zone =>
        zone.description.toLowerCase().includes(this.zonetInput.nativeElement.value.toLowerCase())
      );
      if (correctZone.length == 0) {
        this.toasterService.warning('Please select correct Maintenance Class', 'Error');
        return;
      }
    }
    if (this.locationInput.nativeElement.value) {
      let correctLocation = this.location.filter(location =>
        location.description.toLowerCase().includes(this.locationInput.nativeElement.value.toLowerCase())
      );
      if (correctLocation.length == 0) {
        this.toasterService.warning('Please select correct Location', 'Error');
        return;
      }
    }
    if (this.sublocationInput.nativeElement.value) {
      let correctSubloaction = this.subLocation.filter(sublocation =>
        sublocation.description.toLowerCase().includes(this.sublocationInput.nativeElement.value.toLowerCase())
      );
      if (correctSubloaction.length == 0) {
        this.toasterService.warning('Please select correct Sub Location', 'Error');
        return;
      }
    }
    
    if (!form.dirty && !this.isDropDownChanged

    ) {
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
  add() {
  }
  update() {
    const formattedDateString = new DatePipe('en-US').transform(this.csdata.activateOn, 'yyyy-MM-dd');
    this.csdata.activateOn = new Date(formattedDateString);
    this.spinnerService.show();
    this.apiService.updateCheckSheet(this.selectedCheckSheetID, this.csdata).subscribe((response: OperationResponse) => {
      this.spinnerService.hide();
      if (response.isSuccess) {
        this.toasterService.success(response.messages, 'Update');
        this.router.navigate(['/pages/manage-check-sheets/add-new-check-sheet/', this.selectedCheckSheetID]);

      } else {
        this.spinnerService.hide();
        this.toasterService.danger(response.messages, 'Error');
      }
    },
      errors => {
        this.spinnerService.hide();
        this.toasterService.danger(errors, 'Error');
      }
    );

  }
  submitt() {
    this.dialogService.open(CommentsComponent
      , {
        context: {
          title: "Enter Change Details",
        },
        closeOnBackdropClick: false,
        closeOnEsc: false,
      })
      .onClose.subscribe(result => {
        const ChangeDetails = result.comments;
        this.spinnerService.show();
        this.apiService.submittCheckSheet(this.selectedCheckSheetID, ChangeDetails).subscribe((response: OperationResponse) => {
          this.spinnerService.hide();
          if (response.isSuccess) {
            this.toasterService.success(response.messages, 'Submitted');
            this.router.navigate(['/pages/manage-check-sheets']);

          } else {
            this.spinnerService.hide();
            this.toasterService.danger(response.messages, 'Error');
          }
        },
          errors => {
            this.spinnerService.hide();
            this.toasterService.danger(errors, 'Error');
          }
        );
      });

  }
  review() {
    const reviewerID = this.jwtservice.getId();
    this.spinnerService.show();
    this.apiService.reviewCheckSheet(this.selectedCheckSheetID, reviewerID).subscribe((response: OperationResponse) => {
      this.spinnerService.hide();
      if (response.isSuccess) {
        this.toasterService.success(response.messages, 'Reviewed');
        this.router.navigate(['/pages/manage-check-sheets']);
      } else {
        this.spinnerService.hide();
        this.toasterService.danger(response.messages, 'Error');
      }
    },
      errors => {
        this.spinnerService.hide();
        this.toasterService.danger(errors, 'Error');
      }
    );
  }
  approve() {
    const approverID = this.jwtservice.getId();
    this.spinnerService.show();
    this.apiService.approveCheckSheetVersion(this.selectedCheckSheetID, approverID).subscribe((response: OperationResponse) => {
      this.spinnerService.hide();
      if (response.isSuccess) {
        this.toasterService.success(response.messages, 'Approved');
        this.router.navigate(['/pages/manage-check-sheets']);
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
  replicate() {

    this.dialogService.open(ApproverAndReviewerSelectionComponent
      , {
        context: {
          title: "Replicate Check Sheet",
          Id: this.selectedCheckSheetID
        },
        closeOnBackdropClick: false,
        closeOnEsc: false,
      })
      .onClose.subscribe(result => {
        if (result && result.requestData) {
          const replicatedata = result.requestData;
          this.spinnerService.show();
          this.apiService.replicateCheckSheet(replicatedata).subscribe((response: OperationResponse) => {
            this.spinnerService.hide();
            if (response.isSuccess) {
              this.toasterService.success(response.messages, 'Replicated');
              this.selectedCheckSheetID = response.payload.id;

              this.router.navigate(['/pages/manage-check-sheets/add-new-check-sheet/', this.selectedCheckSheetID]);
              this.getcheksheetbyid(this.selectedCheckSheetID);
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
      });
  }
  createversion() {
    this.dialogService.open(ApproverAndReviewerSelectionComponent
      , {
        context: {
          title: "Create Check Sheet Revision",
          Id: this.selectedCheckSheetID
        },
        closeOnBackdropClick: false,
        closeOnEsc: false,
      })
      .onClose.subscribe(result => {
        if (result && result.requestData) {
          const createversiondata = result.requestData;
          this.spinnerService.show();
          this.apiService.createCheckSheetVersion(createversiondata).subscribe((response: OperationResponse) => {
            this.spinnerService.hide();
            if (response.isSuccess) {
              this.toasterService.success(response.messages, 'Created');
              this.selectedCheckSheetID = response.payload.id;
              this.router.navigate(['/pages/manage-check-sheets/add-new-check-sheet/', this.selectedCheckSheetID]);
              this.getcheksheetbyid(this.selectedCheckSheetID);
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
  isFormLocked(): boolean {
    return this.status === 'Approved' || this.status === 'Submitted' || this.status === 'Reviewed'
      || this.status === 'Partially Reviewed' || this.status === 'Partially Approved' || this.userRole === 'Reviewer';
  }
  isApproved(): boolean {
    return this.status === 'Approved';
  }
  getcheksheetbyid(id: string) {
    this.spinnerService.show()
    this.apiService.getChecksheetById(id).subscribe((response: OperationResponse) => {
      this.spinnerService.hide()
      this.csdata = response.payload;
      this.status = response.payload.status;
      this.useractions = response.payload.userActions;
      this.csdata.activateOn = new Date(response.payload.activateOn);
      if (!this.csdata.activateOn || this.isDefaultDateValue(this.csdata.activateOn)) {
        this.csdata.activateOn = new Date();
      }
      this.checkpoints = response.payload.checkPoints.map(
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
      this.selectedDepartment = response.payload.department
      this.selectedEquipment = response.payload.equipment
      this.selectedLine = response.payload.line;
      this.selectedStation = response.payload.station;
      this.selectedZone = response.payload.maintenaceClass;
      this.selectedLocation = response.payload.location;
      this.selectedSubLocation = response.payload.subLocation;
      this.changeDetails = response.payload.changeDetails
      this.approver = response.payload.approvers;
      this.reviewer = response.payload.reviewers;
      this.showaddCheckPoint = this.useractions.showAddCheckPoint;
      this.showSubmitt = this.useractions.showSubmit;
      this.showCreateVersion = this.useractions.showCreateNewVersion;
      this.showReplicate = this.useractions.showReplicateCheckSheet;
      this.isReadonly = this.useractions.isReadOnly;
      this.showReject = this.useractions.showReject;
      this.showApprove = this.useractions.showApprove;
      this.showReview = this.useractions.showReview;
      this.showDelete = this.useractions.showDelete;
    },
      errors => {
        this.spinnerService.hide()
        this.toasterService.danger(errors, 'Error');
      },
      () => {
        this.spinnerService.hide();
      }
    );
  }
  rejectchecksheet(IsReviewer: any, comments: any) {
    this.dialogService.open(CommentsComponent
      , {
        context: {
          title: "Please provide the reason for Rejection",
        },
        closeOnBackdropClick: false,
        closeOnEsc: false,
      })
      .onClose.subscribe(result => {
        const rejectComment = result.comments;
        this.spinnerService.show();
        this.apiService.reject(this.selectedCheckSheetID, rejectComment).subscribe((response: OperationResponse) => {
          this.spinnerService.hide();
          if (response.isSuccess) {
            this.toasterService.success(response.messages, 'Rejected');
            this.router.navigate(['/pages/manage-check-sheets']);

          } else {
            this.spinnerService.hide();
            this.toasterService.danger(response.messages, 'Error');
          }
        },
          errors => {
            this.spinnerService.hide();
            this.toasterService.danger(errors, 'Error');
          },
        );
      });
  }
  deleteCheckSheet() {
    this.dialogService.open(ConfirmationdialogComponent, {
      context: {
        title: "Are you sure you want to delete this Checksheet?",
      },
      closeOnBackdropClick: false,
      closeOnEsc: false,
    }).onClose.subscribe(data => {
      if (data === 'ok') {
        this.spinnerService.show();
        this.apiService.deleteCheckSheets(this.selectedCheckSheetID).subscribe((response: OperationResponse) => {
          this.spinnerService.hide();
          if (response.isSuccess) {
            this.toasterService.success(response.messages, 'Deleted');
            this.router.navigate(['/pages/manage-check-sheets']);
          } else {
            this.spinnerService.hide();
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
  editWorkFlow() {
    this.dialogService.open(ApproverAndReviewerSelectionComponent
      , {
        context: {
          title: "Edit WorkFlow",
          Id: this.selectedCheckSheetID
        },
        closeOnBackdropClick: false,
        closeOnEsc: false,
      })
      .onClose.subscribe(result => {
        if (result && result.requestData) {
          const createversiondata = result.requestData;
          this.spinnerService.show();
          this.apiService.updateWorkFlow(createversiondata).subscribe((response: OperationResponse) => {
            this.spinnerService.hide();
            if (response.isSuccess) {
              this.toasterService.success(response.messages, 'Updated');
              this.selectedCheckSheetID = response.payload.id;
              this.router.navigate(['/pages/manage-check-sheets/add-new-check-sheet/', this.selectedCheckSheetID]);
              this.getcheksheetbyid(this.selectedCheckSheetID);
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
  isDefaultDateValue(date: any): boolean {
    return date instanceof Date && date.getFullYear() === 1 && date.getMonth() === 0 && date.getDate() === 1;
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