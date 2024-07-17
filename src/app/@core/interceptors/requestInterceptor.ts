import { Injectable, inject } from '@angular/core';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, filter, switchMap, take } from "rxjs/operators";
import { NbToastrService } from '@nebular/theme';
import { JwtService } from '../services/jwt.service';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';

@Injectable()
export class RequestInterceptor implements HttpInterceptor {
   toastrService = inject(NbToastrService);
   private isRefreshing = false;
   private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);
   apiService = inject(ApiService);
   constructor(private jwtService: JwtService,
      protected router: Router) {
   }

   intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
      const token: string = localStorage.getItem('token');
      if (token && !request.url.includes("Auth")) {
         request = this.addTokenHeader(request, token);
      }
      return next.handle(request)
         .pipe(
            catchError((error: HttpErrorResponse) => {
               let errorMsg = '';

               if (error.error instanceof ErrorEvent) {
                  errorMsg = `Error: ${error.error.message}`;
               }
               else if (!request.url.includes('Auth/login') && error.status === 401) {
                  return this.handle401Error(request, next);
               }
               else {
                  errorMsg = `Error Code: ${error.status},  Message: ${error.message}`;
               }
               var status = 'danger';
               this.toastrService.show(status, errorMsg, {
                  status: status,
                  duration: 10000,
               });
               return throwError(errorMsg);
            })
         )

   }
   private handle401Error(request: HttpRequest<any>, next: HttpHandler) {
      if (!this.isRefreshing) {
         this.isRefreshing = true;
         this.refreshTokenSubject.next(null);

         let loginInfo = localStorage.getItem("loginInfo");

         if (loginInfo)
            return this.apiService.refreshToken(loginInfo).pipe(
               switchMap((data: any) => {
                  this.isRefreshing = false;

                  localStorage.setItem("token", data.token.access_token);
                  localStorage.setItem("loginInfo", data.token);
                  this.refreshTokenSubject.next(data.token.access_token);

                  return next.handle(this.addTokenHeader(request, data.token.access_token));
               }),
               catchError((err) => {
                  this.isRefreshing = false;
                  this.router.navigate(["auth"])

                  return throwError(err);
               })
            );
      }

      return this.refreshTokenSubject.pipe(
         filter(token => token !== null),
         take(1),
         switchMap((token) => next.handle(this.addTokenHeader(request, token)))
      );
   }
   private addTokenHeader(request: HttpRequest<any>, token: string) {
      /* for Spring Boot back-end */
      // return request.clone({ headers: request.headers.set(TOKEN_HEADER_KEY, 'Bearer ' + token) });

      /* for Node.js Express back-end */
      var brrToken = "Bearer" + " " + token.toString().substring(1, token.length - 1);
      return request.clone({ headers: request.headers.set("Authorization", brrToken) });
   }
}