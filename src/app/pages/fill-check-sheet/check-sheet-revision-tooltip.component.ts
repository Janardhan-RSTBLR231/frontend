import { Component, OnInit, Input } from '@angular/core';
import { ViewCell } from 'ng2-smart-table';

@Component({
  template: `
     <span [style.color]="rowData.colorCode" nbTooltip="{{ tooltipContent }}" nbTooltipPlacement="top" nbTooltipStatus="info" style="cursor: pointer;">{{ value }}</span>`,
})
export class CheckSheetTooltipComponent {

  @Input() value: string;
  @Input() rowData: any;

  tooltipContent: string; // Define tooltipContent property

  static revision: any; // Define static revision property
  static anotherValue: any; // Define static anotherValue property

  ngOnInit() {
    this.tooltipContent = `${CheckSheetTooltipComponent.anotherValue}`;
  }

}