import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, switchMap, throwError } from 'rxjs';
import { AuthService } from '../services/auth';

export const authInterceptor: HttpInterceptorFn = (req, next) => {

  const authService = inject(AuthService);

  // Add token to every request
  const token = authService.getToken();
  let authReq = req;

  if (token) {
    authReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  return next(authReq).pipe(
    catchError((error: HttpErrorResponse) => {

      // If token expired — try refresh
      if (error.status === 401) {
        const refreshToken = localStorage.getItem('refreshToken');
        const email = localStorage.getItem('email');

        if (refreshToken && email) {
          return authService.refreshToken({
            email: email,
            refreshToken: refreshToken
          }).pipe(
            switchMap((response: any) => {
              // Save new tokens
              authService.saveToken(response.token);
              authService.saveRefreshToken(response.refreshToken);

              // Retry original request
              authReq = req.clone({
                setHeaders: {
                  Authorization: `Bearer ${response.token}`
                }
              });
              return next(authReq);
            }),
            catchError((refreshError) => {
              // Refresh failed — logout
              authService.logout();
              window.location.href = '/login';
              return throwError(() => refreshError);
            })
          );
        }
      }
      return throwError(() => error);
    })
  );
};