import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-checkpoint-rowrender',
  template: `<a [routerLink]="['./edit-check-point',this.rowData.id]">{{ this.rowData.name }}</a>`,
  

})
export class CheckpointRowrenderComponent implements OnInit {

  @Input()
  public value: string;
  public value1: string

  @Input()
  rowData: any;

  constructor() { }

  ngOnInit(): void {
  }

}
