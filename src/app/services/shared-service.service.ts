import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedServiceService {

  values: string;
  constructor() {
    this.values;
  }
  setSelectedValue(value: any) {
    this.values = value;
  }
  getSelectedValue() {
    return this.values;
  }
}
