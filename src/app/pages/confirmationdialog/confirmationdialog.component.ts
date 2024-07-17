import { Component, Input } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';

@Component({
  selector: 'ngx-confirmationdialog',
  templateUrl: './confirmationdialog.component.html',
  styleUrls: ['./confirmationdialog.component.scss'],
})
export class ConfirmationdialogComponent {

  @Input() title: string;

  constructor(protected ref: NbDialogRef<ConfirmationdialogComponent>) { }

  cancel() {
    this.ref.close('cancel');
  }

  submit() {
    this.ref.close('ok');
  }

}
