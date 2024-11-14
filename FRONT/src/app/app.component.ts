import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LoginService } from './services/login/login.service';
import { PersistenceService } from './services/persistence/persistence.service';
import { AUTH_TOKEN } from './constants/auth.constants';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  standalone: true,
  imports: [RouterModule],
})
export class AppComponent {
  constructor(
    private loginService: LoginService,
    private persistenceService: PersistenceService
  ) {
    this.autoLogin();
  }

  /**
   * Since the brief doesn't request a login screen (actually asks explicitly for only one screen)
   * we auto login with the given user/password combo as a hack to simulate a login
   */
  private autoLogin() {
    const token = this.persistenceService.getItem(AUTH_TOKEN);

    if (token) return; // User already logged in

    const login = 'letscode'; // Hardcoded user
    const password = 'lets@123'; // Hardcoded password

    this.loginService.login(login, password).subscribe((token) => {
      if (token) {
        this.persistenceService.setItem(AUTH_TOKEN, token);
      }
    });
  }
}
