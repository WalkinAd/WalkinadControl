import { Component , Output, EventEmitter} from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user.model'; // Asegúrate de que la ruta sea correcta
import { Router } from '@angular/router'; // Importa Router para redireccionar después del logout
import { AngularFirestore } from '@angular/fire/compat/firestore'; // Importa Firestore si aún no lo has hecho

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  user: User | null = null; // Almacena la información del usuario
  errorMessage: string = ''; // Para manejar errores si es necesario



  constructor(private authService: AuthService, private router: Router, private firestore: AngularFirestore) {}

  @Output() toggleSidenav = new EventEmitter<void>();

  toggleDrawer() {
    this.toggleSidenav.emit(); // Emite el evento para abrir/cerrar el drawer
  }

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


  toggleUserMenu(event: MouseEvent) {
    event.stopPropagation(); // Evita que el clic cierre el menú
  }

  onLogout() {
    this.authService.logout().then(() => {
      console.log('Sesión cerrada correctamente');
      this.router.navigate(['/login']); // Redireccionar al login después de cerrar sesión
    }).catch((error) => {
      console.error('Error al cerrar sesión:', error);
      this.errorMessage = 'Error al cerrar sesión.';
    });
  }

}
