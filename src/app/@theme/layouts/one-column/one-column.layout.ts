import { Component } from '@angular/core';
import { JwtService} from '../../../@core/services/jwt.service'

@Component({
  selector: 'ngx-one-column-layout',
  styleUrls: ['./one-column.layout.scss'],
  template: `
    <nb-layout windowMode>
      <nb-layout-header fixed>
        <ngx-header></ngx-header>
      </nb-layout-header>

      <nb-sidebar class="menu-sidebar" tag="menu-sidebar" responsive *ngIf="shouldShowSidebar()">
        <ng-content select="nb-menu"></ng-content>
      </nb-sidebar>

      <nb-layout-column style=" margin-top: -35px;margin-right: -30px;margin-left: -30px;" >
        <ng-content select="router-outlet"></ng-content>
      </nb-layout-column>
    </nb-layout>
  `,
})
//   <nb-layout-footer fixed>
//     <ngx-footer></ngx-footer>
//   </nb-layout-footer>
// </nb-layout>
export class OneColumnLayoutComponent {

  constructor(private jwtservice:JwtService)
  {

  }
  ngOnInit() {

  }
  allowedRoles: string[] = ['SuperAdmin', 'Creator', 'Approver', 'Reviewer','Validator'];


  // Function to check if the sidebar should be shown based on the user's role
  shouldShowSidebar(): boolean {
    const userRole = this.jwtservice.getRole();
    return this.allowedRoles.includes(userRole);
  }
}
