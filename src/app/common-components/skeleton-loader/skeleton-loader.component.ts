import { Component, OnInit, Input } from '@angular/core';
@Component({
  selector: 'app-skeleton-loader',
  templateUrl: './skeleton-loader.component.html',
  styleUrls: ['./skeleton-loader.component.scss'],
})
export class SkeletonLoaderComponent implements OnInit {
  @Input() height = 'auto';
  @Input() width = '100%';
  @Input() borderRadius = '0';
  @Input() appearance = 'line';
  bgColor = '#f3f6f9';
  ngOnInit(): void {
    if (this.appearance === 'circle') {
      this.borderRadius = '100%';
    }
  }
}
