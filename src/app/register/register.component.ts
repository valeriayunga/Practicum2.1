import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {HttpErrorResponse} from "@angular/common/http";
import { Router } from '@angular/router';
import { AuthService } from '../../services/login.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit{
  registerForm: FormGroup;
  errorMessage: string = '';

  constructor(private authService: AuthService, private formBuilder: FormBuilder, private router: Router) {
    this.registerForm = this.formBuilder.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  ngOnInit() { }

  registerUser() {
    console.log('LLEGO ACA')
    console.log(this.registerForm)
    if (this.registerForm.valid) {
      console.log('LLEGO ACA el if')

      this.authService.registerUser(this.registerForm.value).subscribe(
        response => {
          this.errorMessage = 'Registro existoso';
          setTimeout(() => {
            this.router.navigate(['/login']); // Asegúrate de que '/login' sea la ruta correcta a tu página de inicio de sesión
          }, 3000); // Aquí, 3000 significa 3000ms o 3 segundos. Puedes ajustar este valor a tu gusto
        },
        (error: HttpErrorResponse) => {
          console.error(error);
          if (error.status === 409) {
            this.errorMessage = 'Usuario o email ya existe';
          } else {
            this.errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
          }
        }
      );
    }
  }
}
