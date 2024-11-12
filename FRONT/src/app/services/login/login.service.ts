import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BASE_URL, ENDPOINTS } from '../../constants/api.constants';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private httpClient: HttpClient) {}

  // Login function given the login and password
  login(login: string, password: string): Observable<string | undefined> {
    return this.httpClient.post(`${BASE_URL}${ENDPOINTS.login}`, {
      login,
      senha: password,
    }) as Observable<string | undefined>; // Casts type as POST requests should return an object, but our API returns a string
  }
}
