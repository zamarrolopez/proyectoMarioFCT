import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaCrearJuegoComponent } from './lista-crear-juego.component';

describe('ListaCrearJuegoComponent', () => {
  let component: ListaCrearJuegoComponent;
  let fixture: ComponentFixture<ListaCrearJuegoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListaCrearJuegoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaCrearJuegoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
