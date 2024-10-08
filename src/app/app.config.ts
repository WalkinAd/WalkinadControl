import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { initializeApp } from 'firebase/app';
import { provideFirebaseApp, getApp } from '@angular/fire/app'; // Asegúrate de que estas importaciones sean correctas
import { provideAuth, getAuth } from '@angular/fire/auth';
import { routes } from './app.routes';
import { environment } from '../environments/environment'; // Importa tu archivo de entorno

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideFirebaseApp(() => initializeApp(environment.firebase)), 
    provideAuth(() => getAuth()), // Provee el servicio de autenticación
  ],
};
