import { Injectable } from '@angular/core';
import { JwtHelperService } from "@auth0/angular-jwt";
import { LocalStorageHandler } from '../listeners/localStorageHandler';
@Injectable({
  providedIn: 'root'
})
export class JwtService {
  private jwtHelper = new JwtHelperService();
  constructor(private localStorage: LocalStorageHandler) { }
  decodedToken() {
    return this.jwtHelper.decodeToken(this.localStorage.getData("token"))
  }
  getName() {
    return this.jwtHelper.decodeToken(this.localStorage.getData("token"))?.name;
  }
  getId() {
    var token = this.jwtHelper.decodeToken(this.localStorage.getData("token"));
    return token['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'];
  }
  getRole() {
    var token = this.jwtHelper.decodeToken(this.localStorage.getData("token"));
    return token['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
  }
  getAccess(access: string) {
    var token = this.jwtHelper.decodeToken(this.localStorage.getData("token"));
    let isAccessable = (token[access]?.toLowerCase() == "true");
    return isAccessable;
  }
  isExpired() {
    if (this.localStorage.getData("token"))
      return this.jwtHelper.isTokenExpired(this.localStorage.getData("token"))
    return false
  }
  ValidateNdExtractGmailtoken(token: string, clientId: string): any {
    if (!this.jwtHelper.isTokenExpired(token) &&
      clientId == this.jwtHelper.decodeToken(token)?.aud) {
      return {
        first_name: this.jwtHelper.decodeToken(token)?.given_name,
        last_name: this.jwtHelper.decodeToken(token)?.family_name,
        name: this.jwtHelper.decodeToken(token)?.name,
        email: this.jwtHelper.decodeToken(token)?.email,
        // profile_picture: this.jwtHelper.decodeToken(token)?.picture
      }
    }
    return {}
  }
  redirectToRoleBasedPage(): string {
    const role = this.getRole();
    if (role === 'Creator' || role === 'Reviewer' || role === 'Approver') {
      return 'manage-check-sheets';
    } else if (role === 'Operator' || role === 'Validator') {
      return 'fill-check-sheet'
    } else if (role === 'SuperAdmin') {
      return 'user-management'
    } else {
      return 'auth/login'
    }
  }

  getAccessTokenFromToken() {
    const token = this.localStorage.getData("token");
    if (token) {
      
      return token;
    } else {
      return null; 
    }
  }

  getPlant() {
    return this.jwtHelper.decodeToken(this.localStorage.getData("token"))?.plant;
  }
  getEmail() {
    return this.jwtHelper.decodeToken(this.localStorage.getData("token"))?.email;
  }

  getDepartment() {
    return this.jwtHelper.decodeToken(this.localStorage.getData("token"))?.department;
  }
}


