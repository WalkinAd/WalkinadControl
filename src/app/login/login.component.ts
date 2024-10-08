// src/app/components/login/login.component.ts
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { User } from '../models/user.model'; // Importar la interfaz User
import { Router } from '@angular/router'; // Importa Router

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  email: string = '';
  password: string = '';
  touched: boolean = false;
  errorMessage: string = '';  // Nueva variable para el mensaje de error
  user: User | null = null;    // Nueva variable para almacenar el usuario

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    // Suscribirse al observable user$ para obtener el usuario
    this.authService.user$.subscribe(user => {
      this.user = user; // Almacena el usuario autenticado
      if (this.user) {
        console.log("Usuario autenticado:", this.user);
      }
    });
  }

  onSubmit() {
    this.touched = true;
    this.errorMessage = '';  // Limpiar cualquier mensaje de error previo
    
    if (this.email && this.password) {
      this.authService.login(this.email, this.password).then(() => {
        // Autenticación exitosa
        console.log("Usuario autenticado correctamente");
        this.router.navigate(['/dashboard']); // Cambia a la ruta del dashboard

      }).catch(error => {
        // Manejo de errores
        this.handleError(error); // Llama a la función para manejar errores
      });
    } else {
      this.errorMessage = 'Por favor complete todos los campos.';  // Validación simple en el frontend
    }
  }

  private handleError(error: any) {
    // Aquí puedes mapear los diferentes tipos de errores
    console.log(error);
    console.log(error.code);
    if (error.code === 'auth/user-not-found') {
      this.errorMessage = 'No se encontró un usuario con ese correo electrónico.';
    } else if (error.code === 'auth/wrong-password') {
      this.errorMessage = 'La contraseña es incorrecta.';
    } else if (error.code === 'auth/invalid-email') {
      this.errorMessage = 'El correo electrónico no es válido.';
    } else if (error.code === 'auth/invalid-credential') {
      this.errorMessage = 'Las credenciales no son válidas.';
    } else {
      this.errorMessage = 'Ocurrió un error inesperado. Intente nuevamente más tarde.';
    }
  }
}
