import { Component, Input, OnInit } from '@angular/core';
import { NbDialogService } from '@nebular/theme';
import { CommonnImageDialogComponent } from '../../commonn-image-dialog/commonn-image-dialog.component';

@Component({
  selector: 'ngx-image-render',
  templateUrl: './image-render.component.html',
  styleUrls: ['./image-render.component.scss']
})
export class ImageRenderComponent implements OnInit {
  @Input() rowData: any;

  constructor(private dialogService: NbDialogService) { }

  ngOnInit(): void {
  }
  openImageDialog(imageUrl:any) {
    console.log(imageUrl)
    this.dialogService.open(CommonnImageDialogComponent, {
      context: {
        url: imageUrl
      },
      dialogClass: 'image-dialog',
      closeOnBackdropClick: true,
      closeOnEsc: true,
      hasBackdrop: true,
      autoFocus: false,
    });
  }
}
