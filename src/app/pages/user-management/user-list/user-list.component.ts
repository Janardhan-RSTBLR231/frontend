import { Component, OnInit, Input, inject } from '@angular/core';
import { Subscription } from 'rxjs';
import { LocalDataSource } from 'ng2-smart-table';
import { Router } from '@angular/router';
import { UserRowrenderComponent } from '../user-rowrender.component';
import { ApiService } from '../../../services/api.service'
import { UserDTO } from '../../../@core/interfaces/User';
import { NgxSpinnerService } from 'ngx-spinner';
import { OperationResponse } from '../../../@core/interfaces/OperationResponse';
import { NbToastrService } from '@nebular/theme';

@Component({
  selector: 'ngx-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  filtersLoaded: Promise<boolean>;
  selectedRows;
  loading = false; 
  recordsCount: number;
  subscription: Subscription;
  isfirstrequest: boolean = true;
  apiService = inject(ApiService);
  _subscription: any;
  @Input() testList: any[];
  evaIcons = [];
  userRole: string;
  Users: UserDTO[];
  isAdminMenu: boolean = false;

  public onUserRowSelect(event) {
    this.selectedRows = event.selected;
  }

  settings = {
    actions: false,
    hideSubHeader: false,
    columns: {
      loginId: {
        title: 'LoginId',
        type: 'custom',
        renderComponent: UserRowrenderComponent,

      },
      fullName: {
        title: 'User Name',
        type: 'string',
      },
      email: {
        title: 'Email',
        type: 'string',
      },
      plant: {
        title: 'Plant',
        type: 'string',
      },
      department: {
        title: 'Department',
        type: 'string',
      },
      lines: {
        title: 'Line',
        type: 'string',
      },
      role: {
        title: 'Role',
        type: 'string',
      },
    },
  };

  data: LocalDataSource;

  constructor(private router: Router,
    private spinnerService: NgxSpinnerService,
    private toasterService: NbToastrService
  ) { }

  ngOnInit(): void {
    this.getUsers();
  }
  getUsers() {
    this.spinnerService.show();
    this.apiService.getusers().subscribe((response: OperationResponse) => {
      this.spinnerService.hide();
      if (response.isSuccess) {
        this.Users = response.payload;
        this.data = new LocalDataSource(this.Users);
        this.recordsCount = response.recordCount;
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
  newChecksheet() {
    this.router.navigate(['/pages/user-management/user-details']);
  }

}
