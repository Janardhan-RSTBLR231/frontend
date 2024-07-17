import { Component, Input, OnInit, Output } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { Tabledetails } from '../configuration.component'
import { UserDTO } from '../../../@core/interfaces/User'
import { SharedDataService } from '../../../services/shared-data.service'

@Component({
  selector: 'ngx-dailog-add-new',
  templateUrl: './dailog-add-new.component.html',
  styleUrls: ['./dailog-add-new.component.scss']
})
export class DailogAddNewComponent {
  userdata: UserDTO;
  tabledetail: Tabledetails = {
    id: '',
    code: '',
    name: '',
    description: '',
  };
  tabledetails: object;
  @Input() title: string;
  constructor(protected ref: NbDialogRef<DailogAddNewComponent>,
    private shareddataservice: SharedDataService) { }

  ngOnInit()
  {
    if (this.title === "Zone")
    {
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
      this.tabledetail.name = this.title;
      this.tabledetails = this.tabledetail
      this.ref.close({ tabledetails: this.tabledetails });
    } else {
      this.tabledetail.name = this.title;
      this.tabledetails = this.tabledetail
      this.ref.close({ tabledetails: this.tabledetails });
    }
   
  }
}
