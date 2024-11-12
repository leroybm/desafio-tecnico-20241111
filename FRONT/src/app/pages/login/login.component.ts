import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { LoginService } from '../../services/login/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  // form group for login and password
  loginForm = new FormGroup({
    login: new FormControl(''),
    password: new FormControl('')
  })

  constructor(
    private loginService: LoginService
  ) {
  }

  onSubmit() {
    const { login, password } = this.loginForm.value;

    if (!login || !password) {
      return; // TODO show error message
    }

    this.loginService.login(login, password).subscribe(
      (response) => {
        console.log(response);
      },
    )
  }
}
