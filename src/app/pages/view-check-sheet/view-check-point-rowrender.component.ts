import { Component, OnInit } from '@angular/core';

@Component({
  template:
    `<a [routerLink]="['../view-check-sheet/view-check-sheet-point-details']">{{ this.rowData.checkSheetName }}</a>`,

})
export class ViewCheckPointRowrenderComponent implements OnInit {

  rowData: any;
  constructor() { }

  ngOnInit(): void {
  }

}
