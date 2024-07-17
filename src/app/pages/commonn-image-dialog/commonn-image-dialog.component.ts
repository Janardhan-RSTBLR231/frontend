import { Component, OnInit,Input } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';

@Component({
  selector: 'ngx-commonn-image-dialog',
  templateUrl: './commonn-image-dialog.component.html',
  styleUrls: ['./commonn-image-dialog.component.scss']
})
export class CommonnImageDialogComponent {
  @Input() url: any;

  constructor(protected ref: NbDialogRef<CommonnImageDialogComponent>) { }

  ngOnInit(): void {
  }

  Close()
  {
    this.ref.close();
  }
}
