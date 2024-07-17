import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NbToastrService, NbDialogService } from '@nebular/theme';
import { NgForm } from '@angular/forms';
import { UserDTO } from '../../../@core/interfaces/User'
import { ApiService } from '../../../services/api.service';
import { OperationResponse } from '../../../@core/interfaces/OperationResponse';
import { ChangePasswordDialogComponent } from '../change-password-dialog/change-password-dialog.component'
import { NgxSpinnerService } from 'ngx-spinner';
import { ConfirmationdialogComponent } from '../../confirmationdialog/confirmationdialog.component';

@Component({
  selector: 'ngx-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit {
  loading = false;
  isSubmitted: boolean = false;
  user: UserDTO = this.getEmptyUser();
  title: string;
  selectedUserId: string;
  apiService = inject(ApiService);
  filterPlant: any[] = [];
  filterDepartment: any[] = [];
  filterLine: any[] = [];
  filterZone: any[] = [];
  filterStation: any[] = [];
  filterEquipment: any[] = [];
  isEdit: Boolean = false;
  isDropDownChanged: boolean;
  selectedPlantValue: string;
  userRole: any=["Approver","Creator","Operator","Reviewer","SuperAdmin","Validator"];
  newPassword: any = "";
  confirmPassword: any = "";
  passwordRequired: boolean = false;
  passwordMatchError: boolean = false;
  hidePassword: boolean = true;
  @ViewChild('form', { static: false }) myform: NgForm;
  selectedPlant: any;
  isUpdateOperation: boolean = false;

  constructor(private router: Router,
    private route: ActivatedRoute,
    private toasterService: NbToastrService,
    private dialogService: NbDialogService,
    private spinnerService: NgxSpinnerService) { }

  ngOnInit(): void {
    this.selectedUserId = this.route.snapshot.paramMap.get('id');
    this.getDropdownDetails();
    if (this.selectedUserId) {
      this.getUser();

      this.title = 'Update User';
      this.isEdit = true;
      this.isUpdateOperation = true;
    } else {
      this.isEdit = false;
      this.title = 'Add User'
      this.isUpdateOperation = false;
    }

  }
  private getEmptyUser(): UserDTO {
    return {
      id: undefined,
      password: '',
      phoneNumber: '',
      fullName: '',
      email: '',
      role: '',
      loginId: '',
      plantId: '',
      departmentId: '',
      lineIds: [],
      canDelete: true,
      isActive:false
    };
  }

  addNewUser() {
    this.router.navigate(['/pages/user-management'])
  }
  back() {
    this.router.navigate(['/pages/user-management']);
  }
  getUser() {
    this.spinnerService.show();
    this.apiService.getUserByid(this.selectedUserId).subscribe((response: OperationResponse) => {
      this.spinnerService.hide();
      if (response.isSuccess) { 
      this.user = response.payload
      } else {
        this.toasterService.danger(response.messages, 'Error');
      }
    },
      errors => {
        this.spinnerService.hide();
        this.toasterService.danger(errors, 'Error');
      
    })
  }

  getDropdownDetails() {
    
    this.apiService.getconfig().subscribe((response) => {
      if (response.payload && Array.isArray(response.payload)) {
        this.filterDepartment = response.payload.filter(item => item.name == 'Department')
        this.filterLine = response.payload.filter(item => item.name == 'Line')
        this.filterPlant = response.payload.filter(item => item.name == 'Plant')
      }
    })
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

  changePlant($event) {
    this.user.plantId = $event;
    this.isDropDownChanged = true;
  }
  changeLine($event) {
    this.user.lineIds = $event;
    this.isDropDownChanged = true;
  }
  changeDepartment($event) {
    this.user.departmentId = $event;
    this.isDropDownChanged = true;
  }
  changeRole($event) {
    this.user.role = $event;
    this.isDropDownChanged = true;
  }
  changeIsActive($event) {
    this.user.isActive = $event;
    this.isDropDownChanged = true;
  }
  update() {
    this.spinnerService.show();
    this.apiService.updateUser(this.user).subscribe((response: OperationResponse) => {
      this.spinnerService.hide();
      if (response.isSuccess) {
        this.toasterService.success(response.messages, 'Update');
        this.router.navigate(['/pages/user-management']);
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
  add() {
    this.spinnerService.show();
    this.user.password = this.user.loginId;
    this.apiService.createUser(this.user).subscribe((response: OperationResponse) => {
      this.spinnerService.hide();
      if (response.isSuccess) {
        this.toasterService.success(response.messages, 'Create');
        this.router.navigate(['/pages/user-management']);
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
  togglePasswordVisibility() {
    this.hidePassword = !this.hidePassword;
  }
  passwordsMatch(): boolean {
    return this.newPassword === this.confirmPassword;
  }
  checkPasswordMatch() {

    this.passwordMatchError = this.newPassword !== this.confirmPassword;
  }


  deleteUser() {
    this.dialogService.open(ConfirmationdialogComponent, {
      context: {
        title: "Are you sure you want to delete?",
      },
      closeOnBackdropClick: false,
      closeOnEsc: false,
    }).onClose.subscribe(data => {
      if (data === 'ok') {
        this.spinnerService.show();
        this.apiService.deleteUser(this.selectedUserId).subscribe((response: OperationResponse) => {
          this.spinnerService.hide();
          if (response.isSuccess) {
            this.toasterService.success(response.messages, 'Delete');
            this.router.navigate(['/pages/user-management']);
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
    }
  )   
  }

  changePassword() {
    this.dialogService.open(ChangePasswordDialogComponent
      , {
        context: {
          title: "Change Password",
          password: this.user.password,
        },
        closeOnBackdropClick: false,
        closeOnEsc: false,
      })
      .onClose.subscribe((response) => {
        if (response && response.passwordObject) {
          const userid = this.user.id;
          this.newPassword = response.passwordObject.Newpassword;
          this.confirmPassword = response.passwordObject.Confirmedpassword;
          this.spinnerService.show();
          this.apiService.updatePassword(userid, this.newPassword, this.confirmPassword).subscribe((response: OperationResponse) => {
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