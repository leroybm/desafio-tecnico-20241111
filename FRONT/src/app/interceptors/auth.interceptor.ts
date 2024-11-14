import { inject, Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse,
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { PersistenceService } from '../services/persistence/persistence.service';
import { AUTH_TOKEN } from '../constants/auth.constants';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private persistenceService: PersistenceService) {}

  router = inject(Router);

  intercept(
    req: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const token = this.persistenceService.getItem(AUTH_TOKEN);

    if (token) {
      const cloned = req.clone({
        headers: req.headers.set('Authorization', `Bearer ${token}`),
      });

      return next.handle(cloned).pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.status === 401) {
            this.persistenceService.removeItem(AUTH_TOKEN);
            this.router.navigate(['/login']);
          }
          return throwError(() => error);
        })
      );
    } else {
      return next.handle(req);
    }
  }
}
