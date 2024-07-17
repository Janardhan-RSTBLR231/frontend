import { Component, Input, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { NbDialogRef, NbToastrService } from '@nebular/theme';
import { ApiService } from '../../../services/api.service';
import { ApproverandReviewer, Approver, Reviewer } from '../../../@core/interfaces/CheckSheetVersion'
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';


@Component({
  selector: 'ngx-approver-and-reviewer-selection',
  templateUrl: './approver-and-reviewer-selection.component.html',
  styleUrls: ['./approver-and-reviewer-selection.component.scss']
})
export class ApproverAndReviewerSelectionComponent implements OnInit {
  @Input() title: string;
  @Input() Id: any;
  apiService = inject(ApiService);
  ardata: ApproverandReviewer[] = [];
  approver: Approver[] = [];
  reviewer: Reviewer[] = [];
  reviewerChecked: boolean[] = [];
  approverChecked: boolean[] = [];
  uniqueid: string;
  requestData: object = {};
  checked: boolean = false;
  isSubmitted: boolean = false;
  filterLine: string[] = [];
  filterStation: string[] = [];
  selectedLine: any;
  selectedStation: any;

  form: FormGroup;
  uniqueidControl: FormControl = new FormControl('', Validators.required);
  isDropDownChanged: boolean;


  constructor(protected ref: NbDialogRef<ApproverAndReviewerSelectionComponent>,
    private changeDetectorRef: ChangeDetectorRef,
    private fb: FormBuilder,
    private toasterService: NbToastrService) {
    this.form = this.fb.group({
      line: ['', Validators.required],
      station: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.apiService.getApproverReviewers().subscribe((response: any) => {
      this.ardata = response.payload;
      this.approver = response.payload.approvers;
      this.approverChecked = new Array(this.approver.length).fill(false);
      this.reviewer = response.payload.reviewers;
      this.reviewerChecked = new Array(this.reviewer.length).fill(false);
      this.uniqueid = response.payload.uniqueId;
      this.changeDetectorRef.detectChanges();
    });
    this.getDropdownDetails();

  }

  submit() {
    const checkedApprovers = this.approver.filter((approver, index) => this.approverChecked[index]);
    const checkedReviewers = this.reviewer.filter((reviewer, index) => this.reviewerChecked[index]);

    // Check if the title is not "Create Check Sheet Revision" and validate UniqueId, Line, Station, Approvers, and Reviewers
    if (
      (this.title !== 'Create Check Sheet Revision' && this.title !== 'Edit WorkFlow' &&
        (this.uniqueidControl.value.trim() === '' ||
          this.reviewersCheckedInvalid ||
          this.approversCheckedInvalid ||
          !this.selectedLine ||
          !this.selectedStation))
    ) {
      if (this.title !== 'Create Check Sheet Revision' && this.title !== 'Edit WorkFlow' && this.uniqueidControl.value.trim() === '') {
        this.toasterService.warning('UniqueId is required.', 'Error');
      } else if (this.reviewersCheckedInvalid) {
        this.toasterService.warning('Please select at least one reviewer.', 'Error');
      } else if (this.approversCheckedInvalid) {
        this.toasterService.warning('Please select at least one approver.', 'Error');
      } else if (!this.selectedLine || !this.selectedStation) {
        this.toasterService.warning('Please select Line and Station.', 'Error');
      }
      return;
    }
    if (this.title == "Create Check Sheet Revision") {
      if (checkedApprovers.length === 0) {
        this.toasterService.warning('Please select at least one approver.', 'Error');
        return;
      }
      if (checkedReviewers.length === 0) {
        this.toasterService.warning('Please select at least one reviewer.', 'Error');
        return;
      }
    }
    // Proceed with data submission based on the title
    if (this.title == "Add New Check Sheet") {
      this.requestData = {
        reviewers: checkedReviewers,
        approvers: checkedApprovers,
        uniqueId: this.uniqueid,
        lineId: this.selectedLine,
        stationId: this.selectedStation
      };
      this.ref.close({ requestData: this.requestData });
    } else if (this.title == "Replicate Check Sheet") {
      this.requestData = {
        reviewers: checkedReviewers,
        approvers: checkedApprovers,
        uniqueId: this.uniqueid,
        id: this.Id,
        lineId: this.selectedLine,
        stationId: this.selectedStation
      };
      this.ref.close({ requestData: this.requestData });
    } else if (this.title == "Create Check Sheet Revision") {
      this.requestData = {
        reviewers: checkedReviewers,
        approvers: checkedApprovers,
        id: this.Id
      };
      this.ref.close({ requestData: this.requestData });
    }
    else if (this.title == "Edit WorkFlow") {
      this.requestData = {
        reviewers: checkedReviewers,
        approvers: checkedApprovers,
        id: this.Id
      };
      this.ref.close({ requestData: this.requestData });
    }
  }

  cancel() {
    this.ref.close();
    this.changeDetectorRef.detectChanges();

  }
  onListOrderChange(event: CdkDragDrop<any[]>) {
    moveItemInArray(this.approver, event.previousIndex, event.currentIndex);
    moveItemInArray(this.approverChecked, event.previousIndex, event.currentIndex);
    this.updateSeqOrder(this.approver);

  }
  onListOrderChange1(event: CdkDragDrop<any[]>) {
    moveItemInArray(this.reviewer, event.previousIndex, event.currentIndex);
    moveItemInArray(this.reviewerChecked, event.previousIndex, event.currentIndex);
    this.updateSeqOrder(this.reviewer);
  }

  private updateSeqOrder(items: any[]): void {
    for (let i = 0; i < items.length; i++) {
      items[i].seqOrder = i + 1; // Update seqorder based on the new index
    }
  }
  get reviewersCheckedInvalid() {
    return this.reviewerChecked.every((checked) => !checked);
  }

  get approversCheckedInvalid() {
    return this.approverChecked.every((checked) => !checked);
  }
  getDropdownDetails() {
    this.apiService.getconfig().subscribe((response) => {
      if (response.payload && Array.isArray(response.payload)) {
        this.filterLine = response.payload.filter(item => item.name == 'Line')
        this.filterStation = response.payload.filter(item => item.name == 'Station')
      }
    })
  }
  changeline(event: any) {
    this.selectedLine = event;
  }

  changestation(event: any) {
    this.selectedStation = event;
  }
}
