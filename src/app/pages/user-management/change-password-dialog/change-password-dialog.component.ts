import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NbToastrService, NbDialogRef } from '@nebular/theme';

@Component({
  selector: 'ngx-change-password-dialog',
  templateUrl: './change-password-dialog.component.html',
  styleUrls: ['./change-password-dialog.component.scss']
})
export class ChangePasswordDialogComponent implements OnInit {
  @Input() title: string;
  @Input() password: string;
  newPassword: string = '';
  confirmPassword: string = '';
  passwordObject: any;
  passwordMatchError: boolean = false;
  isSubmitted: boolean = false;
  hidePassword= true;
  showPassword = true;
  passwordsMatch: boolean = false;
  @ViewChild('passwordForm', { static: false }) passwordForm!: NgForm;
 

  constructor(private dialogRef: NbDialogRef<ChangePasswordDialogComponent>,
    private toasterService: NbToastrService) { }

  ngOnInit(): void {
  }
  
  getInputType() {
    if (this.hidePassword) {
      return 'text';
    }
    return 'password';
  }
  togglePasswordVisibility() {
    this.hidePassword = !this.hidePassword;
  }

  checkPasswordMatch() {
    if (this.newPassword && this.confirmPassword) {
      this.passwordMatchError = this.newPassword !== this.confirmPassword;
      this.passwordsMatch = !this.passwordMatchError; // Set passwordsMatch based on match status
    } else {
      this.passwordMatchError = false;
      this.passwordsMatch = false;
    }
  }

  OK() {
    this.isSubmitted = true;
    if (!this.passwordForm.valid || this.passwordMatchError) {
      this.toasterService.warning('Please complete the form correctly', 'Error');
      this.isSubmitted = false;
      this.passwordsMatch = false;

      return;
    }
    this.passwordObject = {
      Newpassword: this.newPassword,
      Confirmedpassword: this.confirmPassword
    }
    this.dialogRef.close({passwordObject: this.passwordObject});
    this.isSubmitted = false;
    this.passwordMatchError = false;
    this.passwordsMatch = false;
    this.passwordForm.form.markAsPristine();
  }

  cancel() {
    this.dialogRef.close({ passwordObject: ''});
  }

}
