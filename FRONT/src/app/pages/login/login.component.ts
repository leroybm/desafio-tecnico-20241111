import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { LoginService } from '../../services/login/login.service';
import { Router } from '@angular/router';
import { PersistenceService } from '../../services/persistence/persistence.service';
import { AUTH_TOKEN } from '../../constants/auth.constants';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  // form group for login and password
  loginForm = new FormGroup({
    login: new FormControl('letscode'),
    password: new FormControl('lets@123')
  })

  constructor(
    private loginService: LoginService,
    private router: Router,
    private persistenceService: PersistenceService
  ) {
  }

  onSubmit() {
    const { login, password } = this.loginForm.value;

    if (!login || !password) {
      return; // TODO show error message
    }

    this.loginService.login(login, password).subscribe(
      (response) => {
        this.persistenceService.setItem(AUTH_TOKEN, response as string)
        this.router.navigate(['/']);
      },
    )
  }
}
