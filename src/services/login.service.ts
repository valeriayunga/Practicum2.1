import { Injectable } from '@angular/core';
import axios, {AxiosError, AxiosResponse} from 'axios';
import { Router } from '@angular/router';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable()
export class AuthService {
  private _token: string | null = null;
  constructor(private router: Router, private http: HttpClient) { }

  get token(): string | null {
    return this._token;
  }

  set token(value: string | null) {
    this._token = value;
  }

  login(username: string, password: string): Promise<void> {
    return axios.post('http://localhost:8000/api-user-login/', {
      username, password
    })
      .then((response: AxiosResponse) => {
        this._token = response.data.token;
        if (typeof this._token === "string") {
          localStorage.setItem('authToken', this._token);
          localStorage.setItem('userId', response.data.id );
          localStorage.setItem('username', response.data.username);
          localStorage.setItem('email', response.data.email);
        }
        return response.data;
      });
  }
  logout(): void {
    const token = this._token;
    this._token = null;
    localStorage.removeItem('authToken');
    localStorage.removeItem('username');
    localStorage.removeItem('email');
    localStorage.removeItem('emprendimientoId')
    axios.post('http://localhost:8000/api-logout/', {}, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then((response: AxiosResponse) => {
        console.log('Logout successful');
      })
      .catch((error: AxiosError) => {
        console.error('Logout failed', error);
      });

    this.router.navigate(['login']);
  }
  isUserAuthenticated(): boolean {
    const token = localStorage.getItem('authToken');
    return !!token;
  }
  register(username: string, email: string, password: string): void {
    axios.post('http://localhost:8000/api/users/ ', {
      username: username,
      password: password,
      email: email,
    })
      .then((response: AxiosResponse) => {
        console.log('Register successful');
        this.router.navigate(['login']);
      })
      .catch((error: any) => {
        if (error.response) {
          // The request was made and the server responded with a status code that falls out of the range of 2xx
          console.error('Error Data', error.response.data);
          console.error('Error Status', error.response.status);
          console.error('Error Headers', error.response.headers);
        } else if (error.request) {
          // The request was made but no response was received
          console.error('Error Request', error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.error('Error', error.message);
        }
        console.error('Error Config', error.config);
      });
  }
  registerUser(userData: any) {
    return this.http.post('http://localhost:8000/api/users/', userData);
  }

  updateUser(userData:any): Observable<any> {
    const token = localStorage.getItem('authToken');
    const headers = { 'Authorization': `Token ${token}` };
    return this.http.patch<any>('http://localhost:8000/apid-edit-users/', userData,{ headers: headers });
  }
  obtenerIdUsuario(): string | null {
    return localStorage.getItem('userId');
  }
  registrarEmprendimiento(datosEmprendimiento: any): Observable<any> {
    const token = localStorage.getItem('authToken');
    const headers = {'Authorization': `Token ${token}` };
    return this.http.post('http://localhost:8000/api-emp/emprendimiento/', datosEmprendimiento, { headers: headers });
  }
  tieneEmprendimientoRegistrado(userId: string): Observable<any> {
    const token = localStorage.getItem('authToken');
    const headers = { 'Authorization': `Token ${token}` };
    return this.http.get(`http://localhost:8000/api-emp/emprendimiento/?usuario=${userId}`, { headers: headers });
  }

}
