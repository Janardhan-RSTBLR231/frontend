import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'ngx-custom-actions',
  templateUrl: './custom-actions.component.html',
  styleUrls: ['./custom-actions.component.scss']
})
export class CustomActionsComponent {

  @Input() rowData: any;

  @Output() edit: EventEmitter<any> = new EventEmitter();
  @Output() delete: EventEmitter<any> = new EventEmitter(); // Emitting ID for delete

  constructor() { }

  ngOnInit(): void {
  }
  onClick() {
    this.edit.emit(this.rowData);
  }

  onDelete() {
    this.delete.emit(this.rowData.id);
  }

}
