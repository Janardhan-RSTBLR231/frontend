import { Component, OnInit, Input } from '@angular/core';
import { ViewCell } from 'ng2-smart-table';
@Component({
  template:
  `<a [routerLink]="['../user-management/user-details',this.rowData.id]">{{ this.rowData.loginId }}</a>`,
})
export class UserRowrenderComponent implements ViewCell, OnInit {

  @Input()
  public value: string;

  @Input()
  rowData: any;
  constructor() { }

  ngOnInit(): void {
  }

}
