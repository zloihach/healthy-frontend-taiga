import { HttpInterceptorFn } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

function getCookie(name: string): string | null {
  const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
  console.log(`Getting cookie ${name}:`, match ? decodeURIComponent(match[2]) : null); // Log cookie value
  return match ? decodeURIComponent(match[2]) : null;
}

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  console.log('Interceptor called'); // Log to check if interceptor is called

  const authToken = getCookie('access-token'); // Извлекаем токен из куков

  console.log('Extracted authToken:', authToken); // Log extracted token

  const authReq = authToken ? req.clone({
    setHeaders: {
      Authorization: `Bearer ${authToken}`
    }
  }) : req;

  console.log('Modified request:', authReq); // Log modified request

  return next(authReq).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401) {
        console.error('Unauthorized request:', error);
      } else {
        console.error('HTTP error:', error);
      }
      return throwError(error);
    })
  );
};
