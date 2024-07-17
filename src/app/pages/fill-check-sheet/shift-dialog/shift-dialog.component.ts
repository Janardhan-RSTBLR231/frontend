import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NbDialogRef } from '@nebular/theme';

@Component({
  selector: 'ngx-shift-dialog',
  templateUrl: './shift-dialog.component.html',
  styleUrls: ['./shift-dialog.component.scss']
})
export class ShiftDialogComponent implements OnInit {
  shiftForm: FormGroup;
  shift: string;
  constructor(protected dialogRef: NbDialogRef<ShiftDialogComponent>,
    private formBuilder: FormBuilder) {
    this.shiftForm = this.formBuilder.group({
      shift: ['', Validators.required]
    });
  }

  ngOnInit(): void {
  }
  get shiftControl() {
    return this.shiftForm.get('shift');
  }
  submitShift() {
    if (this.shiftForm.valid) {
      this.shift = this.shiftForm.value.shift
      this.dialogRef.close({ shift: this.shift });
    } else {
      this.shiftControl.markAllAsTouched();
    }
  }
  cancel(): void {
    this.dialogRef.close();
  }
}
