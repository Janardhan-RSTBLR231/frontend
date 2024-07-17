import { Component, Input, OnInit, inject } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { Tabledetails } from '../configuration.component';
import { SharedDataService } from '../../../services/shared-data.service'
import { UserDTO } from '../../../@core/interfaces/User'
import { ApiService } from '../../../services/api.service'


@Component({
  selector: 'ngx-dailog-update',
  templateUrl: './dailog-update.component.html',
  styleUrls: ['./dailog-update.component.scss']
})
export class DailogUpdateComponent {

  @Input() title: string;
  configdetails: Tabledetails = {
    id: '',
    code: '',
    name: '',
    description: '',
  };
  tabledetails: object;
  apiService = inject(ApiService);
  userdata: UserDTO;
  constructor(protected ref: NbDialogRef<DailogUpdateComponent>,
    private sharedataservice: SharedDataService) { }

  ngOnInit() {
    if (this.title === "Zone") {
      this.title = "Maintenance Class"
    }
    else {
      this.title
    }
  }
  cancel() {
    this.ref.close();
  }

  submit() {
    if (this.title === "Maintenance Class") {
      this.title = "Zone"
      this.configdetails.name = this.title;
      this.tabledetails = this.configdetails
      this.ref.close({ tabledetails: this.tabledetails });
    } else {
      this.configdetails.name = this.title;
      this.tabledetails = this.configdetails
      this.ref.close({ tabledetails: this.tabledetails });
    }
  }

}
