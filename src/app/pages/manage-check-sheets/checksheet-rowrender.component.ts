import { Component, Input, OnInit } from '@angular/core';
import { ViewCell } from 'ng2-smart-table';

@Component({
  template: `<a [routerLink]="['../manage-check-sheets/add-new-check-sheet',this.rowData.id]">{{ this.rowData.name }}</a>`,
})
export class ChecksheetRowrenderComponent implements ViewCell, OnInit {

  @Input()
  public value: string;
  public value1: string

  @Input()
  rowData: any;

  constructor() { }

  ngOnInit(): void {
  }
}
