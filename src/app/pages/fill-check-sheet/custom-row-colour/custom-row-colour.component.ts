import { Component, Input } from '@angular/core';
import { ViewCell } from 'ng2-smart-table';

@Component({
  selector: 'ngx-custom-row-colour',
  templateUrl: './custom-row-colour.component.html',
  styleUrls: ['./custom-row-colour.component.scss']
})
export class CustomRowColourComponent implements ViewCell {

  @Input() value: string;
  @Input() rowData: any;
  constructor() { }

  ngOnInit(): void {
  }

}