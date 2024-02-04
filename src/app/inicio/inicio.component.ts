import { Component } from '@angular/core';
import {AuthService} from "../../services/login.service";
import { Location } from '@angular/common';


export interface Producto {
  nombre: string;
  direccion: string;
  precio: number;
  tipo: string;
  puntuacion: number;
}
@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})

export class InicioComponent {
  currentIndex = 0;
  currentPage: string;
  username: string;
  email: string;
  usuario: string = '';
// En tu componente
  recomendaciones: any[] = [];


  constructor(private location: Location, private authService: AuthService) {
    this.currentPage = this.location.path();
    this.username = localStorage.getItem('username') || '';
    this.email = localStorage.getItem('email') || '';
  }
  isDropdownVisible = false;

  // Método para alternar la visibilidad del menú desplegable
  toggleDropdown() {
    // sólo alterar la visibilidad si el usuario está logueado
    if (this.authService.isUserAuthenticated()) {
      this.isDropdownVisible = !this.isDropdownVisible;
    }
  }
  logout() {
    this.authService.logout();
  }

  isMobileMenuVisible: boolean = false;

  // Método para alternar la visibilidad del menú móvil
  toggleMobileMenu() {
    this.isMobileMenuVisible = !this.isMobileMenuVisible;
  }

  // Método para ir a la diapositiva anterior
  maxIndex: number = 3;
  enviarNombre(nombre: string): void {
    this.authService.obtenerRecomendaciones(nombre).subscribe({
      next: (data) => {
        console.log("Datos",data)
        this.actualizarVistaConRecomendaciones(data.recomendaciones);
      },
      error: (error) => console.error('Error al obtener recomendaciones:', error)
    });
  }
  actualizarVistaConRecomendaciones(recomendaciones: any[]): void {
    this.recomendaciones = recomendaciones;
  }
  isNumber(value: any): boolean {
    return !isNaN(parseFloat(value)) && isFinite(value);
  }

  imagenes: string[] = [
    './../../assets/img/hamburguesa.png',
    './../../assets/img/pizza.png',
    './../../assets/img/papas.png',
    './../../assets/img/grill.png',
    './../../assets/img/seviche.png',
    './../../assets/img/agachadito.png',
    './../../assets/img/alitas.png',
    './../../assets/img/milanesa.png',
    './../../assets/img/taco.png',
    './../../assets/img/chifa.png',
    './../../assets/img/empanada.png',
    './../../assets/img/buñuelo.png',
    './../../assets/img/bolon.png',
    // ... otras imágenes
  ];
  getRandomImage() {
    return this.imagenes[Math.floor(Math.random() * this.imagenes.length)];
  }

  scrollTo(section: string): void {
    const element = document.querySelector('#' + section);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    } else {
      console.warn('Elemento no encontrado:', section);
    }
  }
}
