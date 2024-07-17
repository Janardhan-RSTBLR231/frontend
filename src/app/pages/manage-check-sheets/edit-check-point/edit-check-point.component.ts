import { Component, ElementRef, OnInit, ViewChild, inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Checkpoint } from '../../../@core/interfaces/CheckSheetVersion'
import { NbToastrService, NbDialogService } from '@nebular/theme';
import { ApiService } from '../../../services/api.service';
import { NgForm } from '@angular/forms';
import { OperationResponse } from '../../../@core/interfaces/OperationResponse';
import { DomSanitizer } from '@angular/platform-browser';
import { JwtService } from '../../../@core/services/jwt.service'
import { NgxSpinnerService } from 'ngx-spinner';
import { CommonnImageDialogComponent } from '../../commonn-image-dialog/commonn-image-dialog.component'
import { ConfirmationdialogComponent } from '../../confirmationdialog/confirmationdialog.component';
import { ImageCacheService } from '../../../services/image-cache.service'

@Component({
  selector: 'ngx-edit-check-point',
  templateUrl: './edit-check-point.component.html',
  styleUrls: ['./edit-check-point.component.scss']
})
export class EditCheckPointComponent implements OnInit {
  @ViewChild('popupContainer') popupContainer!: ElementRef;
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
  loading = false;
  formData: any;
  selectedItem = 'visual';
  selectedCheckSheetID: string;
  selectedcheckpointID: string;
  selectedFile: File;
  status: string;
  useraction: any;
  isReadonly: boolean;
  apiService = inject(ApiService);
  @ViewChild('form', { static: false }) myform: NgForm;
  @ViewChild('fileInput') fileInput: ElementRef;
  checkpoints: Checkpoint = this.getEmptychekpoint();

  url: any;
  isEdit: Boolean = false;
  isSubmitted: boolean;
  isDropDownChanged: boolean;
  selectedFileName: string;
  userRole: any;
  showDelete: boolean;
  constructor(private router: Router, private route: ActivatedRoute,
    private toasterService: NbToastrService, private sanitizer: DomSanitizer,
    private jwtservice: JwtService,
    private spinnerService: NgxSpinnerService,
    private dialogService: NbDialogService,
    private imageCacheservice: ImageCacheService,) { }

  onSelectFile(event: any) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]);

      reader.onload = (event: any) => {
        this.url = event.target.result;
      }
    }
  }

  ngOnInit(): void {
    this.selectedCheckSheetID = this.route.snapshot.paramMap.get('checksheetid');
    this.selectedcheckpointID = this.route.snapshot.paramMap.get('id');
    if (this.selectedcheckpointID) {
      this.getcheksheet();
      this.isEdit = true;
    } else {
      this.isEdit = false;
    }
    this.userRole = this.jwtservice.getRole();

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
      frequencyType: '',
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


  getcheksheet() {
    this.spinnerService.show();
    this.apiService.getChecksheetById(this.selectedCheckSheetID).subscribe((response: OperationResponse) => {
      this.spinnerService.hide();
      if (response.isSuccess) {
        const cpdata = response.payload;
        this.status = response.payload.status;
        this.useraction = response.payload.userActions;
      
        this.isReadonly = this.useraction.isReadOnly;
        this.showDelete = this.useraction.showDelete;
      
        const payload = response.payload;
        if (payload && payload.checkPoints && payload.checkPoints.length > 0) {

          for (const checkpoint of payload.checkPoints) {

            if (checkpoint.id === this.selectedcheckpointID) {
              this.checkpoints = checkpoint;
              if (checkpoint.fileName != "" && checkpoint.uniqueFileName != "") {
                this.url = this.getImageFromCacheOrApi(checkpoint.fileName, checkpoint.uniqueFileName);
              }
              else {
                this.url = "../../../../assets/images/NoImage.jpg"

              }
              return;
            }
          }
        }
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



  save(form: NgForm) {
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
  changefreaquency($event) {
    this.checkpoints.frequencyType = $event;
    this.isDropDownChanged = true;
  }
  changeweekdays($event) {
    this.checkpoints.weekDays = $event;
    this.isDropDownChanged = true;
  }
  changemonthdays($event) {
    this.checkpoints.monthDays = $event;
    this.isDropDownChanged = true;
  }
  changeyearlymonths($event) {
    this.checkpoints.yearlyMonths = $event;
    this.isDropDownChanged = true;
  }
  changesyearlymonthsdays($event) {
    this.checkpoints.yearlyMonthDays = $event;
    this.isDropDownChanged = true;
  }
  add() {
    throw new Error('Method not implemented.');
  }
  update() {
    this.spinnerService.show();
    this.apiService.updateCheckPoint(this.selectedCheckSheetID, this.checkpoints).subscribe((response: OperationResponse) => {
      this.spinnerService.hide();
      if (response.isSuccess) {
        this.toasterService.success(response.messages, 'Update');
        this.router.navigate(['/pages/manage-check-sheets/add-new-check-sheet/', this.selectedCheckSheetID]);
      } else {
        this.toasterService.danger(response.messages, 'Error');
      }
    },
      errors => {
        this.spinnerService.hide();
        this.toasterService.danger('Please Enter Valid Value', 'Error');
      },
    
    );
  }
  uploadFile(): void {
    this.fileInput.nativeElement.click();
  }

  onFileSelected(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.formData = new FormData();
      this.formData.append('file', file);
      this.checkpoints.fileName = file.name;
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.url = e.target.result;
      };
      reader.readAsDataURL(file)
      this.spinnerService.show();
      this.apiService.uploadimage(this.selectedCheckSheetID, this.selectedcheckpointID, this.formData).
        subscribe((response: OperationResponse) => {
          this.spinnerService.hide();
          if (response.isSuccess) {
            this.checkpoints.fileName = response.payload.fileName;
            this.checkpoints.uniqueFileName = response.payload.uniqueFileName;
            this.toasterService.success(response.messages, 'Uploaded');
          }
          else {
            this.spinnerService.hide();
            this.toasterService.danger(response.messages, 'Error');
          }
        },
          errors => {
            this.toasterService.danger(errors, 'Error');
          },
          () => {
            this.spinnerService.hide();
          })
    }
  }
  isFormLocked(): boolean {
    return this.status === 'Approved' || this.status === 'Submitted' || this.status === 'Reviewed' ||
      this.status === 'Partially Reviewed' || this.status === 'Partially Approved';

  }
  togglePopup() {
    this.dialogService.open(CommonnImageDialogComponent, {
      context: {
        url:this.url
      },
      //closeOnBackdropClick: false,
    })
  }
  deleteCheckpoint()
  {
    this.dialogService.open(ConfirmationdialogComponent, {
      context: {
        title: "Are you sure you want to delete this CheckPoint?",
      },
      closeOnBackdropClick: false,
      closeOnEsc: false,
    }).onClose.subscribe(data => {
      if (data === 'ok') {
        this.spinnerService.show();
        this.apiService.deleteCheckpoints(this.selectedCheckSheetID, this.selectedcheckpointID).subscribe((response: OperationResponse) => {
          this.spinnerService.hide();
          if (response.isSuccess) {
            this.toasterService.success(response.messages, 'Deleted'); 
            this.router.navigate(['/pages/manage-check-sheets/add-new-check-sheet', this.selectedCheckSheetID])
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
  getImageFromCacheOrApi(fileName: string, uniqueFileName: string): string {
    const cacheKey = this.getCacheKey(fileName, uniqueFileName);
    const cachedImage = this.imageCacheservice.getImageFromCache(cacheKey);
    if (cachedImage) {
      return cachedImage;
    } else {
      const imagePath = this.apiService.downloadimage(fileName, uniqueFileName);
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
  changeFrequenctType($event) {
    this.checkpoints.frequencyType = $event;
    this.isDropDownChanged = true
  }
}
