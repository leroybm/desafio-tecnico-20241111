import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { PersistenceService } from '../services/persistence/persistence.service';
import { AUTH_TOKEN } from '../constants/auth.constants';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private persistenceService: PersistenceService) {}

  intercept(
    req: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const token = this.persistenceService.getItem(AUTH_TOKEN);

    if (token) {
      const cloned = req.clone({
        headers: req.headers.set('Authorization', `Bearer ${token}`),
      });

      return next.handle(cloned);
    } else {
      return next.handle(req);
    }
  }
}
