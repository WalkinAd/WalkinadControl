import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { ReactiveFormsModule } from '@angular/forms'; // Asegúrate de importarlo aquí

import { environment } from '../environments/environment';

import { AuthService } from './services/auth.service';
import { AppRoutingModule } from './app.routes'; // Importa el módulo de rutas
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms'; // Importa FormsModule

import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { UsersComponent } from './pages/users/users.component';

import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu'; 
import { MatCardModule } from '@angular/material/card'; 
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select'; 
import { MatTooltipModule } from '@angular/material/tooltip';  // Importa el módulo de tooltips


import { LayoutComponent } from './components/layout/layout.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { DatatableComponent } from './components/datatable/datatable.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,    
    LayoutComponent,
    HeaderComponent,
    FooterComponent,
    DatatableComponent,

    DashboardComponent,
    UsersComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    FormsModule,
    ReactiveFormsModule,
    /*MATERIAL IMPORTS*/ 
    
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatToolbarModule,
    MatTableModule ,
    MatPaginatorModule,
    MatSortModule ,
    MatSidenavModule ,
    MatListModule ,
    MatIconModule ,
    MatMenuModule ,
    MatCardModule ,
    MatDialogModule,
    MatSelectModule,
    MatTooltipModule
  ],
  providers: [AuthService, provideAnimationsAsync()],
  bootstrap: [AppComponent],
})
export class AppModule { }
