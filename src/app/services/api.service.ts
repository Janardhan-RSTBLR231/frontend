import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, from, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { JwtService } from '../@core/services/jwt.service'

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  baseurl = environment.apiurl;
  //baseurl1 = 'https://localhost:7262/api';
  constructor(private http: HttpClient, private jwtservice: JwtService) { }


  post(
    baseUrl: string,
    path: string,
    body: Object = {},
    params = {},
    header = new HttpHeaders()
  ): Observable<any> {
    return this.http
      .post(`${baseUrl}${path}`, body, {
        params,
        headers: header,
      })
      .pipe(catchError(this.formatErrors));
  }
  post2(
    baseUrl: string,
    path: string,
    body: Object = {},
    params = {},
    header = new HttpHeaders()
  ): Observable<any> {
    return this.http
      .post(`${baseUrl}${path}`, body, {
        params,
        headers: header,
      })
      .pipe(catchError(this.formatErrors));
  }
  put(
    baseUrl: string,
    path: string,
    body: Object = {},
    params = {},
    header = new HttpHeaders()
  ): Observable<any> {
    return this.http
      .put(`${baseUrl}${path}`, body, {
        params,
        headers: header,
      })
      .pipe(catchError(this.formatErrors));
  }

  get(
    baseUrl: string,
    path: string,
    params = {},
    header = new HttpHeaders()
  ): Observable<any> {
    return this.http
      .get(`${baseUrl}${path}`, { params, headers: header })
      .pipe(catchError(this.formatErrors));
  }
  get3(
    baseUrl: string,
    path: string,
    params = {},
    header = new HttpHeaders()
  ): Observable<any> {
    return this.http
      .get<string[]>(`${baseUrl}${path}`, { params, headers: header })
      .pipe(catchError(this.formatErrors));
  }
  get2(
    baseUrl: string,
    path: string,
    options?
  ): Observable<any> {
    return this.http
      .get(`${baseUrl}${path}`, options)
      .pipe(catchError(this.formatErrors));
  }

  getimages(baseUrl: string, path: string, queryParams: string, options?): Observable<any> {
    const url = `${baseUrl}${path}${queryParams}`;
    return this.http
      .get(url, options)
      .pipe(catchError(this.formatErrors));
  }
  getimages1(baseUrl: string, path: string, params = {}, header = new HttpHeaders(), options?): Observable<any> {
    const url = `${baseUrl}${path}${options}`;
    return this.http.get(url, { params, headers: header })
      .pipe(catchError(this.formatErrors));
  }
  getimages2(baseUrl: string, path: string, queryParams: string, options?): Observable<any> {
    const token = this.jwtservice.getAccessTokenFromToken();
    const modifiedOptions = options || {};
    modifiedOptions.headers = new HttpHeaders({ Authorization: `Bearer ${token}` });
    const url = `${baseUrl}${path}${queryParams}`;
    return this.http.get(url, modifiedOptions)
      .pipe(catchError(this.formatErrors));
  }


  delete(baseUrl: string, path: string, body = null): Observable<any> {
    return this.http
      .request('delete', `${baseUrl}${path}`, {
        body: body,
      })
      .pipe(catchError(this.formatErrors));
  }
  get4(
    baseUrl: string,
    path: string,
    params = {},
    header = new HttpHeaders()
  ): Observable<any> {
    return this.http
      .get(`${this.baseurl}${path}`, { params, headers: header })
      .pipe(catchError(this.formatErrors));
  }


  //Login Apis
  login(payload: any) {
    return this.post(this.baseurl, '/Auth/login', payload);
  }
  refreshToken(payload: any) {
    var token = JSON.parse(payload);
    return this.post(this.baseurl, '/Auth/refresh-token', token);
  }

  private formatErrors(error: any) {
    return throwError(error?.error);
  }

  //Configuration Apis
  getconfig() {
    return this.get4(this.baseurl, '/Configuration/GetAll')
  }
  postnewconfig(payload: any) {
    return this.post(this.baseurl, '/Configuration/Create', payload)
  }
  updateconfig(payload: any) {
    return this.put(this.baseurl, '/Configuration/Update', payload)
  }
  deleteconfig(id: any) {
    return this.delete(this.baseurl, '/Configuration/Delete?_id=' + id)
  }


  //CheksheetTransaction Apis
  getCheckSheet(search: any) {
    return this.get4(this.baseurl, '/CheckSheetTransaction/GetCheckSheets?globalSearch=' + search)
  }
  getCheckPointDetailsById(id: string) {
    return this.get4(this.baseurl, `/CheckSheetTransaction/GetCheckSheetById?_id=${id}`)
  }
  bulkUpdateChcekRecord(payload: any) {
    return this.post(this.baseurl, '/CheckSheetTransaction/BulkUpdateCheckRecord', payload)
  }
  UpdateCheckRecord(payload: any) {
    return this.post(this.baseurl, '/CheckSheetTransaction/UpdateCheckRecord', payload)
  }
  GetImagePath(fileName: string, uniqueFileName: string) {
    return `${this.baseurl}/CheckSheetImage/Download?folder=images&fileName=${fileName}&uniqueFileName=${uniqueFileName}&width=500&height=500`
  }
  submitCheckSheet(id: any) {
    return this.post(this.baseurl, `/CheckSheetTransaction/SubmitCheckSheet?_id=${id}`)
  }
  approveCheckSheet(id: any) {
    return this.post(this.baseurl, '/CheckSheetTransaction/ApproveCheckSheet?_id=' + id)
  }
  getExport2Excel(id: any): Observable<any> {
    return this.get2(this.baseurl, `/CheckSheetTransaction/ExportCheckSheetById?_id=${id}`, { responseType: 'blob' });
  }
  getCheckSheetTransactionrecords(payload: any) {
    return this.post(this.baseurl, '/CheckSheetTransaction/GetFilteredCheckSheets', payload);
  }


  //CheksheetVersions Apis
  getLatestCheckSheet(search: any) {
    return this.get4(this.baseurl, '/CheckSheetVersion/GetLatest?globalSearch=' + search)
  }
  getCheckSheetVersion(search: any) {
    return this.get4(this.baseurl, '/CheckSheetVersion/GetAll?globalSearch=' + search)
  }
  getApproverReviewers() {
    return this.get4(this.baseurl, '/CheckSheetVersion/GetReviewersAndApprovers')
  }
  createCheckSheet(payload: any) {
    return this.post(this.baseurl, '/CheckSheetVersion/Create', payload)
  }
  getChecksheetById(id: any) {
    return this.get4(this.baseurl, '/CheckSheetVersion/GetCheckSheetById?checkSheetId=' + id)
  }
  updateCheckSheet(id: any, payload: any) {
    return this.put(this.baseurl, '/CheckSheetVersion/UpdateCheckSheet?checkSheetId=' + id, payload)
  }
  createcheckpoint(id: any, payload: any) {
    return this.post(this.baseurl, '/CheckSheetVersion/CreateCheckPoint?checkSheetId=' + id, payload)
  }
  updateCheckPoint(id: any, payload: any) {
    return this.put(this.baseurl, '/CheckSheetVersion/UpdateCheckPoint?checkSheetId=' + id, payload)
  }
  submittCheckSheet(id: any, changeDetails: any) {
    return this.post(this.baseurl, `/CheckSheetVersion/SubmitCheckSheet?_id=${id}&changeDetails=${changeDetails}`)
  }
  reviewCheckSheet(id: any, reviewerid: any) {
    return this.post(this.baseurl, `/CheckSheetVersion/ReviewCheckSheet?_id=${id}&reviewer=${reviewerid}`)
  }
  approveCheckSheetVersion(id: any, reviewerid: any) {
    return this.post(this.baseurl, `/CheckSheetVersion/ApproveCheckSheet?_id=${id}&approver=${reviewerid}`)
  }

  replicateCheckSheet(payload: any) {
    return this.post(this.baseurl, '/CheckSheetVersion/Replicate', payload)
  }
  createCheckSheetVersion(payload: any) {
    return this.post(this.baseurl, '/CheckSheetVersion/CreateVersion', payload)
  }
  reject(id: any, comments: any) {
    return this.post(this.baseurl, `/CheckSheetVersion/RejectCheckSheet?_id=${id}&reason=${comments}`)
  }
  //ChekPoint image upload
  uploadimage(checksheetid: any, checkpointid: any, payload: any) {
    return this.post(this.baseurl, `/CheckSheetImage/Upload?checkSheetId=${checksheetid}&checkPointId=${checkpointid}`, payload)
  }
  //ChekPoint image Download
  downloadimage(fileName: string, uniqueFileName: string) {
    return `${this.baseurl}/CheckSheetImage/Download?folder=images&fileName=${fileName}&uniqueFileName=${uniqueFileName}&width=500&height=500`
  }
  deleteCheckSheets(id: any) {
    return this.delete(this.baseurl, `/CheckSheetVersion/Delete?_id=${id}`);
  }
  deleteCheckpoints(checkSheetid: any, Id: any) {
    return this.delete(this.baseurl, `/CheckSheetVersion/DeleteCheckPoint?checkSheetId=${checkSheetid}&id=${Id}`);
  }
  updateWorkFlow(payload: any) {
    return this.post(this.baseurl, '/CheckSheetVersion/UpdateWorkFlow', payload)
  }

  //User Apis
  getCurrentUser() {
    return this.get4(this.baseurl, '/User/GetCurrent/current')
  }
  getusers() {
    return this.get4(this.baseurl, '/User/GetAll')
  }
  getUserByid(uid:any) {
    return this.get4(this.baseurl, `/User/GetById?id=${uid}`);
  }
  updateUser(payload: any) {
    return this.put(this.baseurl, '/User/Update', payload)
  }
  createUser(payload: any) {
    return this.post(this.baseurl, '/User/Create', payload)
  }
  deleteUser(id: any) {
    return this.delete(this.baseurl, '/User/Delete?_id=' + id)
  }
  updatePassword(userid: any, newpassword: string, confirmpassword: string) {
    return this.post(this.baseurl, `/User/UpdatePassword?id=${userid}&newPassword=${newpassword}&confirmPassword=${confirmpassword}`)
  }


  //View Checksheet
  getViewcheksheets(globalSearch: string, searchbydate: any, fromdate: string, todate: string) {
    return this.get4(this.baseurl, `/CheckSheetTransaction/GetTransactions?globalSearch=${globalSearch}&searchByDate=${searchbydate}&fromDate=${fromdate}&toDate=${todate}`)
  }
  getExport2Excel1(globalSearch: string, searchbydate: any, fromdate: string, todate: string): Observable<any> {
    return this.get2(this.baseurl, `/CheckSheetTransaction/ExportTransactions?exportWithCheckPoints = true&globalSearch=${globalSearch}&searchByDate=${searchbydate}&fromDate=${fromdate}&toDate=${todate}`, { responseType: 'blob' });
  }

  //LandingPage  
  LandingPageimage(fileName: string, uniqueFileName: string) {
    return `${this.baseurl}/CheckSheetImage/Download?folder=common&fileName=${fileName}&uniqueFileName=${uniqueFileName}&width=800&height=800`
  }

  //Setting Api
  getSettings() {
    return this.get4(this.baseurl, `/MasterSettings/GetSettings`)
  }
  updateSettings( payload: any) {
    return this.put(this.baseurl, '/MasterSettings/Update', payload)
  }
}

