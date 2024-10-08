import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module'; // Importa el módulo principal
import { environment } from './environments/environment'; // Importa la configuración de entorno

if (environment.production) {
  enableProdMode(); // Activa el modo de producción si está definido
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));