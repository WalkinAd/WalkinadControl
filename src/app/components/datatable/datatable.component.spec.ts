import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatIconModule } from '@angular/material/icon';
import { NoopAnimationsModule } from '@angular/platform-browser/animations'; // Para evitar problemas con animaciones

import { DatatableComponent } from './datatable.component';
import { Action } from '../../models/datatable.model'; // Ajusta la ruta según sea necesario

describe('DatatableComponent', () => {
  let component: DatatableComponent<any>;
  let fixture: ComponentFixture<DatatableComponent<any>>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MatTableModule,
        MatPaginatorModule,
        MatSortModule,
        MatIconModule,
        NoopAnimationsModule // Evita problemas con animaciones en pruebas
      ],
      declarations: [DatatableComponent], // Aquí se declara el componente
    }).compileComponents();

    fixture = TestBed.createComponent(DatatableComponent);
    component = fixture.componentInstance;

    // Proveer datos de prueba
    component.data = [
      { id: 1, name: 'Usuario 1', email: 'usuario1@example.com' },
      { id: 2, name: 'Usuario 2', email: 'usuario2@example.com' },
    ];
    component.columns = ['id', 'name', 'email'];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // Aquí puedes agregar más pruebas
});
