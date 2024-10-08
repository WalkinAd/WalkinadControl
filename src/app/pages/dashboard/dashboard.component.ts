import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user.model'; // Asegúrate de que la ruta sea correcta
import { Router } from '@angular/router'; // Importa Router para redireccionar después del logout
import { AngularFirestore } from '@angular/fire/compat/firestore'; // Importa Firestore si aún no lo has hecho

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  user: User | null = null; // Almacena la información del usuario
  errorMessage: string = ''; // Para manejar errores si es necesario
  
  constructor(private authService: AuthService, private router: Router, private firestore: AngularFirestore) {}

  ngOnInit() {
    this.firestore.collection('roles').valueChanges().subscribe({
      next: (roles) => {
        console.log('Datos de la colección roles:', roles);
      },
      error: (err) => {
        console.error('Error al acceder a la colección roles:', err);
      }
    });

    this.authService.getUser().subscribe({
      next: (user) => {
        this.user = user; // Asignar el usuario obtenido al componente
        if (!this.user) {
          this.errorMessage = 'No se encontró información del usuario.'; // Mensaje si no hay información del usuario
        }
      },
      error: (err) => {
        console.error(err);
        this.errorMessage = 'Ocurrió un error al obtener la información del usuario.'; // Mensaje de error
      }
    });
  }
}
