import { Component, EventEmitter, Input, OnInit, Output, ChangeDetectorRef } from '@angular/core';
import { SharedServiceService } from '../../../services/shared-service.service'
import { NbDialogService } from '@nebular/theme';
import { CommentDialogComponent } from '../comment-dialog/comment-dialog.component';
import { ApiService } from '../../../services/api.service'
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { NbToastrService } from '@nebular/theme';
import { OperationResponse } from '../../../@core/interfaces/OperationResponse';
import { BadgeCountService } from '../badgeCount.service';

@Component({
  selector: 'ngx-check-record-custom-render',
  templateUrl: './check-record-custom-render.component.html',
  styleUrls: ['./check-record-custom-render.component.scss']
})
export class CheckRecordCustomRenderComponent implements OnInit {

  @Input() value: any;
  @Input() status: string
  @Input() rowData: any;
  @Input() renderComponentData: any; // Data passed to the render component
  @Input() checksheetId: any;
  @Output() BadgeCountUpdated = new EventEmitter<number>();

  @Output() valueChange = new EventEmitter<string>();
  @Output() commentAdded = new EventEmitter<string>();  // Output to notify the parent component of changes
  selectedValue: any;
  usercomments: any
  comments: any;
  Status: any;
  checkPointId: any
  previousValue: any;
  options = [
    { value: 'OK', label: 'OK' },
    { value: 'NG', label: 'NG' },
    { value: 'AbnormalCanUse', label: 'Abnormal (can use)' },
    { value: 'NA', label: 'NA' }

  ];
  loading: boolean;

  constructor(private dialogService: NbDialogService,
    private cdr: ChangeDetectorRef,
    private toasterService: NbToastrService,
    private apiService: ApiService,
    private router: Router,
    private badgeCountService: BadgeCountService,
    private spinnerService: NgxSpinnerService) {

  }
  ngOnInit() {
    this.selectedValue = this.value;
    this.previousValue = this.selectedValue;
    this.usercomments = this.rowData.comments;
    this.checkPointId = this.rowData.id;
    this.checksheetId;
  }

  onChange(value: any) {
    this.selectedValue = value;
    this.valueChange.emit(value);
    if (this.selectedValue === 'NG' || this.selectedValue === 'AbnormalCanUse') {
      this.dialogService.open(CommentDialogComponent, {
        closeOnBackdropClick: false,
        closeOnEsc: false,
      })
        .onClose.subscribe(result => {
          if (result.comment) {
            this.usercomments = result.comment; //Update usercomments with the new comment
            this.commentAdded.emit(this.usercomments);
            const updateCheckRecord = {
              checkSheetId: this.checksheetId,
              checkPointId: this.checkPointId,
              checkRecord: value,
              comments: this.usercomments,
              userAction: 'Save',//UpdateCheckRecord
            }
            this.updaterecordapi(updateCheckRecord);
            this.cdr.detectChanges();
          }
          else if (result.comment === "") {
            this.selectedValue = this.previousValue
            this.cdr.detectChanges();
          }
        });
    } else {
      this.usercomments = "";
      const updateCheckRecord = {
        checkSheetId: this.checksheetId,
        checkPointId: this.checkPointId,
        checkRecord: value,
        comments: this.usercomments,
        userAction: 'Save',//UpdateCheckRecord
      }
      this.updaterecordapi(updateCheckRecord);
      this.cdr.detectChanges();
    }
  }

  updaterecordapi(data: any) {
    this.apiService.UpdateCheckRecord(data).subscribe((response: OperationResponse) => {
      if (response.isSuccess) {
        this.badgeCountService.updateBadgeCount(response.payload);
        this.toasterService.success(response.messages, 'Updated');
      } else {
        this.toasterService.danger(response.messages, 'Error');
      }
    },
      errors => {
        this.toasterService.danger(errors, 'Error');
      },
    );
  }

  isFormLocked(): boolean {
    return this.status === 'Approved' || this.status === 'Submitted' || this.status === 'Reviewed';
  }
}