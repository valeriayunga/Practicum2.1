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
  prevSlide(): void {
    this.currentIndex = this.currentIndex > 0 ? this.currentIndex - 1 : 0;
    this.updateCarousel();
  }

  // Método para ir a la próxima diapositiva
  nextSlide(): void {
    this.currentIndex = this.currentIndex < this.maxIndex ? this.currentIndex + 1 : this.maxIndex;
    this.updateCarousel();
  }

  // Método para actualizar el carrusel (podrías cambiar la clase o estilo de los elementos aquí)
  private updateCarousel(): void {
    // Lógica para actualizar el carrusel basado en currentIndex
  }
}
