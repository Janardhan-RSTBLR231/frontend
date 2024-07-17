import { Component, OnDestroy, OnInit, ViewChild, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { JwtService } from '../../@core/services/jwt.service'
import { NgForm } from '@angular/forms';
import { User } from '../../@core/interfaces/User'
import { ApiService } from '../../services/api.service';
import { OperationResponse } from '../../@core/interfaces/OperationResponse';
import { ChangePasswordDialogComponent } from '../../pages/user-management/change-password-dialog/change-password-dialog.component'
import { NgxSpinnerService } from 'ngx-spinner';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';
import { takeUntil } from 'rxjs/operators';
import { NbDialogService, NbToastrService } from '@nebular/theme';
@Component({
  selector: 'ngx-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  isSubmitted: boolean = false;
  user: User = this.getEmptyUser();
  title: string = 'Profile';
  selectedUserId: string;
  apiService = inject(ApiService);
  newPassword: any = "";
  confirmPassword: any = "";
  passwordRequired: boolean = false;
  passwordMatchError: boolean = false;
  hidePassword: boolean = true;
  userid:any
  @ViewChild('form', { static: false }) myform: NgForm;
  constructor(private router: Router,
    private route: ActivatedRoute,
    private toasterService: NbToastrService,
    private fb: FormBuilder,
    private dialogService: NbDialogService,
    private jwtService: JwtService,
    private spinnerService: NgxSpinnerService) { }

  ngOnInit(): void {
    this.user.id = this.jwtService.getId();
    this.user.fullName = this.jwtService.getName();
    this.user.department = this.jwtService.getDepartment();
    this.user.role = this.jwtService.getRole();
    this.user.email = this.jwtService.getEmail();
    this.user.plant = this.jwtService.getPlant();
  }
  private getEmptyUser(): User {
    return {
      id: undefined,
      phoneNumber: '',
      fullName: '',
      email: '',
      role: '',
      department: '',
      plant: '',
    };
  }

  back() {
    if (this.user.role === 'SuperAdmin') {
      this.router.navigate(['/pages/user-management']);
    }
    else if (this.user.role === 'Creator' || this.user.role === 'Reviewer' || this.user.role === 'Approver') {
      this.router.navigate(['/pages/manage-check-sheets']);
    }
    else if (this.user.role === 'Operator' || this.user.role === 'Validator') {
      this.router.navigate(['/pages/fill-check-sheet']);
    }
  }
  changePassword() {
    this.dialogService.open(ChangePasswordDialogComponent
      , {
        context: {
          title: "Change Password",
        },
        closeOnBackdropClick: false,
        closeOnEsc: false,
      })
      .onClose.subscribe((response) => {
        if (response && response.passwordObject) {
          this.newPassword = response.passwordObject.Newpassword;
          this.confirmPassword = response.passwordObject.Confirmedpassword;
          this.spinnerService.show();
          this.apiService.updatePassword(this.user.id, this.newPassword, this.confirmPassword).subscribe((response: OperationResponse) => {
            this.spinnerService.hide();
            if (response.isSuccess) {
              this.toasterService.success(response.messages, 'Updated');
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
      })
  }
}
