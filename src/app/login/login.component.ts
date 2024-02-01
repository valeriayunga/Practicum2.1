import { Component } from '@angular/core';
import {AuthService} from "../../services/login.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) { }

  login(event: Event): void {
    event.preventDefault();
    this.errorMessage = '';

    if (!this.isEmailValid(this.email)) {
      this.errorMessage = 'Por favor, introduce un correo electrónico válido.';
      return;
    }

    if (this.isPasswordInvalid(this.password)) {
      this.errorMessage = 'La contraseña debe tener al menos 6 caracteres.';
      return;
    }

    this.authenticateUser(this.email, this.password);
  }

  private isEmailValid(email: string): boolean {
    const emailRegex = new RegExp('^(([^<>()[\\].,;:\\s@"]+(\\.[^<>()[\\].,;:\\s@"]+)*)|(".+"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$');
    return emailRegex.test(email);
  }

  private isPasswordInvalid(password: string): boolean {
    return password.length < 6;
  }

  private authenticateUser(email: string, password: string): void {
    this.authService.login(email, password)
      .then((data) => {
        console.log('Inicio de sesión exitoso');
        console.log(data);
        this.router.navigate(['/inicio']);
      })
      .catch(error => {
        this.handleError(error);
      });
  }

  private handleError(error: any): void {
    console.error(error);
    if (error.response) {
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
      this.errorMessage = 'Error: ' + error.response.data;
    } else if (error.request) {
      console.log(error.request);
      this.errorMessage = 'Error: No se ha recibido respuesta del servidor.';
    } else if (error.message) {
      console.log('Error', error.message);
      this.errorMessage = 'Error: ' + error.message;
    }
  }
}
