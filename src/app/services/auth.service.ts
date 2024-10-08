// src/app/services/auth.service.ts
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$: Observable<User | null>;

  constructor(private afAuth: AngularFireAuth, private firestore: AngularFirestore) {
    this.user$ = this.afAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          console.log('Usuario autenticado:', user);
          return this.firestore.doc<User>(`users/${user.uid}`).valueChanges().pipe(
            switchMap(userData => {
              if (userData) {
                console.log('Datos del usuario obtenidos de Firestore:', userData);
                return of(userData);
              } else {
                console.log('No se encontraron datos de usuario en Firestore.');
                return of(null);
              }
            })
          );
        } else {
          console.log('No hay usuario autenticado.');
          return of(null);
        }
      })
    );
  }

  getUser(): Observable<User | null> {
    console.log('Obteniendo usuario...');
    return this.user$;
  }

  async login(email: string, password: string): Promise<void> {
    console.log(`Iniciando sesión con el email: ${email}`);
    await this.afAuth.signInWithEmailAndPassword(email, password);
    console.log('Sesión iniciada.');
  }

  async logout(): Promise<void> {
    console.log('Cerrando sesión...');
    await this.afAuth.signOut();
    console.log('Sesión cerrada.');
  }

  async hasRole(role: string): Promise<boolean> {
    const user = await this.afAuth.currentUser;
    if (user) {
      console.log(`Verificando rol del usuario ${user.uid}`);
      const userDoc = await this.firestore.doc<User>(`users/${user.uid}`).ref.get();
      const userData = userDoc.data();
      if (userData) {
        console.log(`Rol del usuario: ${userData.role}`);
        return userData.role === role;
      } else {
        console.log('No se encontraron datos del usuario en Firestore.');
        return false;
      }
    }
    console.log('No hay usuario autenticado para verificar el rol.');
    return false;
  }
}
