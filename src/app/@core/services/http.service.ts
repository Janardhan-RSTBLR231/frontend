import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class HttpService<T> {

  constructor(private httpClient: HttpClient) { }
  public http_get(url: string): Observable<T> {
    return this.httpClient.get<T>(url)
      .pipe(map((data: any) => data as T));
  }
  public http_getList(url: string): Observable<T[]> {
    return this.httpClient.get<T>(url)
      .pipe(map((data: any) => data as T[]));
  }
  public http_post(url: string, input: T): Observable<T> {
    return this.httpClient.post<T>(url, input)
      .pipe(map((data: any) => data as T));
  }
  public http_put(url: string, input: T): Observable<T> {
    return this.httpClient.put<T>(url, input)
      .pipe(map((data: any) => data as T));
  }
  public http_delete(url: string, input: T) {
    return this.httpClient.delete<T>(url);
  }
}
