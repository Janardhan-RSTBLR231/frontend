import { Component, Input, OnInit } from '@angular/core';
import { CommonnImageDialogComponent } from '../../commonn-image-dialog/commonn-image-dialog.component';
import { NbDialogService } from '@nebular/theme';

@Component({
  selector: 'ngx-images-renderer',
  templateUrl: './images-renderer.component.html',
  styleUrls: ['./images-renderer.component.scss']
})
export class ImagesRendererComponent implements OnInit {

  @Input() rowData: any;

  constructor(private dialogService: NbDialogService) { }

  ngOnInit(): void {
  }
  openImageDialog(imageUrl: any) {
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
