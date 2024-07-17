import { Component, OnInit, Input } from '@angular/core';
import { ViewCell } from 'ng2-smart-table';

@Component({
  template: `<a [style.color]="rowData.colorCode" [routerLink]="['../fill-check-sheet/check-point-details',this.rowData.id]">{{ this.rowData.name }}</a>`,
})
export class CheckPointRowRenderComponent implements ViewCell, OnInit {
  @Input()
  public value: string;
  public value1: string

  @Input()
  rowData: any;

  constructor() { }

  ngOnInit(): void {
  }

}
