import { Component, OnInit , ViewChild} from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user.model'; 
import { Action } from '../../models/datatable.model'; 
import { Router } from '@angular/router'; 
import { AngularFirestore } from '@angular/fire/compat/firestore'; 
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';

interface UsersData {
  id: string;
  name: string;
  age: number;
}


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  @ViewChild('addEditUserDialog') addEditUserDialog: any;
  @ViewChild('assignPermissionsDialog') assignPermissionsDialog: any;

  user: User | null = null; 
  errorMessage: string = '';
  userActions: Action[] = [
    {
      id: 'add',
      icon: 'add',
      tooltip: 'Agregar usuario',
      standalone: true,
      callback: (row:any) => {
        alert('Agregar usuario');
        console.log(row)

      }
    },
    {
      id: 'edit',
      icon: 'edit',
      tooltip: 'Editar usuario',
      standalone: false,
      callback:(row:any) => {
        alert('Agregar usuario');
        console.log(row)
      }
    },
    {
      id: 'delete',
      icon: 'delete',
      standalone: false,
      tooltip: 'Eliminar usuario',
      callback: (row:any) => {
        alert('Agregar usuario');
        console.log(row)
      }
    },
    {
      id: 'permissions',
      icon: 'lock',
      standalone: false,
      tooltip: 'Asignar permisos',
      callback: (row:any) => {
        alert('Agregar usuario');
        console.log(row)
      }
    }
  ];
  
  usersColumns = ['id', 'name', 'age'];
  users: UsersData[] = [
    { id: '101', name: 'Laptop', age: 1500 },
    { id: '102', name: 'Smartphone', age: 800 },
    { id: '102', name: 'Smartphone', age: 800 },
    { id: '102', name: 'Smartphone', age: 800 },
    { id: '102', name: 'Smartphone', age: 800 },
    { id: '102', name: 'Smartphone', age: 800 },
    { id: '102', name: 'Smartphone', age: 800 },
    { id: '102', name: 'Smartphone', age: 800 },
    { id: '102', name: 'Smartphone', age: 800 },
    { id: '102', name: 'Smartphone', age: 800 },
    { id: '102', name: 'Smartphone', age: 800 },
    { id: '102', name: 'Smartphone', age: 800 },
    { id: '102', name: 'Smartphone', age: 800 },
    { id: '102', name: 'Smartphone', age: 800 },
    { id: '102', name: 'Smartphone', age: 800 },
    { id: '102', name: 'Smartphone', age: 800 },
    { id: '102', name: 'Smartphone', age: 800 },
    { id: '102', name: 'Smartphone', age: 800 },
    { id: '102', name: 'Smartphone', age: 800 },
    { id: '102', name: 'Smartphone', age: 800 },
    { id: '102', name: 'Smartphone', age: 800 },
    { id: '102', name: 'Smartphone', age: 800 },
    { id: '102', name: 'Smartphone', age: 800 },
    { id: '102', name: 'Smartphone', age: 800 },
    { id: '102', name: 'Smartphone', age: 800 },
    { id: '102', name: 'Smartphone', age: 800 },
    { id: '102', name: 'Smartphone', age: 800 },
    { id: '102', name: 'Smartphone', age: 800 },
    { id: '102', name: 'Smartphone', age: 800 },
    { id: '102', name: 'Smartphone', age: 800 },
    { id: '102', name: 'Smartphone', age: 800 },
    { id: '102', name: 'Smartphone', age: 800 },
  ];
  roles=[]
  userForm: FormGroup;
  permissionsForm: FormGroup;
  isEdit = false;
  
  constructor(
      private authService: AuthService,
      private router: Router, 
      private firestore: AngularFirestore,
      fb: FormBuilder, 
      private dialog: MatDialog
    ) {
    this.userForm = fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });

    this.permissionsForm = fb.group({
      role: ['', Validators.required],
    });
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

    // Abre el modal para añadir o editar un usuario
    openAddEditUserDialog(user?: any): void {
      if (user) {
        this.isEdit = true;
        this.userForm.patchValue(user);
      } else {
        this.isEdit = false;
        this.userForm.reset();
      }
  
      this.dialog.open(this.addEditUserDialog);
    }
  
    // Abre el modal para asignar permisos
    openAssignPermissionsDialog(user: any): void {
      this.permissionsForm.reset();
      this.dialog.open(this.assignPermissionsDialog);
    }
  
    // Cierra el modal
    closeDialog(): void {
      this.dialog.closeAll();
    }
  
    // Guardar el usuario (nuevo o editado)
    saveUser(): void {
      const formData = this.userForm.value;
      if (this.isEdit) {
        // Actualiza el usuario existente
        // Lógica para actualizar el usuario
      } else {
        // Agregar un nuevo usuario
        this.users.push(formData);
      }
  
      this.closeDialog();
    }
  
    // Guardar los permisos asignados
    savePermissions(): void {
      const permissionsData = this.permissionsForm.value;
      // Lógica para asignar permisos al usuario
      console.log('Permisos asignados:', permissionsData);
      this.closeDialog();
    }
  
    // Confirmar eliminación (para el otro modal)
    openConfirmDeleteDialog(user: any): void {
      const confirmed = confirm(`¿Estás seguro de que deseas eliminar al usuario ${user.username}?`);
      if (confirmed) {
        // Lógica para eliminar el usuario
        console.log('Usuario eliminado:', user);
      }
    }

}
